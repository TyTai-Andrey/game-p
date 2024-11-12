import expressWs from "express-ws";
import validateToken, { isSuccessValidate } from '../utils/validateToken.js';
import Game from '../models/Game.js';
import { getWSHelpers, getGameDataForBD, MyWebSocketEvents, getGameDataForSend } from '../utils/ws.js';
import type { MSG } from '../utils/ws.js';

const wsRouters = async (ws: expressWs.Instance) => {
  const { app: appWS, getWss } = ws;
  const wss = getWss();

  appWS.ws('/game/:id', async (ws, req) => {
    const { id } = req.params;
    const {
      actionForThisClient,
      sendForAllClient,
      sendForThisClient,
      sendForAllClientsExceptThis
    } = getWSHelpers(wss, ws);

    try {
      const game = await Game.findById(id);
      if (!game) throw new Error('Game not found');

      sendForThisClient({
        event: MyWebSocketEvents.CONNECTION,
        data: { success: true },
      })
    } catch (error) {
      sendForThisClient({
        event: MyWebSocketEvents.CONNECTION,
        data: { success: false },
      })
      actionForThisClient(ws.close);
    }

    ws.on('message', async (msg) => {
      try {
        const msgObj = JSON.parse(msg.toString()) as MSG;
        const { event, data, token } = msgObj || {};

        const validate = await validateToken(token);

        if (!isSuccessValidate(validate)) {
          actionForThisClient(ws.close);
          return;
        }

        switch (event) {
          case MyWebSocketEvents.CONNECT: {
            if (!id) actionForThisClient(ws.close);

            const game = await Game.findOne({ _id: id });
            if (!game) throw new Error('Game not found');

            const hasGuest = game.guest;
            const isOwner = game?.owner?.toString() === validate?.user?.id;
            const isGuest = hasGuest && game.guest?.toString() === validate.user.id;

            if (isOwner || (isGuest)) {
              sendForThisClient({
                event: MyWebSocketEvents.CONNECT,
                data: getGameDataForSend(game, isOwner),
              })
              return;
            }
            if (!hasGuest) {
              await Game.findOneAndUpdate({ _id: game._id }, {
                guest: validate.user.id,
              });
              sendForThisClient({
                event: MyWebSocketEvents.CONNECT,
                data: getGameDataForSend(game, isOwner),
              })
            }
          }
          case MyWebSocketEvents.TURN: {
            const gameData = getGameDataForBD(data);
            console.log(gameData);

            const game = await Game.findOneAndUpdate({ _id: id }, {
              ...gameData,
            }, { new: true });
            const isOwner = game?.owner?.toString() === validate?.user?.id;
            console.log(game, "game");

            if (!game) throw new Error('Game not found');

            sendForAllClientsExceptThis({
              event: MyWebSocketEvents.TURN,
              data: getGameDataForSend(game, !isOwner),
            })
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
        })
        actionForThisClient(() => ws?.close?.());
      }
    });
  });
}


export default wsRouters;