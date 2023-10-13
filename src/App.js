import React from 'react';
import {renderRoutes} from 'react-router-config';
import { ToastContainer } from 'react-toastify';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App({route}) {
  return (
    <div>
      <Header/>
         {renderRoutes(route.routes)}
       <ToastContainer/>
      <Footer/>
    </div>
  )
}

export default App