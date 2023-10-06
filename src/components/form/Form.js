import React from 'react';

import './Form.css';

function Form(props) {
  return (
   
      <form onSubmit={props.onSubmit}>
      {props.children}
      </form>
      
    
  
  )
}

export default Form