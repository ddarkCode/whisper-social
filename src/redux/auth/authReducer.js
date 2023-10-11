import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  info: null
};

export const signup = createAsyncThunk(
  'auth/signup',
  async (user, thunkApi) => {
    const {data} = await axios.post('http://localhost:3000/api/auth/signup', user);
    return data;
  }
)

export const signin = createAsyncThunk(
  'auth/signin',
  async (user, thunkApi) => {
    const {data} = await axios.post('http://localhost:3000/api/auth/signin', user);
    return data
  }
)

export const update = createAsyncThunk(
  'auth/update',
  async (user, thunkApi) => {
    const {data} = await axios.patch(`http://localhost:3000/api/users/${user.userId}`, user)
    return data
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // signin: state => {},
    // signout: state => {}
  },

  extraReducers: builder => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.info = action.payload.info;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.info = action.payload.info
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.info = action.payload.user;
    })

  }

})


const {actions, reducer} =  authSlice;

export default reducer;