import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getAUserProfile = createAsyncThunk(
  'users/get_a_user',
  async (userId, thunkApi) => {
    const {data} = await axios.get(`http://localhost:3000/api/users/${userId}`);
    return data;
  }
)

const initialState = {
  users: [],
  user: {}
}

export const usersSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
    builder.addCase(getAUserProfile.fulfilled, (state, action) => {
      state.user = action.payload
    })
   }
})


const {reducer, actions} = usersSlice

export default reducer;