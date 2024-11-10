import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { IUserDocument } from "../interfaces/User/index.js";
import User from "../models/User.js";

type UserId = { userId: string }
type Message = { message: string }
type Success = { user: IUserDocument, exp: number }
type Result = Success | Message

const isSuccessValidate = (result: Result): result is Success => (result as Message)?.message === undefined;

const validateToken = async (token?: string, typeToken: "token" | "refreshToken" = "token"): Promise<Result> => {
  if (!token) return { message: 'Нет авторизации' };
  const decoded = jwt.verify(token, config.jwtSecret);
  if (decoded && decoded === 'string' || !(decoded as jwt.JwtPayload & UserId)?.userId) return { message: 'Нет авторизации' };
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

export { isSuccessValidate };
export default validateToken;
