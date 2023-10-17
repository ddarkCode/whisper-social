import { configureStore } from '@reduxjs/toolkit';
import auth from './auth/authReducer';
import whispers from './whisper/whispersSlice';
import users from './users/usersSlice';

export const baseUrl = 'https://whisper-8tap.onrender.com';

export const createStore = (preloadedState) =>
  configureStore({
    reducer: {
      auth,
      users,
      whispers,
    },
    preloadedState,
  });
