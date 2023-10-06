import {configureStore} from '@reduxjs/toolkit';
 
import  auth  from '../src/redux/auth/authReducer';
import whispers from '../src/redux/whisper/whispersSlice';

export const store = configureStore({
   reducer: {
    auth,
    whispers
   }
})