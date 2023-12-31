import debug from 'debug';

import Like from '../models/likeModel';

const log = debug('app:likeController');

export default (function likeController() {
  const getLikes = async (req, res) => {
    const query = {};

    if (req.query.likedBy) {
      query.likedById = req.query.likedBy;
    }
    if (req.query.whisperId) {
      query.whisperId = req.query.whisperId;
    }

    try {
      const foundLikes = await Like.find(query);

      return res.status(200).json(foundLikes);
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  };
  const postNewLike = async (req, res) => {
    const { whisperId, likedById } = req.body;

    try {
      const newLike = new Like({ whisperId, likedById });
      await newLike.save();
      return res.status(201).json(newLike);
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  };
  const getLike = async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        const userLike = await Like.findOne({ likedById: req.user._id });
        return res.status(200).json(userLike);
      }
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  };
  const deleteLike = async (req, res) => {
    const { likeId } = req.params;
    try {
      if (req.isAuthenticated()) {
        const deleteDetails = await Like.findOneAndDelete({
          _id: likeId,
          likedById: req.user._id,
        });
        return res.status(200).json(deleteDetails);
      } else {
        return res.status(403).json({ message: 'Please Login To Continue.' });
      }
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  };

  return {
    getLike,
    getLikes,
    postNewLike,
    deleteLike,
  };
})();
