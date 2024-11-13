// express
import { Router } from 'express';

// models
import User from '../../models/User.js';
import Game from '../../models/Game.js';

// utils
import { MyWebSocketEvents, Settings } from '../../utils/ws-operations.js';

// ws
import ExpressWs from '../../instances/ws.js';

const router = Router();

router.get('/test', async (req, res) => {
  const { userId } = req.body.middleware;
  const user = await User.findOne({ _id: userId });
  const games = await Game.find({ owner: userId });
  if (!user?.token) {
    return res.status(400).json({ message: 'Пользователь не найден' });
  }
  res.json({ user, games });
});

router.post(
  '/create',
  async (req, res) => {
    try {
      const settings = req.body;

      const {
        dashboardSize, firstTurnSymbol, unfairPlay, itemsForWin,
      } = settings as Settings;
      const settingsStr = JSON.stringify({
        dashboardSize, firstTurnSymbol, unfairPlay, itemsForWin,
      });
      const { userId } = req.body.middleware;
      const prevGame = await Game.findOne({ owner: userId });

      if (prevGame?.id && prevGame?.guest) {
        const wss = new ExpressWs().getWss();
        wss?.clients?.forEach((client) => {
          if (
            client.readyState === client.OPEN
            && client.gameId === prevGame?.id
            && client.gameId !== prevGame?.guest?.toString()
          ) {
            client.send(JSON.stringify({ event: MyWebSocketEvents.CONNECTION, data: { success: false } }));
          }
        });
      }

      await Game.deleteMany({ owner: userId });

      const game = new Game({
        settings: settingsStr,
        history: JSON.stringify([]),
        turnSymbol: 'X',
        firstTurnSymbol,
        position: new Array(dashboardSize ** 2).fill('_').join(''),
        isFinished: null,
        finishedIndexes: null,
        owner: userId,
      });

      const savedGame = await game.save();

      await User.findOneAndUpdate({ _id: userId }, { game: savedGame.id }, { new: true });

      res.json({ gameId: savedGame.id });
    } catch (error) {
      res.status(500).json({ message: 'Что-то пошло не так' });
    }
  },
);

export default router;
