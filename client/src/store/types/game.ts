type GameState = {
  turnSymbol: 'X' | 'O',
  isFinished: null | 'X' | 'O',
  finishedIndexes: number[] | null,
  turnCount: number,
  maxTurnCount: number,
  position: string,
  history: {
    position: string,
    turnSymbol: 'X' | 'O',
    turnCount: number,
    cellIndex: number
  }[],
};

type GameAction = {
  setPosition: (cellIndex: number) => void,
  nextTurn: () => void,
  prevTurn: () => void,
  reset: (onlyPosition?: boolean) => void
};

export type {
  GameAction,
  GameState,
};
