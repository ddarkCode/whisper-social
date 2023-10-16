import { Router } from 'express';

import authController from '../controllers/authController';

const { signin, signup, signout } = authController;

export default function authRouter() {
  const authRoutes = Router();
  authRoutes.route('/signup').post(signup);
  authRoutes.route('/signin').post(signin);
  authRoutes.route('/signout').get(signout);

  return authRoutes;
}
