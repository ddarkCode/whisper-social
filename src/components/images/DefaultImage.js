import React from 'react';

import { getRGBColorForLetter } from '../../utils/utils';

import './DefaultImage.css';

function DefaultImage({letter ='N'}) {
  const color = getRGBColorForLetter(letter);
 
  return (
    <div style={{backgroundColor: color}} className='default-image'>{letter}</div>
  )
}

export function DefaultImageUser({letter ='h'}) {
  const color = getRGBColorForLetter(letter);
 
  return (
    <div className='default-image-user' style={{backgroundColor: color, display: 'flex', justifyContent: 'center', alignItems: 'center'}} >{letter}</div>
  )
}

export default DefaultImage