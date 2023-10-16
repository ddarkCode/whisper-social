import passport from 'passport';
import debug from 'debug';

const log = debug('app:authController');

export default (function authController() {
  const signup = (req, res) => {
    passport.authenticate('signup', (err, user, info, status) => {
      if (err) {
        log(err);
        return res.status(500).json(err);
      }
      req.login(user, (err) => {
        if (err) {
          log(err);
          return res.status(500).json({ err, info });
        }
        const {
          username,
          firstname,
          lastname,
          location,
          image_url,
          email,
          followers,
          following,
          createdAt,
          _id,
          whispers,
        } = user;
        return res.status(201).json({
          user: {
            username,
            firstname,
            lastname,
            location,
            image_url,
            email,
            followers,
            following,
            createdAt,
            _id,
            whispers,
          },
          info,
        });
      });
    })(req, res);
  };

  const signin = (req, res) => {
    passport.authenticate('signin', (err, user, info) => {
      if (err) {
        log(err);
        return res.status(500).json({ err, info });
      }

      req.login(user, (err) => {
        if (err) {
          log(err);
          return res.status(500).json({
            err,
            info: 'An error occurred during login, please try again',
          });
        }
        const {
          username,
          firstname,
          lastname,
          location,
          image_url,
          email,
          followers,
          following,
          createdAt,
          _id,
        } = user;
        return res.status(200).json({
          user: {
            username,
            firstname,
            lastname,
            location,
            image_url,
            email,
            followers,
            following,
            createdAt,
            _id,
          },
          info,
        });
      });
    })(req, res);
  };

  const signout = async (req, res) => {
    req.logout((err) => {
      if (err) {
        log(err);
        return res.status(500).json(err);
      }
      return res
        .status(200)
        .json({ user: null, message: 'You Successfully Logged Out.' });
    });
  };

  return {
    signin,
    signup,
    signout,
  };
})();
