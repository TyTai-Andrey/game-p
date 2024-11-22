// react
import { FC } from 'react';

// styles
import styles from '@compositions/Aside/Aside.module.scss';

// components
import Buttons from '@compositions/Aside/Buttons';
import History from '@compositions/Aside/History';
import Info from '@compositions/Aside/Info';

export type Props = {};

const Aside: FC<Props> = () => (
  <aside className={styles.root}>
    <Info />
    <History />
    <Buttons />
  </aside>
);

export default Aside;
