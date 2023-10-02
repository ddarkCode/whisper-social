import React from 'react';
import {renderRoutes} from 'react-router-config';

import Header from './components/header/Header';

function App({route}) {
  return (
    <div>
      <Header/>
         {renderRoutes(route.routes)}
    </div>
  )
}

export default App