import React from 'react';
import {capitalize} from 'lodash';

function Button({type, text}) {
  return (
    <div>
          <button type={type}>{capitalize(text)}</button>
        </div>
  )
}

export default Button