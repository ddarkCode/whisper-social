import React from 'react';

import { getRandomColor } from '../../utils/utils';

import './DefaultImage.css';

function DefaultImage({letter ='N'}) {
  const color = getRandomColor()
  return (
    <div style={{backgroundColor: color}} className='default-image'>{letter}</div>
  )
}

export default DefaultImage