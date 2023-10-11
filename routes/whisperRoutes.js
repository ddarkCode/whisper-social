import {Router} from 'express';
import debug from 'debug';

import Whisper from '../models/whisperModel';
import User from '../models/authModel';
import Comment from '../models/commentModel';
import Like from '../models/likeModel';

const log = debug('app:whisperRoutes');


function whisperRoutes() {
  const whisperRouter = Router()

  whisperRouter.route('/')
  .get( async (req, res) => {
      try {
        const query = {};
        if (req.query.whispererId) {
          query.whispererId = req.query.whispererId
        }
        log('Whispers Route Query: ', req.query)
        const whispers = await Whisper.find(query);
        log('Whispers With Query: ', whispers);
      
        const whispersWithInfoPromise  = whispers.map(async whisper => {
          const whispererInfo = await User.findById(whisper.whispererId);
          return Object.assign({}, whisper._doc, {whispererUsername: whispererInfo.username}, {links: {self: `${req.headers.host}/api/whispers/${whisper._id}`}})

        })
        Promise.all(whispersWithInfoPromise).then(whispersWithInfoResolved => {
          return res.status(200).json(whispersWithInfoResolved);
        }).catch(err => {
          log(err);
          return res.status(500).json(err);
        })
  
        
      } catch (err) {
        log(err);
        return res.status(500).json(err);
      }

  })
  .post( async (req, res) => {
    const {title, image_url, whisper, whispererId} = req.body;
    
    try {
      const newWhisper = new Whisper({
        title,
        whisper,
        whispererId,
        image_url
      })
  
      const savedWhisper = await newWhisper.save()
      return res.status(201).json(savedWhisper);
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  })

  whisperRouter.route('/:whisperId')
  .get( async (req, res) => {
    const {whisperId} = req.params;
    try {
      const foundWhisper = await Whisper.findById(whisperId)
      const whisperer = await User.findById(foundWhisper.whispererId);
      const foundWhisperComments = await Comment.find({whisperId: foundWhisper._id});
      const foundWhisperLikes = await Like.find({whisperId: foundWhisper._id});
      let likeStatus;
      if (req.user !== undefined) {
        likeStatus = await Like.findOne({likedById: req.user._id, whisperId: foundWhisper._id})
      }
      log(likeStatus)
      const {title, image_url, whispererId, whisper, createdAt} = foundWhisper;
      const {username, firstname, lastname} = whisperer;
      
    
      const WhisperWithWhispererInfoAndLinks = Object.assign({},
        {title, likes: foundWhisperLikes, comments: foundWhisperComments,likeStatus,
        image_url, whispererId, whisper, createdAt,username, firstname, lastname}, 
        {links: {filteredBy: `${req.headers.host}/api/whispers/?whispererId=${foundWhisper.whispererId}`} });

      return res.status(200).json(WhisperWithWhispererInfoAndLinks)
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  })
  

  return whisperRouter;
}

export default whisperRoutes