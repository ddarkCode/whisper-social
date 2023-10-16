import { Router } from 'express';

import commentController from '../controllers/commentController';
import { commentByIdMiddleware } from '../middlewares/commentByIdMiddleware';

export default function commentRoutes() {
  const commentRouter = Router();

  const {
    getComments,
    getComment,
    postNewComment,
    updateComment,
    deleteComment,
  } = commentController;

  commentRouter.route('/').get(getComments).post(postNewComment);

  commentRouter
    .route('/:commentId')
    .all(commentByIdMiddleware)
    .get(getComment)
    .patch(updateComment)
    .delete(deleteComment);
  return commentRouter;
}
