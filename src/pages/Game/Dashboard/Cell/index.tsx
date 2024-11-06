// vendor imports
import { useShallow } from 'zustand/react/shallow';

// react
import React, { FC } from 'react';

// styles
import styles from '@pages/Game/Dashboard/Cell/Cell.module.scss';

// store
import useStore from '@store/index';

// components
import Symbol from '@components/Symbol';

export type Props = {
  symbol: 'X' | 'O' | '_';
  cellIndex: number;
};

const Cell: FC<Props> = ({ cellIndex, symbol }) => {
  const setPosition = useStore(state => state.setPosition);

  const isFinished = useStore(state => state.isFinished);
  const unfairPlay = useStore(state => state.unfairPlay);

  const { maxTurnCount, turnCount, turnSymbol } = useStore(useShallow(
    ({ maxTurnCount, turnCount, turnSymbol }) => ({ maxTurnCount, turnCount, turnSymbol }),
  ));

  const onClick = () => {
    if (isFinished) return;
    if (maxTurnCount !== turnCount) return;
    if (symbol !== turnSymbol && (unfairPlay || symbol === '_')) {
      setPosition(cellIndex);
    }
  };

  return (
    <div className={styles.root} onClick={onClick}>
      <Symbol symbol={symbol} />
      <div className={styles.cellIndex}>{cellIndex + 1}</div>
    </div>
  );
};

export default Cell;
