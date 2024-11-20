// vendor imports
import classNames from 'classnames';

// react
import React, { FC, memo, useCallback } from 'react';

// styles
import styles from '@pages/Game/Aside/Info/Info.module.scss';

// store
import useStore from '@store/index';

// components
import Button from '@components/Button';
import Symbol from '@components/Symbol';
import copyTextToClipboard from '@utils/copyTextToClipboard';
import { useLocation } from 'react-router-dom';

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

const OnlineInfoBlock = memo(() => {
  const location = useLocation();
  console.log(location);

  const isOnline = useStore(state => state.isOnline);
  const clientsOnline = useStore(state => state.clientsOnline);

  const onClick = useCallback(() => {
    copyTextToClipboard(`${process.env.REACT_APP_CLIENT_BASE_URL}${location.pathname}`);
  }, []);

  return isOnline ? (
    <div className={styles.onlineInfo}>
      <div className={classNames(styles.infoBlock, styles.clientsOnline)}>
        Игроков в сети: {clientsOnline}
      </div>
      <Button
        className={classNames(styles.infoBlock, styles.copyLink)}
        onClick={onClick}
      >
        Скопировать ссылку
      </Button>
    </div>
  ) : null;
});

const Info: FC<Props> = () => (
  <div className={styles.root}>
    <OnlineInfoBlock />
    <div className={styles.settingsWrapper}>
      <div className={styles.turn}>
        <FirstInfoBlock />
        <SecondInfoBlock />
      </div>
      <div className={styles.shortSettings}>
        <ThirdInfoBlock />
        <FourthInfoBlock />
      </div>
    </div>
  </div>
);

export default Info;
