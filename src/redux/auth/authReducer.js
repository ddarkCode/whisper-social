import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '..';

const initialState = {
  user: null,
  info: null,
};

export const signup = createAsyncThunk(
  'auth/signup',
  async (user, thunkApi) => {
    const { data } = await axios.post(`${baseUrl}/api/auth/signup`, user);
    return data;
  }
);

export const signin = createAsyncThunk(
  'auth/signin',
  async (user, thunkApi) => {
    const { data } = await axios.post(`${baseUrl}/api/auth/signin`, user);
    return data;
  }
);

export const signout = createAsyncThunk(
  'auth/signout',
  async (user, thunkApi) => {
    const { data } = await axios.get(`${baseUrl}/api/auth/signout`, user);
    return data;
  }
);

export const update = createAsyncThunk(
  'auth/update',
  async (user, thunkApi) => {
    const { data } = await axios.patch(
      `${baseUrl}/api/users/${user.userId}`,
      user
    );
    return data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuthOnPageLoad(state, action) {
      state.user = JSON.parse(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      localStorage.setItem('auth', JSON.stringify(action.payload.user));
      state.user = action.payload.user;
      state.info = action.payload.info;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      localStorage.setItem('auth', JSON.stringify(action.payload.user));
      state.user = action.payload.user;
      state.info = action.payload.info;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      localStorage.setItem('auth', JSON.stringify(action.payload.user));
      state.user = action.payload.user;
      state.info = action.payload.info;
    });
    builder.addCase(signout.fulfilled, (state, action) => {
      localStorage.setItem('auth', action.payload.user);
      state.user = action.payload.user;
      state.info = action.payload.message;
    });
  },
});

const { actions, reducer } = authSlice;

const { updateAuthOnPageLoad } = actions;

export { updateAuthOnPageLoad };

export default reducer;
