import React from 'react';

import App from './App';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';

const Routes = [
  {
   component: App,
   routes: [
    {
      ...HomePage,
      path: '/',
      exact: true
    },
    {
      ...SignupPage,
      path: '/signup',
     
    },
    {
      ...SigninPage,
      path: '/signin'
    }
   ]
  }
]


export default Routes