import React from 'react';

import App from './App';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import WhispersPage from './pages/WhispersPage';
import WhisperPage from './pages/WhisperPage';
import WhispererPage from './pages/WhispererPage';
import AddWhisperPage from './pages/AddWhisperPage';
import UserPage from './pages/UserPage';
import Chats from './pages/Chats';
import Loading from './components/loading/Loading';

const Routes = [
  {
    component: App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true,
      },
      {
        ...SignupPage,
        path: '/signup',
      },
      {
        ...SigninPage,
        path: '/signin',
      },
      {
        component: Loading,
        path: '/loading',
      },
      {
        ...WhispersPage,
        path: '/whispers',
        exact: true,
      },
      {
        ...WhisperPage,
        path: '/whispers/:whisperId',
      },
      {
        ...WhispererPage,
        path: '/whisperer',
      },
      {
        ...AddWhisperPage,
        path: '/addwhisper',
        exact: true,
      },
      {
        ...UserPage,
        path: '/users/:userId',
      },
      {
        ...AddWhisperPage,
        path: '/addwhisper/:whisperId',
      },
    ],
  },
];

export default Routes;
