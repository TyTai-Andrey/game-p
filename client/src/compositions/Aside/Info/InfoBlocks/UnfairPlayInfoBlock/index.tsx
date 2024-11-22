// react
import { memo } from 'react';

// styles
import styles from '@compositions/Aside/Info/Info.module.scss';

// store
import useStore from '@store/index';

const UnfairPlayInfoBlock = memo(() => {
  const unfairPlay = useStore(state => state.unfairPlay);
  return <div className={styles.infoBlock}>Нечестная игра: {unfairPlay ? 'Да' : 'Нет'}</div>;
});

export default UnfairPlayInfoBlock;
