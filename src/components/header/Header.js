import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {List} from 'react-bootstrap-icons';

import './Header.css';

function Header() {
  return (
    <header>
     <div className='header-container'>
      <div className='home'><Link to='/'>Whisper-social</Link></div>
      <nav>
        <ul>
          <li><NavLink to='/' activeStyle={{borderBottom: '1px solid #DDE6ED'}}>Home</NavLink></li>
          <li><NavLink to='/stories' activeStyle={{borderBottom: '1px solid #DDE6ED'}}>Stories</NavLink></li>
          <li><NavLink to='/signin' activeStyle={{borderBottom: '1px solid #DDE6ED'}}>Signin</NavLink></li>
          <li><NavLink to='/user' activeStyle={{borderBottom: '1px solid #DDE6ED'}}>User</NavLink></li>
          <li><NavLink to='/about' activeStyle={{borderBottom: '1px solid #DDE6ED'}}>About</NavLink></li>

        </ul>
      </nav>
     </div>
    </header>
  )
}

export default Header