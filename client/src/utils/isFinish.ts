// utils
import slice from '@utils/array-operations';

const checkRowOnFinish = (diagonal: string[], countForWin: number, symbol: 'X' | 'O'): [number, number] | undefined => {
  const row = diagonal.join('');
  const winRow = new Array(countForWin).fill(symbol).join('');

  if (row.includes(winRow)) {
    const indexStart = row.indexOf(winRow);
    const allegedIndexEnd = indexStart + winRow.length;
    const indexEnd = slice(diagonal, allegedIndexEnd).reduce((num, item) => (item === symbol ? num + 1 : num), allegedIndexEnd);
    return [indexStart, indexEnd];
  }
};

type CheckDiagonalByDirection = {
  rowsCount: number;
  symbolsArray: string[]
  prevDiagonalIndex?: number
  direction: '↖' | '↗' | '↘' | '↙'
  getDiagonalLength: (props: CheckDiagonalByDirection & { startDiagonalIndex: number }) => number
  symbol: 'X' | 'O'
  itemsForWin: number
};

const checkDiagonalByDirection = (props: CheckDiagonalByDirection): number[] | null => {
  const {
    symbolsArray,
    direction,
    getDiagonalLength,
    prevDiagonalIndex,
    rowsCount,
    symbol,
    itemsForWin,
  } = props;
  const isStartTopRow = ['↘', '↙'].includes(direction);
  const isStartLeftCol = ['↘', '↗'].includes(direction);
  const startDiagonalIndex = prevDiagonalIndex ?? (isStartTopRow ? 0 : symbolsArray.length);
  const diagonalLength = getDiagonalLength({ ...props, startDiagonalIndex });

  const isFinishByDiagonalIndexes: number[] = [];
  let diagonalCurrentIndex = startDiagonalIndex + (isStartTopRow ? 0 : -1);

  const diagonal = symbolsArray[isStartTopRow ? 'reduce' : 'reduceRight']((acc: string[], symbol, index) => {
    if ((index === diagonalCurrentIndex) && (acc.length < diagonalLength)) {
      const topStep = (rowsCount + (isStartLeftCol ? 1 : -1));
      const bottomStep = -(rowsCount + (isStartLeftCol ? -1 : 1));
      diagonalCurrentIndex += (isStartTopRow ? topStep : bottomStep);
      acc.push(symbol);
      isFinishByDiagonalIndexes.push(index);
    }

    return acc;
  }, []);

  const isFinishedIndexes = checkRowOnFinish(diagonal, itemsForWin, symbol);

  if (isFinishedIndexes) return slice(isFinishByDiagonalIndexes, ...isFinishedIndexes);

  const newStartDiagonalIndex = startDiagonalIndex + (isStartTopRow ? 1 : -1);
  const findOtherDiagonal = isStartTopRow ?
    (newStartDiagonalIndex < rowsCount) :
    (newStartDiagonalIndex > (symbolsArray.length - rowsCount));

  if (findOtherDiagonal) {
    return checkDiagonalByDirection({
      ...props,
      prevDiagonalIndex: newStartDiagonalIndex,
      symbol,
      itemsForWin,
    });
  }

  return null;
};

type CheckAllDiagonalsProps = {
  symbolsArray: string[]
  rowsCount: number
  symbol: 'X' | 'O'
  itemsForWin: number
};

const checkAllDiagonals = ({
  symbolsArray,
  rowsCount,
  symbol,
  itemsForWin,
}: CheckAllDiagonalsProps) => {
  const diagonalProps = {
    symbolsArray,
    rowsCount,
    itemsForWin,
    symbol,
  };

  const isFinishByTopLeftRightDiagonal = checkDiagonalByDirection({
    ...diagonalProps,
    direction: '↘',
    getDiagonalLength: ({ startDiagonalIndex, rowsCount }) => rowsCount - startDiagonalIndex,
  });

  if (isFinishByTopLeftRightDiagonal) return isFinishByTopLeftRightDiagonal;

  const isFinishByTopRightLeftDiagonal = checkDiagonalByDirection({
    ...diagonalProps,
    direction: '↙',
    getDiagonalLength: ({ startDiagonalIndex }) => startDiagonalIndex + 1,
  });
  if (isFinishByTopRightLeftDiagonal) return isFinishByTopRightLeftDiagonal;

  const isFinishByBottomRightLeftDiagonal = checkDiagonalByDirection({
    ...diagonalProps,
    direction: '↖',
    getDiagonalLength: ({ startDiagonalIndex, rowsCount }) => (startDiagonalIndex % rowsCount) || rowsCount,
  });

  if (isFinishByBottomRightLeftDiagonal) return isFinishByBottomRightLeftDiagonal;

  const isFinishByBottomLeftRightDiagonal = checkDiagonalByDirection({
    ...diagonalProps,
    direction: '↗',
    getDiagonalLength: ({ symbolsArray, startDiagonalIndex }) => symbolsArray.length - (startDiagonalIndex - 1),
  });

  if (isFinishByBottomLeftRightDiagonal) return isFinishByBottomLeftRightDiagonal;
};

type IsFinishProps = {
  position: string;
  itemsForWin: number;
  symbol: 'X' | 'O';
};

const isFinish = ({
  position,
  itemsForWin,
  symbol,
}: IsFinishProps): number[] | null => {
  const { length } = position;
  const rowsCount = Math.sqrt(length);
  const colsCount = Math.sqrt(length);
  const symbolsArray = position.split('');

  // check rows
  for (let i = 0; i < rowsCount; i++) {
    const row = symbolsArray.slice(i * rowsCount, i * rowsCount + rowsCount);

    const isFinish = checkRowOnFinish(row, itemsForWin, symbol);
    if (isFinish) {
      const isFinishByDiagonalIndexes = symbolsArray.map(
        (_, index) => ((index >= i * rowsCount) && (index < (i * rowsCount + rowsCount)) ? index : null),
      ).filter(i => i !== null);

      return slice(isFinishByDiagonalIndexes, ...isFinish);
    }
  }

  // check columns
  for (let i = 0; i < colsCount; i++) {
    const col = symbolsArray.filter((_, index) => index % colsCount === i);

    const isFinish = checkRowOnFinish(col, itemsForWin, symbol);
    if (isFinish) {
      const isFinishByDiagonalIndexes = symbolsArray.map(
        (_, index) => ((index % colsCount === i) ? index : null),
      ).filter(i => i !== null);

      return slice(isFinishByDiagonalIndexes, ...isFinish);
    }
  }

  // check diagonals
  const isFinishByDiagonal = checkAllDiagonals({
    symbolsArray,
    rowsCount,
    symbol,
    itemsForWin,
  });

  if (isFinishByDiagonal) return isFinishByDiagonal;

  return null;
};

export default isFinish;
