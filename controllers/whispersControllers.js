import debug from 'debug';

import Whisper from '../models/whisperModel';
import User from '../models/authModel';
import { whisperWithInfo } from '../helpers/serverUtils';

const log = debug('app:whispersController');

export default (function whispersController() {
  const getwhispers = async (req, res) => {
    try {
      const query = {};
      if (req.query.whispererId) {
        query.whispererId = req.query.whispererId;
      }

      const options = {
        page: +req.query.page || 1,
        limit: +req.query.limit || 10,
        sort: { createdAt: 'desc' },
        collation: {
          locale: 'en',
        },
      };

      const whispers = await Whisper.paginate(query, options);

      const {
        docs,
        totalDocs,
        limit,
        totalPages,
        page,
        pagingCount,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
      } = whispers;

      const whispersWithInfoPromise = docs.map(async (whisper) => {
        const whispererInfo = await User.findById(whisper.whispererId);
        return Object.assign(
          {},
          whisper._doc,
          { whispererUsername: whispererInfo.username },
          {
            links: {
              self: `${req.headers.host}/api/whispers/${whisper._id}`,
            },
          }
        );
      });
      Promise.all(whispersWithInfoPromise)
        .then((whispersWithInfoResolved) => {
          whispersWithInfoResolved = Object.assign(
            {},
            { whispers: whispersWithInfoResolved },
            {
              paginationOptions: {
                totalDocs,
                limit,
                totalPages,
                page,
                pagingCount,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
              },
            }
          );
          return res.status(200).json(whispersWithInfoResolved);
        })
        .catch((err) => {
          log(err);
          return res.status(500).json(err);
        });
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  };
  const postNewWhisper = async (req, res) => {
    const { title, image_url, whisper, whispererId } = req.body;
    try {
      const newWhisper = new Whisper({
        title,
        whisper,
        whispererId,
        image_url,
      });

      const savedWhisper = await newWhisper.save();
      const savedWhisperWithInfo = await whisperWithInfo(savedWhisper, req);
      return res.status(201).json(savedWhisperWithInfo);
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  };
  const getwhisper = async (req, res) => {
    const { whisperId } = req.params;

    try {
      const foundWhisper = await Whisper.findById(whisperId);

      if (!foundWhisper) {
        return res.status(404).json({ message: 'Whisper Not Found.' });
      }

      const WhisperWithWhispererInfoAndLinks = await whisperWithInfo(
        foundWhisper,
        req
      );
      return res.status(200).json(WhisperWithWhispererInfoAndLinks);
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  };
  const updateWhisper = async (req, res) => {
    const { whisperId, whispererId } = req.body;

    try {
      const foundWhisper = await Whisper.findOne({
        whispererId,
        _id: whisperId,
      });

      if (!foundWhisper) {
        return res.status(404).json({ message: 'Whisper Not Found.' });
      }

      Object.entries(req.body).forEach((entry) => {
        const [key, value] = entry;
        foundWhisper[key] = value;
      });
      await foundWhisper.save();

      const WhisperWithWhispererInfoAndLinks = await whisperWithInfo(
        foundWhisper,
        req
      );
      return res.status(200).json(WhisperWithWhispererInfoAndLinks);
    } catch (err) {
      log(err);
      return res.status(500).json(err);
    }
  };
  const deleteWhisper = async (req, res) => {
    try {
      const removedWhisper = await Whisper.findOneAndDelete({
        _id: req.params.whisperId,
        whispererId: req.user._id,
      });
      return res.status(200).json(removedWhisper);
    } catch (err) {
      log(err);
      return res.status(200).json(err);
    }
  };
  return {
    getwhispers,
    postNewWhisper,
    getwhisper,
    updateWhisper,
    deleteWhisper,
  };
})();
