// express
import { NextFunction, Request, Response } from 'express';

// utils
import { validateToken, isSuccessValidateToken } from '../utils/token-operations.js';
import { createError } from '../utils/errors-operations.js';

const needAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') return next();

  try {
    const token = req.headers['authorization']?.split(' ')[1]; // "Bearer TOKEN"

    const validate = await validateToken(token);
    if (!isSuccessValidateToken(validate)) {
      return createError(res, {
        status: 401,
        message: validate.message,
      });
    }

    req.body.middleware = {
      userId: validate.user.id,
    };
    next();
  } catch (error) {
    console.log(error);

    createError(res, { status: 401, message: 'Нет авторизации' });
  }
};

export default needAuthMiddleware;
