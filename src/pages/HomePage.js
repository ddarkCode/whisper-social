import React from 'react';
import {Link} from 'react-router-dom';

import './css/HomePage.css';

function HomePage() {
  return (
    <div className='home-page'>
      
      <div>
      <h1>Welcome To Whisper Social</h1>
      <p>Embrace your inner hero on our platform, where your whispers resonate far and wide,
         sparking conversations that change the world one whisper at a time.</p>
      <Link to='/signup'>Get  Started</Link>
      </div>

    </div>
  )
}

export default {
  component: HomePage
}