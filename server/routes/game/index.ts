// express
import { Router } from 'express';

// constants
import { pathnamesGameRoutes } from '../../constants/pathnames.js';

// controllers
import GameController from '../../controllers/game/index.js';

// middleware
import needAuthMiddleware from '../../middleware/auth.js';

const router = Router();

router.post(pathnamesGameRoutes.create, needAuthMiddleware, GameController.create);

export default router;
