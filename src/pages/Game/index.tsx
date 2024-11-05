// react
import React, { FC } from 'react';

// styles
import styles from '@pages/Game/Game.module.scss';

// components
import Dashboard from '@components/Dashboard';
import Helper from '@components/Helper';

export type Props = {};

const Game: FC<Props> = () => (
  <div className={styles.root}>
    <Dashboard />
    <Helper />
  </div>
);

export default Game;
