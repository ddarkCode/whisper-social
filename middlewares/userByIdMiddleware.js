import debug from 'debug';

import User from '../models/authModel';

const log = debug('app:userByIdMiddleware');

export const userByIdMiddleware = async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.userId);
    if (!foundUser) {
      return res.status(404).json({ message: 'User Not Found' });
    }
    req.foundUser = foundUser;
    next();
  } catch (err) {
    log(err);
    return res.status(500).json(err);
  }
};
