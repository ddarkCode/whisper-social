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
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';

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
      {
        ...AboutPage,
        path: '/about',
      },
      {
        component: NotFoundPage,
      },
    ],
  },
];

export default Routes;
