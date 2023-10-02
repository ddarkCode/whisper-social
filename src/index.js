import React from "react";
import {hydrateRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';

import Routes from "./Routes";


import './index.css';




if (typeof window !== undefined) {
  hydrateRoot(document.getElementById('root'),
   <BrowserRouter>
     {renderRoutes(Routes)}
  </BrowserRouter>)
}