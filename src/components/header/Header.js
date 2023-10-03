import React, {useState, Fragment} from 'react';
import {NavLink, Link} from 'react-router-dom';
import {List, X} from 'react-bootstrap-icons';

import './Header.css';



function Header() {
  const [smallerScreen, setSmallerScreen] = useState(false)

  const navLikns = smallerScreen ? (<ul className='smaller-screen'>
    <div onClick={() => setSmallerScreen(!smallerScreen)}>
      <li><NavLink to='/' activeStyle={{borderBottom: '1px solid #DDE6ED'}}>Home</NavLink></li>
      <li><NavLink to='/stories' activeStyle={{borderBottom: '1px solid #DDE6ED'}}>Stories</NavLink></li>
      <li><NavLink to='/signin' activeStyle={{borderBottom: '1px solid #DDE6ED'}}>Signin</NavLink></li>
      <li><NavLink to='/user' activeStyle={{borderBottom: '1px solid #DDE6ED'}}>User</NavLink></li>
      <li><NavLink to='/about' activeStyle={{borderBottom: '1px solid #DDE6ED'}}>About</NavLink></li>
    </div>
    <svg onClick={() => setSmallerScreen(!smallerScreen)} className='cancel'  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="3em" height="3em" fill="#fff"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path></svg>
  </ul>)  : (<nav>
        <ul >
          <li><NavLink to='/' activeStyle={{borderBottom: '1px solid #DDE6ED'}}>Home</NavLink></li>
          <li><NavLink to='/stories' activeStyle={{borderBottom: '1px solid #DDE6ED'}}>Stories</NavLink></li>
          <li><NavLink to='/signup' activeStyle={{borderBottom: '1px solid #DDE6ED'}}>Sign up</NavLink></li>
          <li><NavLink to='/signin' activeStyle={{borderBottom: '1px solid #DDE6ED'}}>Sign in</NavLink></li>
          <li><NavLink to='/user' activeStyle={{borderBottom: '1px solid #DDE6ED'}}>User</NavLink></li>
          <li><NavLink to='/about' activeStyle={{borderBottom: '1px solid #DDE6ED'}}>About</NavLink></li>
        </ul>
        <svg  className='list-view' xmlns="http://www.w3.org/2000/svg" onClick={() => setSmallerScreen(!smallerScreen)} viewBox="0 0 16 16" width="2em" height="2em" fill="#fff"><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"></path></svg>

      </nav>)

  return (
    <header style={{height: smallerScreen && '100vh',  display: smallerScreen && 'block', zIndex: smallerScreen && 100 }}>
     <div className='header-container' style={{position: smallerScreen && 'relative'}} >
      <div className='home' style={{display: smallerScreen && 'none'}}><Link to='/'>Whisper-social</Link></div>
         {navLikns}
     </div>
    </header>
  )
}

export default Header