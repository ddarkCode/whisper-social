import {Router} from 'express';

import Comment from '../models/commentModel';


export default function commentRoutes() {
  const commentRouter = Router();

  commentRouter.route('/')
  .get(async (req, res) => {

  try {
    const query = {};
    if (req.query.whisperId) {
      query.whisperId = req.query.whisperId
    }
    if (req.query.commentBy) {
      query.commentBy = req.query.commentById;
    }
    const foundComments = Comment.find(query);
    return res.status(200).json(foundComments);
  } catch (err) {
    log(err);
    return res.status(500).json(err)
  }

  })
  .post(async (req, res) => {
    try {
      const newComment = new Comment(req.body);
      await newComment.save();
      return res.status(201).json(newComment);
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  });

  commentRouter.route('/:commentId')
  .all( async (req, res, next) => {
    try {
      const foundComment = await Comment.findById(req.params.commentId)
      if (!foundComment) {
        return res.status(403).json({message: "comment Not Found"})
      }
      req.foundComment = foundComment;
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  })
  .get((req, res) => {
    try {
      const {foundComment} = req;
    const comment = foundComment._doc;
    const commentWithLink = Object.assign({}, comment, {links: {filteredBy: `${req.headers.host}/api/comments/?commentBy=${comment.commentById}`}})
      return res.status(200).json(commentWithLink);
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  })
  .patch(async (req, res) => {
    const {foundComment} = req;
    

    if (req.user._id === foundComment.commentById) {
      Object.entries(req.body).forEach(entry => {
        const [key, value] = entry;
        foundComment[key] = value;
      })
    }
    await foundComment.save();
    return res.status(200).json(foundComment);
  })
  .delete(async (req, res) => {
    const {foundComment} = req;
    try {
      if (foundComment.commentById === req.user._id) {
        await foundComment.remove();
        return res.status(200).json({message: 'Comment Successfully Deleted.'})
      } else {
        return res.status(403).json({message: 'You Can Only Delete Your Own comment'})
      }

    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  });
  return commentRouter;
}