import {configureStore} from '@reduxjs/toolkit';
 
import  auth  from '../src/redux/auth/authReducer';
import whispers from '../src/redux/whisper/whispersSlice';
import users from '../src/redux/users/usersSlice';

export const store = configureStore({
   reducer: {
    auth,
    users,
    whispers
   }
})