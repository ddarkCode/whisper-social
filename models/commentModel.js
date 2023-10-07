import {Schema, model} from 'mongoose';

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  commentById: {
    type: String,
    required: true
  },
  whisperId: {
    type: String,
    required: true
  }
}, {timestamps: true})

export default model('Comment', commentSchema)