import { Router } from "express";
import authRoutes from './auth/index.js';
import gameRoutes from './game/index.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/game', gameRoutes);


export default router;