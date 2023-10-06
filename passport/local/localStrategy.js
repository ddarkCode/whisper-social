import {Strategy} from 'passport-local';
import passport from 'passport';

import User from '../../models/authModel'

function localStrategy() {
  passport.use('signup', new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
  
  }, 
  async (req, email, password, done) => {
    const userExist = await User.findOne({email});
  
    if (userExist) {
      return done(null, false, {message: 'A User With This Email Already Exist'})
    }
  
     try {
      const {username, firstname, lastname, location} = req.body;
      const newUser = new User({
        username,
        firstname,
        lastname,
        location,
        email,
        password,
        image_url: req.body.image_url
      })
    
      await newUser.save();
      return done(null, newUser, {message: 'Account successfully Created'});
      
     } catch (err) {
      console.log(err);
      return done(err, false, {message: `An Error Occurred While registering your account: ${JSON.stringify(err)}`});

     }
  
  }
  ));

  passport.use('signin', new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      const user = await User.findOne({email});
      if (!user) {
        return done(null, false, {message: 'Incorrect Email Entered.'})
      }
      if (!user.verifyPassword(password, user.password)) {
        return done(null, false, {message: "Incorrect Password Entered."});
      }

      return done(null, user, {message: 'You\'ve been successfully logged in.'})
    }
  ))
}

export default localStrategy