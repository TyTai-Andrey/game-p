// react
import { FC } from 'react';

// styles
import styles from '@pages/Game/Aside/Aside.module.scss';

// components
import Buttons from '@pages/Game/Aside/Buttons';
import History from '@pages/Game/Aside/History';
import Info from '@pages/Game/Aside/Info';

export type Props = {};

const Aside: FC<Props> = () => (
  <aside className={styles.root}>
    <Info />
    <History />
    <Buttons />
  </aside>
);

export default Aside;
