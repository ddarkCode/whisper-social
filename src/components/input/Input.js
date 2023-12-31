import React from 'react';
import {capitalize} from 'lodash';

function Input({type ,text, onChange, value, placeholder}) {
  return (
    <div>
    <label htmlFor={text}>{capitalize(text)}</label>
    <input type={type} id={text} name={text} value={value} onChange={onChange} placeholder={placeholder ? placeholder : ''} />
  </div>
  )
}

export default Input