import React from 'react';
import { renderRoutes } from 'react-router-config';
import {StaticRouter} from 'react-router-dom';
import {renderToString} from 'react-dom/server';

import Routes from '../src/Routes';



export default function renderer(req){
     const content = 
     renderToString(
     <StaticRouter location={req.path} context={{}}>
      {renderRoutes(Routes)}
     </StaticRouter>)

     return content

}