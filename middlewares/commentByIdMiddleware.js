import debug from 'debug';

import Comment from '../models/commentModel';

const log = debug('app:commentByIdMiddleware');

export const commentByIdMiddleware = async (req, res, next) => {
  try {
    const foundComment = await Comment.findById(req.params.commentId);
    if (!foundComment) {
      return res.status(403).json({ message: 'comment Not Found' });
    }
    req.foundComment = foundComment;
    next();
  } catch (err) {
    log(err);
    return res.status(500).json(err);
  }
};
