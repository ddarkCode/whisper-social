import {Router} from 'express';
import debug from 'debug';
import passport from 'passport';

const log = debug('app:authRoutes')

export default function authRouter() {
  const authRoutes = Router();
   authRoutes.route('/signup')
   .post((req, res) => {
    passport.authenticate('signup', (err, user, info, status) => {
      if (err) {
        log(err);
        return res.status(500).json(err);
      }
      req.login(user, err => {
        if (err) {
          log(err);
        return res.status(500).json({err, info});
        }
        const {username, firstname, lastname, location, image_url, email, followers, following, createdAt, _id, whispers} = user;
        return res.status(201).json({user : {username, firstname, lastname, location, image_url, email, followers, following, createdAt, _id, whispers}, info})
      })
    })(req, res);    
   });
   authRoutes.route('/signin')
   .post((req, res) => {
    passport.authenticate('signin', (err, user, info) => {
      if (err) {
        log(err);
        return res.status(500).json({err, info})
      }

        req.login(user, err => {
          if (err) {
            log(err);
            return res.status(500).json({err, info: 'An error occurred during login, please try again'})
          }
          const {username, firstname, lastname, location, image_url, email, followers, following, createdAt, _id} = user;
           return res.status(200).json({user : {username, firstname, lastname, location, image_url, email, followers, following, createdAt, _id}, info})
        })
      
    })(req, res)
   })

  return authRoutes
}