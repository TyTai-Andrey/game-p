// vendor imports
import classNames from 'classnames';

// react
import { memo } from 'react';

// styles
import styles from '@compositions/Aside/Info/Info.module.scss';

// store
import useStore from '@store/index';

const ClientsOnlineInfoBlock = memo(() => {
  const clientsOnline = useStore(state => state.clientsOnline);

  return (
    <div className={classNames(styles.infoBlock, styles.clientsOnline)}>
      Игроков в сети: {clientsOnline}
    </div>
  );
});

export default ClientsOnlineInfoBlock;
