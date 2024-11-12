import expressWs from "express-ws";
import IGame, { IGameDocument } from "../interfaces/Game/index.js";

enum MyWebSocketEvents {
  TURN = 'turn',
  CONNECT = 'connect',
  CONNECTION = 'connection',
}

type MSG = {
  event: MyWebSocketEvents;
  data: Omit<IGame, "createdAt" | "guest" | "owner">;
  token: string;
}

type Settings = {
  dashboardSize: number
  itemsForWin: number
  unfairPlay: boolean
  firstTurnSymbol: 'X' | 'O'
}

const getGameDataForBD = (data: MSG['data']) => ({
  history: data.history,
  turnSymbol: data.turnSymbol,
  position: data.position,
  isFinished: data.isFinished,
  finishedIndexes: JSON.stringify(data.finishedIndexes),
  maxTurnCount: data.maxTurnCount,
  turnCount: data.turnCount,
});

const getGameDataForSend = (data: IGameDocument, isOwner?: boolean) => {
  const settings = JSON.parse(data.settings);
  const history = JSON.parse(data.history);

  const { dashboardSize, firstTurnSymbol: ownerTurnSymbol, unfairPlay, itemsForWin } = settings as Settings;

  const guestTurnSymbol = ownerTurnSymbol === 'X' ? 'O' : 'X';
  const firstTurnSymbol = isOwner ? ownerTurnSymbol : guestTurnSymbol;

  return ({
    dashboardSize,
    firstTurnSymbol,
    unfairPlay,
    itemsForWin,
    history,
    turnSymbol: data.turnSymbol,
    position: data.position,
    isFinished: data.isFinished,
    finishedIndexes: data.finishedIndexes ? JSON.parse(data.finishedIndexes) : data.finishedIndexes,
    maxTurnCount: data.maxTurnCount,
    turnCount: data.turnCount,
    ...(typeof isOwner === 'boolean' ? { isOwner } : {}),
  });
}

type WebSocket = Parameters<expressWs.WebsocketRequestHandler>[0]
type WebSocketServer = ReturnType<expressWs.Instance['getWss']>

const getWSHelpers = (wss: WebSocketServer, ws: WebSocket) => {
  const sendForAllClient = (data: any) => {
    wss.clients.forEach(client => {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }

  const actionForThisClient = (callback: any) => {
    wss?.clients?.forEach(client => {
      if (client === ws && client?.readyState === ws?.OPEN) {
        callback();
      }
    });
  }

  const sendForThisClient = (data: any) => {
    wss.clients.forEach(client => {
      if (client === ws && client.readyState === ws.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }

  const sendForAllClientsExceptThis = (data: any) => {
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }

  return {
    actionForThisClient,
    sendForAllClient,
    sendForThisClient,
    sendForAllClientsExceptThis
  }
}

export type { MSG, Settings };
export { getWSHelpers, getGameDataForBD, getGameDataForSend, MyWebSocketEvents };