import {Router} from 'express';
import User from '../models/authModel';
import debug from 'debug';

const log = debug('app:userRoutes');

export default function userRoutes() {
  const userRouter = Router();

  userRouter.route('/:userId')
  // .all( async (req, res, next) => {
  //   if (req.isAuthenticated()) {
  //     return next()
  //   }
  //   const error =  new Error('You Must Be Logged In To Perform This Operation.')
  //   return res.status(403).json({error});
  // })
  .patch( async (req, res) => {
    log('Update Route: ', req.body);
    const foundUser = await User.findById(req.params.userId);
    foundUser.username = foundUser.username.slice(1)
   

    Object.entries(req.body).forEach(entry => {
      const [key, value] = entry;
      foundUser[key] = value;
    })
    log('Updated User: ',foundUser)
    await foundUser.save();
    const {username, firstname, lastname, location, image_url, email, followers, following, createdAt, _id, whispers} = foundUser;
        return res.status(200).json({user : {username, firstname, lastname, location, image_url, email, followers, following, createdAt, _id, whispers}, info: 'Account Successfully Updated.'})

  })

  return userRouter;
}