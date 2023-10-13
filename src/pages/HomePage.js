import React from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

import './css/HomePage.css';

function HomePage() {
  const auth = useSelector(state => state.auth);
  return (
    <div className='home-page'>
      
      <div>
      <h1>Welcome To Whisper Social</h1>
      <p>Embrace your inner hero on our platform, where your whispers resonate far and wide,
         sparking conversations that change the world one whisper at a time.</p>
      {
        auth.user ? <Link to='/whispers'>Get  Started</Link> : <Link to='/signin'>Get  Started</Link>
      }
      </div>

    </div>
  )
}

export default {
  component: HomePage
}