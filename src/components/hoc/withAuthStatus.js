import React from "react";
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

const withAuthStatus = (Component) => {

  return (props) => {
    const auth = useSelector(state => state.auth);
    if (auth.user) {
      return <Component {...props} />;
    } else {
      
      return < Redirect to={'/signin'} />;
    }
  };
};

export default withAuthStatus;