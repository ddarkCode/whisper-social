import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const whisperSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    whisper: {
      type: String,
      required: true,
    },
    whispererId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

whisperSchema.plugin(mongoosePaginate);

export default model('Whisper', whisperSchema);
