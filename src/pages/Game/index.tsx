// react
import React, { FC } from 'react';

// styles
import styles from '@pages/Game/Game.module.scss';

// components
import Aside from '@components/Aside';
import Dashboard from '@components/Dashboard';

export type Props = {};

const Game: FC<Props> = () => (
  <div className={styles.root}>
    <Dashboard />
    <Aside />
  </div>
);

export default Game;
