// express
import { Router } from 'express';

// controllers
import AuthController from '../../controllers/auth/index.js';

// constants
import { pathnamesAuthRoutes } from '../../constants/pathnames.js';

// middleware
import needUserDataMiddleware from '../../middleware/userData.js';
import needAuthMiddleware from '../../middleware/auth.js';

const router = Router();

router.post(pathnamesAuthRoutes.logout, needAuthMiddleware, AuthController.logout);
router.post(pathnamesAuthRoutes.refresh, AuthController.refresh);
router.post(
  pathnamesAuthRoutes.register,
  ...needUserDataMiddleware,
  AuthController.register,
);
router.post(
  pathnamesAuthRoutes.login,
  ...needUserDataMiddleware,
  AuthController.login,
);

export default router;
