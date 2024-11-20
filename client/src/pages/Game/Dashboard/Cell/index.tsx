// vendor imports
import { useShallow } from 'zustand/react/shallow';

// react
import React, { FC, useCallback } from 'react';

// styles
import styles from '@pages/Game/Dashboard/Cell/Cell.module.scss';

// store
import useStore from '@store/index';

// components
import Symbol from '@components/Symbol';
import classNames from 'classnames';

export type Props = {
  symbol: 'X' | 'O' | '_';
  cellIndex: number;
  highlighted?: boolean;
};

const Cell: FC<Props> = ({ cellIndex, symbol, highlighted }) => {
  const setPosition = useStore(state => state.setPosition);

  const { firstTurnSymbol, isOnline } = useStore(useShallow(
    ({ firstTurnSymbol, isOnline }) => ({ firstTurnSymbol, isOnline }),
  ));

  const isFinished = useStore(state => state.isFinished);
  const unfairPlay = useStore(state => state.unfairPlay);

  const { maxTurnCount, turnCount, turnSymbol } = useStore(useShallow(
    ({ maxTurnCount, turnCount, turnSymbol }) => ({ maxTurnCount, turnCount, turnSymbol }),
  ));

  const onClick = useCallback(() => {
    if (isFinished) return;
    if (isOnline && firstTurnSymbol !== turnSymbol) return;
    if (maxTurnCount !== turnCount) return;
    if (symbol !== turnSymbol && (unfairPlay || symbol === '_')) {
      setPosition(cellIndex);
    }
  }, [
    isOnline,
    firstTurnSymbol,
    isFinished,
    turnSymbol,
    maxTurnCount,
    turnCount,
    symbol,
    unfairPlay,
    cellIndex,
  ]);

  return (
    <div
      className={classNames(styles.root, {
        [styles.highlighted]: maxTurnCount === turnCount && highlighted,
      })}
      onClick={onClick}
    >
      <Symbol symbol={symbol} />
      <div className={styles.cellIndex}>{cellIndex + 1}</div>
    </div>
  );
};

export default Cell;
