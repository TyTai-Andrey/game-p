// react
import React, { FC } from 'react';

// styles
import styles from '@compositions/Dashboard/Dashboard.module.scss';

// components
import Cell from '@compositions/Dashboard/Cell';

// store
import useStore from '@store/index';

export type Props = {};

const Dashboard: FC<Props> = () => {
  const dashboardSize = useStore(state => state.dashboardSize);
  const position = useStore(state => state.position);
  const finishedIndexes = useStore(state => state.finishedIndexes);

  return (
    <div
      className={styles.root}
      style={{
        gridTemplateColumns: `repeat(${dashboardSize}, 1fr)`,
        gridTemplateRows: `repeat(${dashboardSize}, 1fr)`,
      }}
    >
      {position
        .split('')
        .map((symbol, cellIndex) => (
          <Cell
            cellIndex={cellIndex}
            highlighted={Boolean(finishedIndexes?.includes(cellIndex))}
            // eslint-disable-next-line react/no-array-index-key
            key={`${symbol}_${cellIndex}`}
            symbol={symbol as 'X' | 'O' | '_'}
          />
        ))}
    </div>
  );
};

export default Dashboard;
