import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getWhispers = createAsyncThunk(
  'whispers/get_all_whispers',
  async (users, thunkApi) => {
    const {data} = await axios.get('http://localhost:3000/api/whispers');
      return data;

  }
)
export const getWhisper = createAsyncThunk(
  'whispers/get_a_whisper',
  async (whisperId, thunkApi) => {
    const {data} = await axios.get(`http://localhost:3000/api/whispers/${whisperId}`);
    return data;
  }
)




const initialState = {
  whispers: [],
  whisper: {}
}

export const whispersSlice = createSlice({
  name:'whispers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getWhispers.fulfilled, (state, action) => {
      state.whispers = action.payload;
    })
    builder.addCase(getWhisper.fulfilled, (state, action) => {
      state.whisper = action.payload;
    })
  }
})

const {actions, reducer} = whispersSlice;

export default reducer;