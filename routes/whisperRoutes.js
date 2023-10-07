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
        const whispers = await Whisper.find(query);

        const whispererIds = []
        for (let id of whispers) {
          whispererIds.push(id.whispererId);
        }
        
        const foundWhisperers = await Promise.all(whispererIds.map(whispererId => User.find({_id: whispererId})))
        const mapFoundWhisperers = foundWhisperers.map(whisperer => whisperer[0])
        const whisperWithInfo  = [];

        for (let index = 0; index < whispers.length; index +=  1) {
          for (let j = 0; j < mapFoundWhisperers.length; j += 1) {
              if(mapFoundWhisperers[j].equals(whispers[index].whispererId) === true) {
                whisperWithInfo.push(Object.assign({}, whispers[index]._doc, {whispererUsername: mapFoundWhisperers[j].username}, {links: {self: `${req.headers.host}/api/whispers/${whispers[index]._id}`}}))
              }
          }
        }
  
        return res.status(200).json(whisperWithInfo);
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
      const foundWhisperLikes = await Like.find({whisperId: foundWhisper._id})

      const {title, image_url, whispererId, whisper, createdAt} = foundWhisper;
      const {username, firstname, lastname} = whisperer;
      
      const foundWhisperWithWhispererInfo = {title, image_url, whispererId, whisper,createdAt,likes:foundWhisperLikes,  comments: foundWhisperComments, whisperer: {username, firstname, lastname}}
      foundWhisperWithWhispererInfo.links = {};
      foundWhisperWithWhispererInfo.links.filteredBy = `${req.headers.host}/api/whispers/?whispererId=${foundWhisper.whispererId}`
      
      return res.status(200).json(foundWhisperWithWhispererInfo)
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  })

  return whisperRouter;
}

export default whisperRoutes