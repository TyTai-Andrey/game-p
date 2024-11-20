import authorization from '@utils/authorization';

// types
import type { GameState } from '@store/types/game';
import type { SettingsState } from '@store/types/settings';

enum MyWebSocketEvents {
  CONNECT = 'connect',
  CONNECT_FRIEND = 'connect_friend',
  CONNECTION = 'connection',
  TURN = 'turn',
  DISCONNECT = 'disconnect',
}

type WSGameDate = {
  settings?: string | SettingsState;
  history: string | GameState['history'];
  turnSymbol: 'X' | 'O';
  position: string;
  isFinished: 'X' | 'O' | null;
  finishedIndexes: number[] | null;
  gameId?: string;
  maxTurnCount: number;
  turnCount: number;
} & Partial<SettingsState>;

type MSGRequest = {
  event: MyWebSocketEvents;
  data: WSGameDate;
  token: string;
};

type MSGResponse = {
  event: MyWebSocketEvents;
  data: WSGameDate;
};

type CreateWebSocketMessageProps = {
  event: MyWebSocketEvents;
  data?: WSGameDate;
};

const createGameSocket = (uuid: string) => new WebSocket(
  `ws://${process.env.REACT_APP_API_BASE_DOMAIN}/game/${uuid}`,
);

const createWebSocketMessage = (props: CreateWebSocketMessageProps) => {
  const history = JSON.stringify(props.data?.history || []);
  const settings = JSON.stringify(props.data?.settings || {
    dashboardSize: props.data?.dashboardSize,
    itemsForWin: props.data?.itemsForWin,
    unfairPlay: props.data?.unfairPlay,
    firstTurnSymbol: props.data?.firstTurnSymbol,
  });
  const data = {
    turnSymbol: props.data?.turnSymbol,
    position: props.data?.position,
    isFinished: props.data?.isFinished,
    finishedIndexes: props.data?.finishedIndexes,
    gameId: props.data?.gameId,
    history,
    settings,
    maxTurnCount: props.data?.maxTurnCount,
    turnCount: props.data?.turnCount,
  };
  return JSON.stringify({ event: props.event, data, token: authorization.getToken() });
};

export { createGameSocket, MyWebSocketEvents };
export type { MSGRequest, MSGResponse, WSGameDate };
export default createWebSocketMessage;
