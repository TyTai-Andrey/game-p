// vendor imports
import { useShallow } from 'zustand/react/shallow';

// react
import React, { FC } from 'react';

// styles
import styles from '@pages/Game/Dashboard/Dashboard.module.scss';

// components
import Cell from '@pages/Game/Dashboard/Cell';

// store
import useStore from '@store/index';

export type Props = {

};

const Dashboard: FC<Props> = () => {
  const { dashboardSize, position } = useStore(useShallow(
    ({ dashboardSize, position }) => ({ dashboardSize, position }),
  ));

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
            // eslint-disable-next-line react/no-array-index-key
            key={`${symbol}_${cellIndex}`}
            symbol={symbol as 'X' | 'O' | '_'}
          />
        ))}
    </div>
  );
};

export default Dashboard;
