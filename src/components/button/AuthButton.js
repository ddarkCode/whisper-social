import React from 'react';
import {Link} from 'react-router-dom';

import './Button.css';

function AuthButton({spanText, buttonText, href}) {
  return (
    <div className='auth-button'>
      <span>{spanText}</span>
      <Link to={href}>{buttonText}</Link>
    </div>
  )
}

export default AuthButton