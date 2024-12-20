// express
import expressWs from 'express-ws';

// models
import Game from '../models/Game.js';

// utils
import { validateToken, isSuccessValidateToken } from '../utils/token-operations.js';
import {
  getGameDataForBD,
  MyWebSocketEvents,
  getGameDataForSend,
  createConnectionWSMessage,
} from '../utils/ws-operations.js';
import type { MSG } from '../utils/ws-operations.js';

// interfaces
import { IGameDocument } from '../interfaces/Game/index.js';
import ExpressWs, { WebSocket } from '../instances/ws.js';

const getIdAndTypeThisGame = (game: IGameDocument, userId: string) => {
  const ownerId = game?.owner?.toString?.();
  const hasGuest = game.guest;
  const guestId = hasGuest && game?.guest?.toString?.();

  const isOwner = ownerId === userId;
  const isGuest = hasGuest && guestId === userId;
  const friendId = isGuest ? ownerId : guestId;

  return {
    hasGuest,
    isOwner,
    isGuest,
    guestId,
    ownerId,
    friendId,
  };
};

const wsRouters = async (ws: expressWs.Instance) => {
  const { app: appWS } = ws;

  appWS.ws('/game/:id', async (ws: WebSocket, req) => {
    const { id } = req.params;
    try {
      if (!id) throw new Error('Game not found');
      const game = await Game.findById(id).catch(() => null);
      if (!game) throw new Error('Game not found');

      ws.send(createConnectionWSMessage('Соединение установлено', true, true));
    } catch (error) {
      ws.send?.(createConnectionWSMessage((error as Error).message));
      ws.close();
    }

    const {
      sendForThisClient,
      sendForClientById,
    } = new ExpressWs().getClientHelpers(ws);

    ws.on('close', () => {
      if (ws.friendId) {
        const clientsThisGame = new ExpressWs().getClientsThisGame(id, true);

        sendForClientById({
          event: MyWebSocketEvents.DISCONNECT,
          data: {
            clientsOnline: clientsThisGame.size,
          },
        }, ws.friendId);
      }
    });

    ws.on('message', async (msg) => {
      try {
        const msgObj = JSON.parse(msg.toString()) as MSG;
        const { event, data, token } = msgObj || {};

        const validate = await validateToken(token);

        if (!isSuccessValidateToken(validate)) {
          ws.close();
          return;
        }
        const game = await Game.findOne({ _id: id });
        if (!game) throw new Error('Игра не найдена');

        const {
          hasGuest,
          isOwner,
          isGuest,
          friendId,
        } = getIdAndTypeThisGame(game, validate.user.id);

        ws.clientId = validate.user.id.toString();
        ws.gameId = game._id.toString();
        if (friendId) {
          ws.friendId = friendId;
        }

        switch (event) {
          case MyWebSocketEvents.CONNECT: {
            const clientsThisGame = new ExpressWs().getClientsThisGame(id, true);

            const dataForConnectFriendEvent = {
              event: MyWebSocketEvents.CONNECT_FRIEND,
              data: {
                clientsOnline: clientsThisGame.size,
              },
            };

            const dataForConnectEvent = {
              event: MyWebSocketEvents.CONNECT,
              data: {
                ...getGameDataForSend(game, isOwner),
                clientsOnline: clientsThisGame.size,
              },
            };

            if (isOwner || (isGuest)) {
              sendForThisClient(dataForConnectEvent);

              if (ws.friendId) {
                sendForClientById(dataForConnectFriendEvent, ws.friendId);
              }
              return;
            }
            if (!hasGuest) {
              await Game.findOneAndUpdate({ _id: game._id }, {
                guest: validate.user.id,
              });
              const myId = validate.user.id.toString();
              ws.friendId = game.owner.toString();
              new ExpressWs().getWss().clients.forEach((client) => {
                if (ws !== client && client.gameId === game._id.toString()) {
                  client.friendId = myId;
                }
              });
              sendForClientById(dataForConnectFriendEvent, game.owner.toString());
              sendForThisClient(dataForConnectEvent);
            }
          }
          case MyWebSocketEvents.TURN: {
            const gameData = getGameDataForBD(data);

            const game = await Game.findOneAndUpdate({ _id: id }, {
              ...gameData,
            }, { new: true }).catch(() => null);

            if (!game) throw new Error('Игра не найдена');

            const { isOwner, friendId } = getIdAndTypeThisGame(game, validate.user.id);
            if (friendId) {
              sendForClientById({
                event: MyWebSocketEvents.TURN,
                data: getGameDataForSend(game, !isOwner),
              }, friendId);
            }
          }
          default: {
            break;
          }
        }
      } catch (error) {
        console.log(error);

        ws?.send?.(createConnectionWSMessage((error as Error).message));
        ws?.close?.();
      }
    });
  });
};

export default wsRouters;
