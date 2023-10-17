import React, { useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { updateAuthOnPageLoad } from './redux/auth/authReducer';

function App({ route }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('auth');

    if (user) {
      dispatch(updateAuthOnPageLoad(user));
    }
  }, [dispatch]);

  return (
    <div>
      <Header />
      {renderRoutes(route.routes)}
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
