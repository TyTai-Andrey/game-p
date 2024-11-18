// react
import { FC, memo, useMemo } from 'react';

// store
import { IHistoryItem } from '@store/types/game';

// components
import Symbol from '@components/Symbol';

// styles
import styles from '@pages/Game/Aside/Aside.module.scss';
import useStore from '@store/index';

type Props = {
  index: number
  item: IHistoryItem
};

const HistoryItem: FC<Props> = memo(({ item, index }) => {
  const firstTurnSymbol = useStore(state => state.firstTurnSymbol);
  const secondTurnSymbol = useMemo(() => (firstTurnSymbol === 'X' ? 'O' : 'X'), [firstTurnSymbol]);

  return (
    <div
      className={styles.historyTurn}
      key={`${item.position}`}
    >
      {index + 1}.
      <Symbol symbol={item.turnCount % 2 ? secondTurnSymbol : firstTurnSymbol} />
      <span>
        {item.cellIndex + 1}
      </span>
    </div>
  );
});

export default HistoryItem;
