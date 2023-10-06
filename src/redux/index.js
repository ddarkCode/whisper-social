import {configureStore} from '@reduxjs/toolkit';
import auth from './auth/authReducer';
import whispers from './whisper/whispersSlice';

export const createStore = preloadedState => configureStore({
   reducer: {
    auth,
    whispers
   },
   preloadedState
})