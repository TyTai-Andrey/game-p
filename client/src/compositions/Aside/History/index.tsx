// vendor imports
import classNames from 'classnames';

// styles
import styles from '@compositions/Aside/History/History.module.scss';

// store
import useStore from '@store/index';

// components
import HistoryItem from '@compositions/Aside/History/HistoryItem';

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
