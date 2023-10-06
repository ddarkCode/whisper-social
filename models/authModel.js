import {Schema, model} from 'mongoose';
import {hash, compare} from 'bcrypt';;

const authSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 2
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8
  },
  image_url: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: 'Pale Blue Dot'
  },
  followers: {
    type: Array,
    default: []
  },
  following: {
    type: Array,
    default: []
  }

}, {timestamps: true})

authSchema.pre('save', async function(next, options) {
  const user = this;
    user.username = '@' + user.username
    user.password = await hash(user.password, +process.env.SALT_ROUND)
    next()
})

authSchema.methods.verifyPassword = async function(password, hashed) {
  return compare(password, hashed);
}

export default model('User', authSchema);