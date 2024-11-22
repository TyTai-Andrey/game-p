// react
import { memo } from 'react';

// styles
import styles from '@pages/Game/Aside/Info/Info.module.scss';

// store
import useStore from '@store/index';

const ItemsForWinInfoBlock = memo(() => {
  const itemsForWin = useStore(state => state.itemsForWin);
  return <div className={styles.infoBlock}>Символов в ряд: {itemsForWin}</div>;
});

export default ItemsForWinInfoBlock;
