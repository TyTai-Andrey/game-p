// styles
import styles from '@pages/Game/Aside/History/History.module.scss';

// store
import useStore from '@store/index';

// components
import HistoryItem from '@pages/Game/Aside/HistoryItem';
import classNames from 'classnames';

const History = () => {
  const history = useStore(state => state.history);
  const isOnline = useStore(state => state.isOnline);
  return (
    <div className={classNames(styles.root, { [styles.isOnline]: isOnline })}>
      <h1>История ходов</h1>
      <div className={styles.historyTurns}>
        {
          history.map((item, index) => (
            <HistoryItem
              index={index}
              item={item}
              key={`${item.position}`}
            />
          ))
        }
      </div>
    </div>
  );
};

export default History;
