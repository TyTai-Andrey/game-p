import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { IUserDocument } from "../interfaces/User/index.js";

const createTokens = (user: IUserDocument) => {
  const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
    expiresIn: '1h',
  });

  const refreshToken = jwt.sign({ userId: user.id }, config.jwtSecret, {
    expiresIn: '7d',
  });

  return { token, refreshToken };
};


export default createTokens;
