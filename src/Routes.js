import React from 'react';

import App from './App';
import HomePage from './pages/HomePage';

const Routes = [
  {
   component: App,
   routes: [
    {
      component: HomePage,
      path: '/',
      exact: true
    }
   ]
  }
]


export default Routes