// styles
import styles from '@pages/Game/Aside/History/History.module.scss';

// store
import useStore from '@store/index';

// components
import HistoryItem from '@pages/Game/Aside/HistoryItem';

const History = () => {
  const history = useStore(state => state.history);
  return (
    <div className={styles.root}>
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
