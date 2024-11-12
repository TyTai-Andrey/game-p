// types
import type { GameState } from '@store/types/game';
import type { SettingsState } from '@store/types/settings';
import type { State } from '@store/types';

// utils
import isFinish from './isFinish';

type GetGameStateByTurnProps = {
  cellIndex: number,
} & Pick<GameState, 'turnSymbol' | 'position' | 'history'>
& Pick<SettingsState, 'itemsForWin'>;

const getGameStateByTurn = ({
  cellIndex,
  history,
  position,
  turnSymbol,
  itemsForWin,
}: GetGameStateByTurnProps): Partial<State> => {
  const newPosition = position.slice(0, cellIndex) + turnSymbol + position.slice(cellIndex + 1);
  const turnCount = history.length;
  const finishedIndexes = isFinish({
    position: newPosition,
    itemsForWin,
    symbol: turnSymbol,
  });

  const symbol = turnSymbol === 'X' ? 'O' : 'X';
  return ({
    history: [...history, {
      cellIndex, position: newPosition, turnCount, turnSymbol: symbol,
    }],
    isFinished: finishedIndexes ? turnSymbol : null,
    finishedIndexes,
    maxTurnCount: turnCount,
    position: newPosition,
    turnCount,
    turnSymbol: symbol,
  });
};

export default getGameStateByTurn;
