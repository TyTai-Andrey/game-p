// express
import { Router } from 'express';

// routes
import authRoutes from './auth/index.js';
import gameRoutes from './game/index.js';

// constants
import { pathnameAuthRoutePrefix, pathnameGameRoutePrefix } from '../constants/pathnames.js';

const router = Router();

router.use(pathnameAuthRoutePrefix, authRoutes);
router.use(pathnameGameRoutePrefix, gameRoutes);

export default router;
