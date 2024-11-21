// vendor imports
import classNames from 'classnames';

// react
import { memo } from 'react';

// styles
import styles from '@pages/Game/Aside/Info/Info.module.scss';

// store
import useStore from '@store/index';

const FirstInfoBlock = memo(() => {
  const clientsOnline = useStore(state => state.clientsOnline);

  return (
    <div className={classNames(styles.infoBlock, styles.clientsOnline)}>
      Игроков в сети: {clientsOnline}
    </div>
  );
});

export default FirstInfoBlock;
