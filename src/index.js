import React from "react";
import {hydrateRoot} from 'react-dom/client';

import HomePage from "./pages/HomePage";


import './index.css';




if (typeof window !== undefined) {
  hydrateRoot(document.getElementById('root'), <HomePage/>)
}