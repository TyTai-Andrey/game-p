import React, { FC } from 'react';
import styles from './Main.module.scss'

export type Props = {

}

const Main: FC<Props> = (props) => {
  return <div className={styles.root} {...props}>
    Main component is mounted!
  </div>;
};

export default Main