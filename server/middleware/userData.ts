// express
import { NextFunction, Request, Response } from 'express';
import { validationResult, check } from 'express-validator';

// utils
import { createError } from '../utils/errors-operations.js';

const validates = [
  check('email', 'Некорректный email').isEmail(),
  check('password', 'Минимальная длина пароля 6 символов').isLength({
    min: 6,
  }),
];

const needUserDataMiddleware = [...validates, async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return createError(res, {
      errors,
      message: 'Некорректные данные при регистрации',
    });
  }

  next();
}];

export default needUserDataMiddleware;
