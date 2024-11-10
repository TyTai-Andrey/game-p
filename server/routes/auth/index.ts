import { Request, Router } from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import config from "../../config/config.js";
import createTokens from "../../utils/createTokens.js";
import validateToken, { isSuccessValidate } from "../../utils/validateToken.js";

const router = Router();

const validates = [
  check('email', 'Некорректный email').isEmail(),
  check('password', 'Минимальная длина пароля 6 символов').isLength({
    min: 6,
  }),
];

router.get('/test', async (req, res) => {
  const { userId } = req.body.middleware;
  const user = await User.findOne({ _id: userId });
  if (!user?.token) {
    return res.status(400).json({ message: 'Пользователь не найден' });
  }
  res.json({ user });
})

router.post('/register',
  ...validates,
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при регистрации',
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: 'Такой пользователь уже существует' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      const { token, refreshToken } = createTokens(user);

      res.json({ token, refreshToken, userId: user.id });
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.post('/login',
  ...validates,
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при входе в систему',
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: 'Неверный пароль, попробуйте снова' });
      }

      const { token, refreshToken } = createTokens(user);

      await User.findOneAndUpdate({ _id: user.id }, { token, refreshToken });
      res.json({ token, refreshToken, userId: user.id });
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.post('/logout', async (req, res) => {
  try {
    const { userId } = req.body.middleware;
    await User.findOneAndUpdate({ _id: userId }, { token: '', refreshToken: '' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post('/refresh', async (req, res) => {
  try {
    const { refresh } = req.body;
    const validate = await validateToken(refresh, "refreshToken");
    if (!isSuccessValidate(validate)) {
      return res.status(401).json(validate);
    }
    const { user } = validate
    const { token, refreshToken } = createTokens(user);
    await User.findOneAndUpdate({ _id: user.id }, { token, refreshToken });
    res.json({ token, refreshToken, userId: user.id });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;