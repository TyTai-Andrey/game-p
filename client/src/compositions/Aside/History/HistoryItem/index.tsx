// react
import { FC, memo, useMemo } from 'react';

// store
import { IHistoryItem } from '@store/types/game';

// components
import Symbol from '@components/Symbol';

// styles
import styles from '@compositions/Aside/History/HistoryItem/HistoryItem.module.scss';

// store
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
      className={styles.root}
      key={`${item.position}`}
    >
      {index + 1}.
      <Symbol symbol={item.turnCount % 2 ? secondTurnSymbol : firstTurnSymbol} />
      <p>
        {item.cellIndex + 1}
      </p>
    </div>
  );
});

export default HistoryItem;
