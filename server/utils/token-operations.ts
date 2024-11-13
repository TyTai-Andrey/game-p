// jsonwebtoken
import jwt from 'jsonwebtoken';

// config
import config from '../config/config.js';

// interfaces
import { IUserDocument } from '../interfaces/User/index.js';

// models
import User from '../models/User.js';

type UserId = { userId: string }
type Message = { message: string }
type Success = { user: IUserDocument, exp: number }
type Result = Success | Message

const isSuccessValidateToken = (result: Result): result is Success => (result as Message)?.message === undefined;

const createTokens = (user: IUserDocument) => {
  const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
    expiresIn: '1h',
  });

  const refreshToken = jwt.sign({ userId: user.id }, config.jwtSecret, {
    expiresIn: '7d',
  });

  return { token, refreshToken };
};

const validateToken = async (token?: string, typeToken: 'token' | 'refreshToken' = 'token'): Promise<Result> => {
  if (!token) return { message: 'Нет авторизации' };
  const decoded = jwt.verify(token, config.jwtSecret);
  if ((decoded && decoded === 'string') || !(decoded as jwt.JwtPayload & UserId)?.userId) return { message: 'Нет авторизации' };
  const { exp, userId } = decoded as jwt.JwtPayload & UserId;
  if (typeof exp !== 'number' || (exp < (Date.now() / 1000))) {
    return { message: 'Нет авторизации' };
  }

  const user = await User.findOne({ _id: userId });
  if (!user || user?.[typeToken] !== token) {
    return { message: 'Нет авторизации' };
  }
  return { user, exp };
};

export { validateToken, createTokens, isSuccessValidateToken };
