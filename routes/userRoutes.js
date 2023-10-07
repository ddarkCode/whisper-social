import {Router} from 'express';
import User from '../models/authModel';
import debug from 'debug';

const log = debug('app:userRoutes');

export default function userRoutes() {
  const userRouter = Router();

  userRouter.route('/')
  .get( async (req, res) => {

    try {
      const foundUsers = await User.find();
      const mappedFoundUsers = foundUsers.map(user => {
      return Object.assign({}, user._doc, {links: {self: `${req.headers.host}/api/users/${user._id}`}});
    })

    return res.status(200).json(mappedFoundUsers)
    } catch (err) {
      log(err)
      return res.status(500).json(err);
    }
   
  })

  userRouter.route('/:userId')
  // .all( async (req, res, next) => {
  //   if (req.isAuthenticated()) {
  //     return next()
  //   }
  //   const error =  new Error('You Must Be Logged In To Perform This Operation.')
  //   return res.status(403).json({error});
  // })
  .all(async (req, res, next) => {
    try {
      const foundUser = await User.findById(req.params.userId);
      if (!foundUser) {
        return res.status(404).json({message: 'User Not Found'});
      }
      req.foundUser = foundUser;
      next();
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  })
  .get( async (req, res) => {
    try {
      const {foundUser} = req;

      const user = foundUser._doc;

     
      const userWithLink = Object.assign({}, user, {links: {filteredBy: `${req.headers.host}/api/whispers/?whispererId=${user._id}`}} )
      return res.status(200).json(userWithLink);
      
    } catch (err) {
      log(err);
      return res.status(500).json(err)
    }
  })
  .patch( async (req, res) => {
    
    const {foundUser} = req;
    foundUser.username = foundUser.username.slice(1)
    Object.entries(req.body).forEach(entry => {
      const [key, value] = entry;
      foundUser[key] = value;
    })
    await foundUser.save();
    const {username, firstname, lastname, location, image_url, email, followers, following, createdAt, _id, whispers} = foundUser;
        return res.status(200).json({user : {username, firstname, lastname, location, image_url, email, followers, following, createdAt, _id, whispers}, info: 'Account Successfully Updated.'})

  })
  .delete(async (req, res) => {
    try {
      const {foundUser} = req;
      foundUser.remove();
      return res.status(200).json({message: 'Account Successfully Deleted.'})
      
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  })

  return userRouter;
}