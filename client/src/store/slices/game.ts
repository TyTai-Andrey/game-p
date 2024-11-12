// utils
import getGameStateByTurn from '@utils/getGameStateByTurn';

// types
import { GameAction, GameState } from '../types/game';
import { CreateSlice } from '../types';

type CreateGameSlice = CreateSlice<GameState & GameAction>;

const initGameState: GameState = {
  history: [],
  isFinished: null,
  finishedIndexes: null,
  maxTurnCount: -1,
  position: '_________',
  turnCount: -1,
  turnSymbol: 'X',
};

const createGameSlice: CreateGameSlice = set => ({
  history: [],
  isFinished: null,
  maxTurnCount: -1,
  finishedIndexes: null,
  nextTurn: () => set(({
    history, maxTurnCount, turnCount,
  }) => {
    const nextTurnIndex = turnCount + 1;

    if (nextTurnIndex > maxTurnCount) return {};
    const nextTurn = history[nextTurnIndex];
    if (!nextTurn) return {};

    return { ...nextTurn };
  }),
  position: '_________',
  prevTurn: () => set(({
    history,
    reset,
    turnCount,
  }) => {
    const historyIndex = turnCount - 1;
    if (historyIndex < 0) {
      reset(true);
      return {};
    }
    const prevTurn = history[historyIndex];

    if (!prevTurn) return {};

    return { ...prevTurn };
  }),
  reset: onlyPosition => set(({ position }) => {
    const newPosition = position.split('').fill('_').join('');

    if (onlyPosition) {
      return {
        position: newPosition,
        turnCount: -1,
        turnSymbol: 'X',
      };
    }

    return {
      ...initGameState,
      position: newPosition,
    };
  }),
  setPosition: cellIndex => set(({
    history,
    position,
    turnSymbol,
    itemsForWin,
  }) => getGameStateByTurn({
    history,
    position,
    turnSymbol,
    itemsForWin,
    cellIndex,
  })),
  turnCount: -1,
  turnSymbol: 'X',
});

export { initGameState };

export default createGameSlice;
