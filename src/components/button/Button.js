import React from 'react';
import { capitalize } from 'lodash';

function Button({ type, text, disable }) {
  return (
    <div>
      <button disabled={disable} type={type}>
        {capitalize(text)}
      </button>
    </div>
  );
}

export default Button;
