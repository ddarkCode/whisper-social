import { Router } from 'express';

import { userByIdMiddleware } from '../middlewares/userByIdMiddleware';
import usersController from '../controllers/usersController';

export default function userRoutes() {
  const {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    followUser,
    unFollowUser,
  } = usersController;
  const userRouter = Router();
  userRouter.route('/').get(getUsers);
  userRouter
    .route('/:userId')

    .all(userByIdMiddleware)
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);
  userRouter.route('/:userId/follow').patch(followUser);
  userRouter.route('/:userId/unfollow').patch(unFollowUser);

  return userRouter;
}
