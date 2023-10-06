import {Schema, model} from 'mongoose';

const whisperSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  whisper: {
    type: String,
    required: true
  },
  whispererId: {
    type: String,
    required: true
  }
}, {})

export default model('Whisper', whisperSchema)