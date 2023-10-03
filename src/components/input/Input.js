import React from 'react';
import {capitalize} from 'lodash';

function Input({text}) {
  return (
    <div>
    <label htmlFor={text}>{capitalize(text)}</label>
    <input type={text} id={text} name={text} />
  </div>
  )
}

export default Input