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
  const turnSymbol = useStore(state => state.turnSymbol);
  const unfairPlay = useStore(state => state.unfairPlay);
  const isFinished = useStore(state => state.isFinished);
  const maxTurnCount = useStore(state => state.maxTurnCount);
  const turnCount = useStore(state => state.turnCount);

  const setPosition = useStore(state => state.setPosition);

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
