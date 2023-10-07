import {Schema, model} from 'mongoose';

const likeSchema = new Schema({
  whisperId: {
    type: String,
    required: true
  },
  likedById: {
    type: String,
    required: true
  }
}, {timestamps: true});

export default model('Like', likeSchema);