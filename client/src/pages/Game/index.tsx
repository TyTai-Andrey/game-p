// react
import React, { FC, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

// styles
import styles from '@pages/Game/Game.module.scss';

// components
import Aside from '@pages/Game/Aside';
import Dashboard from '@pages/Game/Dashboard';
import Loader from '@components/Loader';
import useSocket from '@hooks/useSocket';
import useStore from '@store/index';

export type Props = {};

const Game: FC<Props> = () => {
  const isAuthenticated = useStore(state => state.isAuthenticated);
  const { openSocket, connected } = useSocket();
  const location = useLocation();

  const gameId = useMemo(() => {
    const query = new URLSearchParams(location.search);
    return query.get('gameId');
  }, [location.search]);

  useEffect(() => {
    if (gameId) openSocket(gameId);
  }, [gameId, isAuthenticated]);

  const content = useMemo(() => (
    <>
      <Dashboard />
      <Aside />
    </>
  ), []);

  return (
    <div className={styles.root}>
      {(connected || !gameId) ? content : <Loader className={styles.loader} />}
    </div>
  );
};

export default Game;
