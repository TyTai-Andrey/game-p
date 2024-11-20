// react
import { FC } from 'react';

// styles
import styles from '@pages/Game/Game.module.scss';

// components
import Aside from '@pages/Game/Aside';
import Dashboard from '@pages/Game/Dashboard';

export type Props = {};

const Game: FC<Props> = () => (
  <div className={styles.root}>
    <Dashboard />
    <Aside />
  </div>
);

export default Game;
