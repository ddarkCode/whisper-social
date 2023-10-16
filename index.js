import { config } from 'dotenv';
config();

import express from 'express';
import debug from 'debug';
import ejs from 'ejs';
import morgan from 'morgan';
import React from 'react';
import cors from 'cors';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import { connect } from 'mongoose';
import { matchRoutes } from 'react-router-config';
import http from 'http';
import { Server } from 'socket.io';
import { rateLimit } from 'express-rate-limit';

import renderer from './helpers/renderer';
import { store } from './helpers/configureStore';
import Routes from './src/Routes';
import passportConfig from './passport';
import authRouter from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import whisperRoutes from './routes/whisperRoutes';
import commentRoutes from './routes/commentRoutes';
import likeRoutes from './routes/likeRoutes';

const PORT = process.env.PORT || 3000;
const log = debug('app');
const app = express();
const MongoDBStoreSession = MongoDBStore(session);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

const mongoSessionStore = new MongoDBStoreSession({
  uri: process.env.MONGO_LOCAL,
  collection: 'whisperDbSessions',
});

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));

(async function connectToDB() {
  try {
    await connect(process.env.MONGO_LOCAL);
    log('Successfully connected to Database');
  } catch (err) {
    log(err);
  }
})();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    store: mongoSessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

passportConfig(app);
app.use(limiter);

app.use('/api/auth', authRouter());
app.use('/api/users', userRoutes());
app.use('/api/whispers', whisperRoutes());
app.use('/api/comments', commentRoutes());
app.use('/api/likes', likeRoutes());

function reqMiddleware(req, res, next) {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).end();
  } else {
    next();
  }
}

app.get('*', reqMiddleware, (req, res) => {
  const whisperId = req.originalUrl.split('/')[2];

  let userId;
  if (req.user) {
    userId = req.user._id;
  }
  const promises = matchRoutes(Routes, req.path).map(({ route, match }) => {
    return route.loadData
      ? route.loadData(store, whisperId, userId)
      : Promise.resolve(null);
  });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);
    const initialState = store.getState();
    log(context);

    if (context.action) {
      return res.status(302).redirect(context.url);
    }
    if (context.notFound === true) {
      res.status(404);
    }

    return res.render('index', { content, initialState });
  });
});

const server = http.createServer(app);

const socketActiveUsers = {};
const socketMessageQueue = {};

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('join', (userId) => {
    socket.userId = userId;
    socketActiveUsers[userId] = socket;

    if (socketMessageQueue[userId]) {
      socketMessageQueue[userId].forEach((message) => {
        socket.emit('private-message', message);
      });
      delete socketMessageQueue[userId];
    }
  });

  socket.on('private-message', ({ to, message, image_url, date, username }) => {
    if (socketActiveUsers[to]) {
      socketActiveUsers[to].emit('private-message', {
        from: socket.userId,
        message,
        image_url,
        date,
        username,
      });
    } else {
      if (!socketMessageQueue[to]) {
        socketMessageQueue[to] = [];
      }
      socketMessageQueue[to].push({
        from: socket.userId,
        message,
        image_url,
        date,
        username,
      });
    }
  });

  socket.on('disconnect', () => {
    if (socket.userId) {
      delete socketActiveUsers[socket.userId];
    }
  });
});

server.listen(PORT, () => log(`Server is running on port:${PORT} `));
