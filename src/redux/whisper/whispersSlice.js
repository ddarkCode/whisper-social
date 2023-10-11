import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getWhispers = createAsyncThunk(
  'whispers/get_all_whispers',
  async (WhispererId, thunkApi) => {
    const {data} = await axios.get(`http://localhost:3000/api/whispers`);
      return data;

  }
)

export const getWhispererWhispers = createAsyncThunk(
  'whispers/get_all_whisperer_whispers',
  async (WhispererId, thunkApi) => {
    const {data} = await axios.get(`http://localhost:3000/api/whispers/?whispererId=${WhispererId}`);
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

export const getLikes = createAsyncThunk(
  'whispers/get_likes',
  async (likeQuery, thunkApi) => {
    const {data} = await axios.get(`http://localhost:3000/api/likes/?whisperId=${likeQuery}`);
    return data;
  }
)

export const postLike = createAsyncThunk(
  'whispers/post_like',
  async (likeObj, thunkApi) => {
    const {data} = await axios.post('http://localhost:3000/api/likes/', likeObj);
    return data;
  }
)

export const deleteLike = createAsyncThunk(
  'whispers/delete_like',
  async (likeId, thunkApi) => {
    const {data} = await axios.delete(`http://localhost:3000/api/likes/${likeId}`);
    console.log('Whispers Slice: ', data);
    return data;
  }
)

export const getComments = createAsyncThunk(
  'whispers/get_comments',
 async (commentQuery, thunkApi) => {
  const {data} = await axios.get(`http://localhost:3000/api/comments/?whisperId=${commentQuery}`)
  return data;
  }
)
export const postComment = createAsyncThunk(
  'whispers/post_comment',
 async (commentObj, thunkApi) => {
  const {data} = await axios.post(`http://localhost:3000/api/comments`, commentObj)
  return data;
  }
)



const initialState = {
  whispererWhispers: [],
  whispers: [],
  whisper: {},
  likes: [],
  comments: [],
  liked: false,
  like: {}
}

export const whispersSlice = createSlice({
  name:'whispers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getWhispers.fulfilled, (state, action) => {
      state.whispers = action.payload;
    })
    builder.addCase(getWhispererWhispers.fulfilled, (state, action) => {
      state.whispererWhispers = action.payload;
    })
    builder.addCase(getWhisper.fulfilled, (state, action) => {
      state.whisper = action.payload;
    })
    builder.addCase(getLikes.fulfilled, (state, action) => {
      state.likes = action.payload;
    })
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    })
    builder.addCase(postLike.fulfilled, (state, action) => {
      state.likes = state.likes.concat(action.payload);
      state.liked = true
    })
    builder.addCase(deleteLike.fulfilled, (state, action) => {
      state.likes = state.likes.filter(like => like._id !== action.payload._id)
      state.liked = false
    })
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.comments = state.comments.concat(action.payload);
    })
  }
})

const {actions, reducer} = whispersSlice;

export default reducer;