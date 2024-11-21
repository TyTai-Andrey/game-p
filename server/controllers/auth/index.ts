// bcryptjs
import bcrypt from 'bcryptjs';

// express
import { RequestHandler } from 'express';

// models
import User from '../../models/User.js';

// utils
import {
  validateToken,
  createTokens,
  isSuccessValidateToken,
} from '../../utils/token-operations.js';
import { IAuthControllerName } from '../../constants/pathnames.js';
import { createDefaultError, createError } from '../../utils/errors-operations.js';

type IAuthController = Record<IAuthControllerName, RequestHandler>

const AuthController: IAuthController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return createError(res, {
          message: 'Такой пользователь уже существует',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      const { token, refreshToken } = createTokens(user);
      await User.findOneAndUpdate({ _id: user.id }, { token, refreshToken });

      res.json({ token, refreshToken, userId: user.id });
    } catch (error) {
      createDefaultError(res);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return createError(res, { message: 'Пользователь не найден' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return createError(res, { message: 'Неверный пароль, попробуйте снова' });
      }

      const { token, refreshToken } = createTokens(user);

      await User.findOneAndUpdate({ _id: user.id }, { token, refreshToken });
      res.json({ token, refreshToken, userId: user.id });
    } catch (error) {
      createDefaultError(res);
    }
  },
  logout: async (req, res) => {
    try {
      const { userId } = req.body.middleware;
      await User.findOneAndUpdate({ _id: userId }, { token: '', refreshToken: '' });
      res.json({ success: true });
    } catch (error) {
      createDefaultError(res);
    }
  },
  refresh: async (req, res) => {
    try {
      const { refresh } = req.body;
      const validate = await validateToken(refresh, 'refreshToken');
      if (!isSuccessValidateToken(validate)) {
        return createError(res, {
          status: 401,
          message: validate.message,
        });
      }
      const { user } = validate;
      const { token, refreshToken } = createTokens(user);
      await User.findOneAndUpdate({ _id: user.id }, { token, refreshToken });
      res.json({ token, refreshToken, userId: user.id });
    } catch (error) {
      createDefaultError(res);
    }
  },
};

export default AuthController;
