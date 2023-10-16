import debug from 'debug';

import User from '../models/authModel';
import Comment from '../models/commentModel';

const log = debug('app:commentController');

export default (function commentController() {
  const getComments = async (req, res) => {
    try {
      const query = {};
      if (req.query.whisperId) {
        query.whisperId = req.query.whisperId;
      }
      if (req.query.commentBy) {
        query.commentBy = req.query.commentBy;
      }
      const foundComments = await Comment.find(query);
      const promises = foundComments.map(async (comment) => {
        const userInfo = await User.findById(comment.commentById);
        return Object.assign(
          {},
          comment._doc,
          { username: userInfo.username, image_url: userInfo.image_url },
          {
            links: {
              filteredBy: `${req.headers.host}/api/comments/?commentBy=${comment.commentById}`,
            },
          }
        );
      });

      Promise.all(promises)
        .then((values) => {
          return res.status(200).json(values);
        })
        .catch((err) => {
          log(err);
          return res.status(500).json(err);
        });
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  };
  const postNewComment = async (req, res) => {
    try {
      const newComment = new Comment(req.body);
      await newComment.save();
      const commentBy = await User.findById(newComment.commentById);
      const commentWithInfo = Object.assign({}, newComment._doc, {
        image_url: commentBy.image_url,
        username: commentBy.username,
      });
      return res.status(201).json(commentWithInfo);
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  };
  const getComment = async (req, res) => {
    try {
      const { foundComment } = req;
      const comment = foundComment._doc;
      const commentBy = await User.findById(comment.commentById);
      let commentStatus = await Comment.findOne({
        commentById: req.user._id,
        whisperId: comment.whisperId,
      });
      const commentWithInfo = Object.assign({}, comment, {
        commentStatus,
        image_url: commentBy.image_url,
        username: commentBy.username,
      });
      return res.status(200).json(commentWithInfo);
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  };
  const updateComment = async (req, res) => {
    const { foundComment } = req;

    if (req.user._id === foundComment.commentById) {
      Object.entries(req.body).forEach((entry) => {
        const [key, value] = entry;
        foundComment[key] = value;
      });
    }
    await foundComment.save();
    return res.status(200).json(foundComment);
  };
  const deleteComment = async (req, res) => {
    const { foundComment } = req;
    try {
      if (foundComment.commentById === req.user._id) {
        await foundComment.remove();
        return res
          .status(200)
          .json({ message: 'Comment Successfully Deleted.' });
      } else {
        return res
          .status(403)
          .json({ message: 'You Can Only Delete Your Own comment' });
      }
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  };

  return {
    getComments,
    getComment,
    postNewComment,
    updateComment,
    deleteComment,
  };
})();
