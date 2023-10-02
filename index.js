import {config} from 'dotenv';
config();

import express from 'express';
import {renderToString} from 'react-dom/server';
import debug from 'debug';
import ejs from 'ejs';
import morgan from 'morgan';
import React from 'react';
import cors from 'cors';



import HomePage from './src/pages/HomePage';

const PORT = process.env.PORT || 3000;
const log = debug('app');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(cors());
app.use(express.static('public'));
app.use(morgan('combined'));

app.get('*', (req, res) => {
  const content = renderToString(<HomePage/>)

  return res.status(200).render('index', {content});
})

app.listen(PORT, () => log(`Server is running on port:${PORT} `));