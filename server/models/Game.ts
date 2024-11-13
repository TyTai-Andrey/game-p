// mongoose
import pkg, { Document } from 'mongoose';

// interfaces
import IGame from '../interfaces/Game/index.js';

const { Schema, model, Types } = pkg;

const schema = new Schema({
  owner: { type: Types.ObjectId, required: true, ref: 'User' },
  guest: { type: Types.ObjectId, ref: 'User' },

  settings: { type: String, required: true },
  history: { type: String },
  turnSymbol: { type: String },
  firstTurnSymbol: { type: String },
  isFinished: { type: String, null: true },
  finishedIndexes: { type: String, null: true },
  position: { type: String },

  maxTurnCount: { type: Number },
  turnCount: { type: Number },

  createdAt: { type: Date, default: Date.now },
});

export default model<IGame & Document>('Game', schema);
