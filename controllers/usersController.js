import debug from 'debug';

import User from '../models/authModel';
import Whisper from '../models/whisperModel';
import { getFollowInfo, followPromise } from '../helpers/serverUtils';

const log = debug('app:usersController');

export default (function usersController() {
  const getUsers = async (req, res) => {
    try {
      const foundUsers = await User.find();
      const mappedFoundUsers = foundUsers.map((user) => {
        return Object.assign({}, user._doc, {
          links: { self: `${req.headers.host}/api/users/${user._id}` },
        });
      });

      return res.status(200).json(mappedFoundUsers);
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  };
  const getUser = async (req, res) => {
    try {
      const { foundUser } = req;

      const user = foundUser._doc;

      const userWhispers = await Whisper.find({ whispererId: user._id });

      let userFollowers = await followPromise(user.followers, User);

      let userFollowing = await followPromise(user.following, User);

      let resolvedFollowers = await Promise.all(userFollowers);
      let resolvedFollowing = await Promise.all(userFollowing);

      const followers = getFollowInfo(resolvedFollowers);
      const following = getFollowInfo(resolvedFollowing);

      delete user.password;
      delete user.email;

      const userWithLink = Object.assign(
        {},
        user,
        { followers, following },
        { userWhispers },
        {
          links: {
            filteredBy: `${req.headers.host}/api/whispers/?whispererId=${user._id}`,
          },
        }
      );
      return res.status(200).json(userWithLink);
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  };
  const updateUser = async (req, res) => {
    const { foundUser } = req;
    foundUser.username = foundUser.username.slice(1);

    Object.entries(req.body).forEach((entry) => {
      const [key, value] = entry;
      foundUser[key] = value;
    });

    await foundUser.save();

    const userWhispers = await Whisper.find({ whispererId: foundUser._id });
    const user = foundUser._doc;

    let userFollowers = await followPromise(user.followers, User);
    let userFollowing = await followPromise(user.following, User);

    let resolvedFollowers = await Promise.all(userFollowers);
    let resolvedFollowing = await Promise.all(userFollowing);

    const followers = getFollowInfo(resolvedFollowers);
    const following = getFollowInfo(resolvedFollowing);

    delete user.password;
    delete user.email;

    const userWithLink = Object.assign(
      {},
      user,
      { followers, following },
      { userWhispers },
      {
        links: {
          filteredBy: `${req.headers.host}/api/whispers/?whispererId=${user._id}`,
        },
      }
    );

    return res
      .status(200)
      .json({ userWithLink, info: 'Account Successfully Updated.' });
  };
  const deleteUser = async (req, res) => {
    try {
      const { foundUser } = req;
      if (req.user) {
        if (req.user._id === foundUser._id) {
          foundUser.remove();
          return res
            .status(200)
            .json({ message: 'Account Successfully Deleted.' });
        } else {
          return res
            .status(403)
            .json({ message: 'You can only delete your account.' });
        }
      } else {
        return res
          .status(403)
          .json({ message: 'You must Login to perform this operation.' });
      }
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  };
  const followUser = async (req, res) => {
    const { userId } = req.params;
    try {
      await User.updateOne(
        { _id: userId },
        { $push: { followers: req.body.whispererId } }
      );
      await User.updateOne(
        { _id: req.body.whispererId },
        { $push: { following: userId } }
      );
      const user = await User.findById(userId);
      return res
        .status(201)
        .json({ message: `Successfully Followed ${user.username}` });
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  };
  const unFollowUser = async (req, res) => {
    const { userId } = req.params;
    try {
      await User.updateOne(
        { _id: userId },
        { $pull: { followers: req.body.whispererId } }
      );
      await User.updateOne(
        { _id: req.body.whispererId },
        { $pull: { following: userId } }
      );
      const user = await User.findById(userId);
      return res
        .status(201)
        .json({ message: `Successfully Unfollowed ${user.username}` });
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  };

  return {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    followUser,
    unFollowUser,
  };
})();
