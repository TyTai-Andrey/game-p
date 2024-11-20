// interfaces
import IGame, { IGameDocument } from '../interfaces/Game/index.js';

enum MyWebSocketEvents {
  TURN = 'turn',
  CONNECT = 'connect',
  CONNECT_FRIEND = 'connect_friend',
  CONNECTION = 'connection',
  DISCONNECT = 'disconnect',
}

type MSG = {
  event: MyWebSocketEvents;
  data: Omit<IGame, 'createdAt' | 'guest' | 'owner'>;
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

  const {
    dashboardSize,
    firstTurnSymbol: ownerTurnSymbol,
    unfairPlay,
    itemsForWin,
  } = settings as Settings;

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
};

type IConnectionWSMessage = ({
  event: MyWebSocketEvents.CONNECTION;
  data: { success: boolean; message?: string };
});

function createConnectionWSMessage(message: string, isJson: false, success?: boolean): IConnectionWSMessage;
function createConnectionWSMessage(message: string, isJson?: true, success?: boolean): string;
function createConnectionWSMessage(message: string, isJson: boolean = true, success: boolean = false) {
  const data: IConnectionWSMessage = {
    event: MyWebSocketEvents.CONNECTION,
    data: { success, message },
  };

  return isJson ? JSON.stringify(data) : data;
}

export type {
  MSG,
  Settings,
};
export {
  getGameDataForBD,
  getGameDataForSend,
  MyWebSocketEvents,
  createConnectionWSMessage,
};
