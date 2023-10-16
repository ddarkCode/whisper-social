import { Router } from 'express';

import LikeController from '../controllers/LikeController';

export default function () {
  const likeRouter = Router();
  const { getLike, getLikes, postNewLike, deleteLike } = LikeController;

  likeRouter.route('/').get(getLikes).post(postNewLike);
  likeRouter.route('/:likeId').get(getLike).delete(deleteLike);

  return likeRouter;
}
