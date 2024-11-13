// express
import { NextFunction, Request, Response } from 'express';

// utils
import { validateToken, isSuccessValidateToken } from '../utils/token-operations.js';

const authorizationExceptions = [
  '/auth/login/',
  '/auth/register/',
  '/auth/refresh/',
];

const needAuth = async (req: Request & any, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') return next();
  if (authorizationExceptions.find((i) => i.includes(req.path))) return next();

  try {
    const token = req.headers['authorization']?.split(' ')[1]; // "Bearer TOKEN"

    const validate = await validateToken(token);
    if (!isSuccessValidateToken(validate)) {
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

export default needAuth;
