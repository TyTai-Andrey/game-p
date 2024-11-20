type IHistoryItem = {
  position: string,
  turnSymbol: 'X' | 'O',
  turnCount: number,
  cellIndex: number,
};

type GameState = {
  turnSymbol: 'X' | 'O',
  isFinished: null | 'X' | 'O',
  finishedIndexes: number[] | null,
  turnCount: number,
  maxTurnCount: number,
  position: string,
  history: IHistoryItem[],
  clientsOnline: number,
};

type GameAction = {
  setPosition: (cellIndex: number) => void,
  setClientsOnline: (clientsOnline: number) => void,
  nextTurn: () => void,
  prevTurn: () => void,
  reset: (onlyPosition?: boolean) => void
};

export type {
  GameAction,
  GameState,
  IHistoryItem,
};
