import {config} from 'dotenv';
config();

import express from 'express';
import {renderToString} from 'react-dom/server';
import debug from 'debug';
import ejs from 'ejs';
import morgan from 'morgan';
import React from 'react';
import cors from 'cors';
import session from 'express-session';
import  MongoDBStore  from 'connect-mongodb-session';
import {connect} from 'mongoose';
import { matchRoutes } from 'react-router-config';



import renderer from './helpers/renderer';
import { store } from './helpers/configureStore';
import Routes from './src/Routes';
import passportConfig from './passport';
import authRouter from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import whisperRoutes from './routes/whisperRoutes';

const PORT = process.env.PORT || 3000;
const log = debug('app');
const app = express();
const MongoDBStoreSession = MongoDBStore(session)

const mongoSessionStore =  new MongoDBStoreSession({
  uri: process.env.MONGO_LOCAL,
  collection: 'whisperDbSessions'
});



app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('combined'));

(async function connectToDB(){
  try {
    await connect(process.env.MONGO_LOCAL)
    log('Successfully connected to Database');
  } catch (err) {
    log(err)
  }
}())

app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: true,
  store: mongoSessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
}))

passportConfig(app);

app.use('/api/auth', authRouter())
app.use('/api/users', userRoutes())
app.use('/api/whispers', whisperRoutes())

function reqMiddleware(req, res, next) {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).end()
  } else {
    next()
  }
}

app.get('*', reqMiddleware, (req, res) => {

  // const query = req.originalUrl.split('/').find(u => u.startsWith('?'))
  const whisperId = req.originalUrl.split('/')[2]
  console.log('Original Url:', req.originalUrl)
  console.log('Original Url:', req.originalUrl)
  console.log('Original Url:', whisperId)
  const promises = matchRoutes(Routes, req.path).map(({route, match}) => {
    console.log(match);
    return route.loadData ? route.loadData(store, whisperId) : Promise.resolve(null);
  })

  Promise.all(promises).then(() => {
    const content = renderer(req, store)
    const initialState = store.getState()

    return res.status(200).render('index', {content, initialState});

  })

})

app.listen(PORT, () => log(`Server is running on port:${PORT} `));