// mongoose
import { Document } from 'mongoose';

// interfaces
import IGame from '../Game/index.js';

type IUser = {
  email: string
  password: string
  token: string
  refreshToken: string
  games: IGame[],
}

type IUserDocument = IUser & Document
export type { IUserDocument };
export default IUser;
