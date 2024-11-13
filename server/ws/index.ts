// express
import expressWs from 'express-ws';

// models
import Game from '../models/Game.js';

// utils
import { validateToken, isSuccessValidateToken } from '../utils/token-operations.js';
import {
  getWSHelpers,
  getGameDataForBD,
  MyWebSocketEvents,
  getGameDataForSend,
} from '../utils/ws-operations.js';
import type { MSG, WebSocket, WebSocketServerWithPatchClient } from '../utils/ws-operations.js';

// interfaces
import { IGameDocument } from '../interfaces/Game/index.js';

const getIdAndTypeThisGame = (game: IGameDocument, userId: string) => {
  const ownerId = game?.owner?.toString?.();
  const guestId = game?.guest?.toString?.();

  const hasGuest = game.guest;
  const isOwner = ownerId === userId;
  const isGuest = hasGuest && guestId === userId;

  return {
    hasGuest, isOwner, isGuest, guestId, ownerId,
  };
};

const wsRouters = async (ws: expressWs.Instance) => {
  const { app: appWS, getWss } = ws;
  const wss: WebSocketServerWithPatchClient = getWss();

  appWS.ws('/game/:id', async (ws: WebSocket, req) => {
    const { id } = req.params;
    try {
      const game = await Game.findById(id);
      if (!game) throw new Error('Game not found');

      ws.send(JSON.stringify({ event: MyWebSocketEvents.CONNECTION, data: { success: true } }));
    } catch (error) {
      ws.send(JSON.stringify({ event: MyWebSocketEvents.CONNECTION, data: { success: false } }));
      ws.close();
    }

    const {
      actionForThisClient,
      sendForThisClient,
      sendForClientById,
    } = getWSHelpers(wss, ws, id);

    ws.on('message', async (msg) => {
      try {
        const msgObj = JSON.parse(msg.toString()) as MSG;
        const { event, data, token } = msgObj || {};

        const validate = await validateToken(token);

        if (!isSuccessValidateToken(validate)) {
          actionForThisClient(ws.close);
          return;
        }

        switch (event) {
          case MyWebSocketEvents.CONNECT: {
            if (!id) actionForThisClient(ws.close);

            const game = await Game.findOne({ _id: id });
            if (!game) throw new Error('Game not found');

            ws.clientId = validate.user.id.toString();
            ws.gameId = game._id.toString();

            const { hasGuest, isOwner, isGuest } = getIdAndTypeThisGame(game, validate.user.id);

            if (isOwner || (isGuest)) {
              sendForThisClient({
                event: MyWebSocketEvents.CONNECT,
                data: getGameDataForSend(game, isOwner),
              });
              return;
            }
            if (!hasGuest) {
              await Game.findOneAndUpdate({ _id: game._id }, {
                guest: validate.user.id,
              });
              sendForThisClient({
                event: MyWebSocketEvents.CONNECT,
                data: getGameDataForSend(game, isOwner),
              });
            }
          }
          case MyWebSocketEvents.TURN: {
            const gameData = getGameDataForBD(data);

            const game = await Game.findOneAndUpdate({ _id: id }, {
              ...gameData,
            }, { new: true });

            if (!game) throw new Error('Game not found');

            const { isOwner, ownerId, guestId } = getIdAndTypeThisGame(game, validate.user.id);
            sendForClientById({
              event: MyWebSocketEvents.TURN,
              data: getGameDataForSend(game, !isOwner),
            }, isOwner ? guestId : ownerId);
          }
          default: {
            break;
          }
        }
      } catch (error) {
        console.log(error);

        sendForThisClient({
          event: MyWebSocketEvents.CONNECTION,
          data: { success: false },
        });
        actionForThisClient(() => ws?.close?.());
      }
    });
  });
};

export default wsRouters;
