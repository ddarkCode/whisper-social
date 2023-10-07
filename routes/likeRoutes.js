import {Router} from 'express';

import Like from '../models/likeModel';

export default function() {
  const likeRouter = Router();

  likeRouter.route('/')
  .get(async (req, res) => {
    const query = {};

    if (req.query.likedBy) {
      query.likedById = req.query.likedBy
    }
    if (req.query.whisperId) {
      query.whisperId = req.query.whisperId;
    }

   try {
    const foundLikes = Like.find(query);
    return res.status(200).json(foundLikes);
   } catch (err) {
    log(err);
    return res.status(500).json(err);
   }
  });
  likeRouter.route('/:likeId')
  .delete(async (req, res) => {
    const {likeId} = req.params;

    try {
      const foundLike = Like.findById(likeId);
    if (foundLike.likedById === req.user._id) {
      await foundLike.remove();
      return res.status(200).json({message: 'You Successfully Liked A Post.'})
    } else {
      return res.status(403).json({message: 'You can Only Unlike A Whisper You Liked'});
    }
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  });

  return likeRouter;
}