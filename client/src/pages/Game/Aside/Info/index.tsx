// vendor imports
import { useShallow } from 'zustand/react/shallow';

// react
import React, { FC } from 'react';

// styles
import styles from '@pages/Game/Aside/Info/Info.module.scss';

// store
import useStore from '@store/index';

// components
import Symbol from '@components/Symbol';

type Props = {

};

const Info: FC<Props> = () => {
  const {
    isFinished,
    turnSymbol,
    itemsForWin,
    unfairPlay,
    firstTurnSymbol,
  } = useStore(useShallow(
    ({
      isFinished,
      turnSymbol,
      itemsForWin,
      unfairPlay,
      firstTurnSymbol,
    }) => ({
      isFinished,
      turnSymbol,
      itemsForWin,
      unfairPlay,
      firstTurnSymbol,
    }),
  ));

  return (
    <div className={styles.root}>
      <div className={styles.turn}>
        <div className={styles.infoBlock}>
          {!isFinished ? (
            <>
              Текущий ход:<Symbol symbol={turnSymbol} />
            </>
          ) :
            <>Игра окончена! Победа <Symbol symbol={isFinished} /></>}
        </div>
        <div className={styles.infoBlock}>Вы играете за: <Symbol symbol={firstTurnSymbol} /></div>
      </div>
      <div className={styles.shortSettings}>
        <div className={styles.infoBlock}>Нечестная игра: {unfairPlay ? 'Да' : 'Нет'}</div>
        <div className={styles.infoBlock}>Символов в ряд: {itemsForWin}</div>
      </div>
    </div>
  );
};

export default Info;
