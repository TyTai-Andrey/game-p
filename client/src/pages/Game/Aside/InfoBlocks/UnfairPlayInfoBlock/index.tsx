// react
import { memo } from 'react';

// styles
import styles from '@pages/Game/Aside/Info/Info.module.scss';

// store
import useStore from '@store/index';

const UnfairPlayInfoBlock = memo(() => {
  const unfairPlay = useStore(state => state.unfairPlay);
  return <div className={styles.infoBlock}>Нечестная игра: {unfairPlay ? 'Да' : 'Нет'}</div>;
});

export default UnfairPlayInfoBlock;
