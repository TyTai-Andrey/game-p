// express
import { RequestHandler } from 'express';

// models
import User from '../../models/User.js';
import Game from '../../models/Game.js';

// constants
import { IGameControllerName } from '../../constants/pathnames.js';

// utils
import { createDefaultError } from '../../utils/errors-operations.js';
import { MyWebSocketEvents, Settings } from '../../utils/ws-operations.js';

// ws
import ExpressWs, { WebSocket } from '../../instances/ws.js';

type IGameController = Record<IGameControllerName, RequestHandler>

const GameController: IGameController = {
  create: async (req, res) => {
    try {
      const settings = req.body;

      const {
        dashboardSize,
        firstTurnSymbol,
        unfairPlay,
        itemsForWin,
      } = settings as Settings;

      const { userId } = req.body.middleware;
      const prevGame = await Game.findOne({ owner: userId });

      if (prevGame?.id && prevGame?.guest) {
        const funcCondition = (client: WebSocket) => client.readyState === client.OPEN
          && client.gameId === prevGame?.id
          && client.gameId !== prevGame?.guest?.toString();

        new ExpressWs().sendForClientByFuncCondition(
          funcCondition,
          { event: MyWebSocketEvents.CONNECTION, data: { success: false } },
        );
      }

      await Game.deleteMany({ owner: userId });

      const settingsStr = JSON.stringify({
        dashboardSize,
        firstTurnSymbol,
        unfairPlay,
        itemsForWin,
      });

      const game = new Game({
        settings: settingsStr,
        history: JSON.stringify([]),
        turnSymbol: 'X',
        firstTurnSymbol,
        position: new Array(dashboardSize ** 2).fill('_').join(''),
        isFinished: null,
        finishedIndexes: null,
        owner: userId,
        maxTurnCount: -1,
        turnCount: -1,
      });

      const savedGame = await game.save();

      await User.findOneAndUpdate({ _id: userId }, { game: savedGame.id }, { new: true });

      res.json({ gameId: savedGame.id });
    } catch (error) {
      createDefaultError(res);
    }
  },
};

export default GameController;
