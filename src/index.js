import React from "react";
import {hydrateRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';

import Routes from "./Routes";
import { createStore } from "./redux";

import 'react-toastify/dist/ReactToastify.css';
import './index.css';



const store = createStore(window.initialState)

if (typeof window !== undefined) {
  hydrateRoot(document.getElementById('root'),
  <Provider store={store}>
     <BrowserRouter>
       {renderRoutes(Routes)}
     </BrowserRouter>
  </Provider>
  )
}