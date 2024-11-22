// react
import { FC } from 'react';

// styles
import styles from '@pages/Game/Game.module.scss';

// compositions
import Aside from '@compositions/Aside';
import Dashboard from '@compositions/Dashboard';

export type Props = {};

const Game: FC<Props> = () => (
  <div className={styles.root}>
    <Dashboard />
    <Aside />
  </div>
);

export default Game;
