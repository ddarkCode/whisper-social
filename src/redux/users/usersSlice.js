import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

import { baseUrl } from '..';

const notify = (message) => toast(message);

export const getAUserProfile = createAsyncThunk(
  'users/get_a_user',
  async (userId, thunkApi) => {
    const { data } = await axios.get(`${baseUrl}/api/users/${userId}`);
    return data;
  }
);

export const followUser = createAsyncThunk(
  'users/follower_user',
  async (user, thunkApi) => {
    const { data } = await axios.patch(
      `${baseUrl}/api/users/${user.userId}/follow`,
      user
    );
    return data;
  }
);

export const unfollowUser = createAsyncThunk(
  'users/un_follower_user',
  async (user, thunkApi) => {
    const { data } = await axios.patch(
      `${baseUrl}/api/users/${user.userId}/unfollow`,
      user
    );
    return data;
  }
);

const initialState = {
  users: [],
  user: {},
  notification: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(followUser.fulfilled, (state, action) => {
      notify(action.payload.message);
    });
    builder.addCase(unfollowUser.fulfilled, (state, action) => {
      notify(action.payload.message);
    });
  },
});

const { reducer, actions } = usersSlice;

export default reducer;
