import React from 'react';
import { renderRoutes } from 'react-router-config';
import {StaticRouter} from 'react-router-dom';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';

import Routes from '../src/Routes';



export default function renderer(req, store){
     const content = 
     renderToString(
     <Provider store={store}>
     <StaticRouter location={req.path} context={{}}>
      {renderRoutes(Routes)}
     </StaticRouter>
     </Provider>
     )

     return content

}