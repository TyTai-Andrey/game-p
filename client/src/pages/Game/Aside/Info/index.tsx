// react
import React, { FC, memo } from 'react';

// styles
import styles from '@pages/Game/Aside/Info/Info.module.scss';

// store
import useStore from '@store/index';

// components
import Symbol from '@components/Symbol';

type Props = {

};

const FirstInfoBlock = memo(() => {
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

const SecondInfoBlock = memo(() => {
  const firstTurnSymbol = useStore(state => state.firstTurnSymbol);
  return <div className={styles.infoBlock}>Вы играете за: <Symbol symbol={firstTurnSymbol} /></div>;
});

const ThirdInfoBlock = memo(() => {
  const unfairPlay = useStore(state => state.unfairPlay);
  return <div className={styles.infoBlock}>Нечестная игра: {unfairPlay ? 'Да' : 'Нет'}</div>;
});

const FourthInfoBlock = memo(() => {
  const itemsForWin = useStore(state => state.itemsForWin);
  return <div className={styles.infoBlock}>Символов в ряд: {itemsForWin}</div>;
});

const Info: FC<Props> = () => {
  return (
    <div className={styles.root}>
      <div className={styles.turn}>
        <FirstInfoBlock />
        <SecondInfoBlock />
      </div>
      <div className={styles.shortSettings}>
        <ThirdInfoBlock />
        <FourthInfoBlock />
      </div>
    </div>
  );
};

export default Info;
