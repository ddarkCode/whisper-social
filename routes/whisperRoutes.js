import { Router } from 'express';

import whispersControllers from '../controllers/whispersControllers';

function whisperRoutes() {
  const {
    getwhispers,
    postNewWhisper,
    getwhisper,
    updateWhisper,
    deleteWhisper,
  } = whispersControllers;
  const whisperRouter = Router();

  whisperRouter.route('/').get(getwhispers).post(postNewWhisper);

  whisperRouter
    .route('/:whisperId')

    .get(getwhisper)
    .patch(updateWhisper)
    .delete(deleteWhisper);

  return whisperRouter;
}

export default whisperRoutes;
