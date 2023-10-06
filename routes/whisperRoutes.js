import {Router} from 'express';
import debug from 'debug';

import Whisper from '../models/whisperModel';

const log = debug('app:whisperRoutes');


function whisperRoutes() {
  const whisperRouter = Router()

  whisperRouter.route('/')
  .get( async (req, res) => {
      try {
        const whispers = await Whisper.find();
        return res.status(200).json(whispers);
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
      return res.status(200).json(foundWhisper)
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  })

  return whisperRouter;
}

export default whisperRoutes