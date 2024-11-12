import pkg, { Document } from 'mongoose';
import IUser from '../interfaces/User/index.js';
const { Schema, model, Types } = pkg;

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
  refreshToken: { type: String },
  game: { type: Types.ObjectId, ref: 'Game' },
});

export default model<IUser & Document>('User', schema);
