import pkg, { Document, Types } from 'mongoose';
import IGame from '../interfaces/Game/index.js';
const { Schema, model } = pkg;

const schema = new Schema({
  participants: [{ type: Types.ObjectId, ref: 'User' }],
  gameId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<IGame & Document>('Game', schema);
