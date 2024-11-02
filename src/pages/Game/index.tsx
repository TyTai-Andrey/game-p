import React, { FC } from 'react';
import styles from './Game.module.scss'

export type Props = {

}

const Game: FC<Props> = (props) => {
  return <div className={styles.root} {...props}>
    Game component is mounted!
  </div>;
};

export default Game;