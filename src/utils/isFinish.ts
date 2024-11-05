const checkDiagonalOnFinish = (diagonal: string[], count: number) => {
  if (diagonal.length === count) {
    if (diagonal.every(symbol => symbol === diagonal[0] && symbol !== '_')) {
      return diagonal[0];
    }
  }
};

type CheckDiagonal = {
  rowsCount: number;
  array: string[]
  initDiagonalCurrentIndex: number
  direction: 'leftRight' | 'rightLeft'
  row?: 'top' | 'bottom'
  getDiagonalLength: (props: CheckDiagonal) => number
};

const checkDiagonal = (props: CheckDiagonal): string | null => {
  const {
    array,
    direction,
    getDiagonalLength,
    initDiagonalCurrentIndex = 0,
    row,
    rowsCount,
  } = props;
  const isTopRow = row === 'top';
  let diagonalCurrentIndex = initDiagonalCurrentIndex + (isTopRow ? 0 : -1);
  const diagonalLength = getDiagonalLength(props);

  const diagonal = array[isTopRow ? 'reduce' : 'reduceRight']((acc: string[], symbol, index) => {
    if ((index === diagonalCurrentIndex) && (acc.length < diagonalLength)) {
      const topStep = (rowsCount + (direction === 'leftRight' ? 1 : -1));
      const bottomStep = -(rowsCount + (direction === 'leftRight' ? -1 : 1));
      diagonalCurrentIndex += (isTopRow ? topStep : bottomStep);
      acc.push(symbol);
    }

    return acc;
  }, []);

  const isFinish = checkDiagonalOnFinish(diagonal, rowsCount);
  if (isFinish) return isFinish;

  const newDiagonalCurrentIndex = initDiagonalCurrentIndex + (isTopRow ? 1 : -1);
  const findOtherDiagonal = isTopRow ?
    (newDiagonalCurrentIndex < rowsCount) :
    (newDiagonalCurrentIndex > (array.length - rowsCount));

  if (findOtherDiagonal) {
    return checkDiagonal({
      ...props,
      initDiagonalCurrentIndex: newDiagonalCurrentIndex,
    });
  }

  return null;
};

const isFinish = (position = '123456789'): string | null => {
  const { length } = position;
  const rowsCount = Math.sqrt(length);
  const colsCount = Math.sqrt(length);
  const array = position.split('');

  // check rows
  for (let i = 0; i < rowsCount; i++) {
    const row = array.slice(i * rowsCount, i * rowsCount + rowsCount);

    if (row.every(symbol => symbol === row[0] && symbol !== '_')) {
      return row[0];
    }
  }

  // check columns
  for (let i = 0; i < colsCount; i++) {
    const col = array.filter((_, index) => index % colsCount === i);

    if (col.every(symbol => symbol === col[0] && symbol !== '_')) {
      return col[0];
    }
  }

  // check diagonals
  const diagonalProps = { array, rowsCount };

  const isFinishTopLeftRightDiagonal = checkDiagonal({
    ...diagonalProps,
    direction: 'leftRight',
    getDiagonalLength: ({ initDiagonalCurrentIndex, rowsCount }) => rowsCount - initDiagonalCurrentIndex,
    initDiagonalCurrentIndex: 0,
    row: 'top',
  });

  if (isFinishTopLeftRightDiagonal) return isFinishTopLeftRightDiagonal;

  const isFinishTopRightLeftDiagonal = checkDiagonal({
    ...diagonalProps,
    direction: 'rightLeft',
    getDiagonalLength: ({ initDiagonalCurrentIndex }) => initDiagonalCurrentIndex + 1,
    initDiagonalCurrentIndex: 0,
    row: 'top',
  });
  if (isFinishTopRightLeftDiagonal) return isFinishTopRightLeftDiagonal;

  const isFinishBottomRightLeftDiagonal = checkDiagonal({
    ...diagonalProps,
    direction: 'rightLeft',
    getDiagonalLength: ({ initDiagonalCurrentIndex, rowsCount }) => (initDiagonalCurrentIndex % rowsCount) || rowsCount,
    initDiagonalCurrentIndex: array.length,
    row: 'bottom',
  });

  if (isFinishBottomRightLeftDiagonal) return isFinishBottomRightLeftDiagonal;

  const isFinishBottomLeftRightDiagonal = checkDiagonal({
    ...diagonalProps,
    direction: 'leftRight',
    getDiagonalLength: ({ array, initDiagonalCurrentIndex }) => array.length - (initDiagonalCurrentIndex - 1),
    initDiagonalCurrentIndex: array.length,
    row: 'bottom',
  });

  if (isFinishBottomLeftRightDiagonal) return isFinishBottomLeftRightDiagonal;

  return null;
};

export default isFinish;
