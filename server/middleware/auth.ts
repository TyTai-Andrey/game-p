import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import User from '../models/User.js';
import validateToken, { isSuccessValidate } from '../utils/validateToken.js';

const authorizationExceptions = ['/login/', '/register/', '/refresh/'];

const needAuth = async (req: Request & any, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') return next();
  if (authorizationExceptions.find(i => i.includes(req.path))) return next();

  try {
    const token = req.headers['authorization']?.split(' ')[1]; // "Bearer TOKEN"

    const validate = await validateToken(token);
    if (!isSuccessValidate(validate)) {
      return res.status(401).json(validate);
    }

    req.body.middleware = {
      userId: validate.user.id,
    };
    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({ message: 'Нет авторизации' });
  }
};

export default needAuth