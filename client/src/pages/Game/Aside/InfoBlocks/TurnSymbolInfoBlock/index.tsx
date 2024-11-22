// react
import { memo } from 'react';

// styles
import styles from '@pages/Game/Aside/Info/Info.module.scss';

// store
import useStore from '@store/index';

// components
import Symbol from '@components/Symbol';

const TurnSymbolInfoBlock = memo(() => {
  const isFinished = useStore(state => state.isFinished);
  const turnSymbol = useStore(state => state.turnSymbol);

  return (
    <div className={styles.infoBlock}>
      {!isFinished ? (
        <>
          Текущий ход:<Symbol symbol={turnSymbol} />
        </>
      ) :
        <>Игра окончена! Победа <Symbol symbol={isFinished} /></>}
    </div>
  );
});

export default TurnSymbolInfoBlock;
