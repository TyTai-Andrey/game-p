// vendor imports
import { useShallow } from 'zustand/react/shallow';

// react
import React, { FC } from 'react';

// styles
import styles from '@pages/Game/Aside/Aside.module.scss';

// store
import useStore from '@store/index';

// components
import Button from '@components/Button';
import Symbol from '@components/Symbol';

export type Props = {};

const Aside: FC<Props> = () => {
  const isFinished = useStore(state => state.isFinished);
  const history = useStore(state => state.history);

  const { maxTurnCount, turnCount, turnSymbol } = useStore(useShallow(
    ({ maxTurnCount, turnCount, turnSymbol }) => ({ maxTurnCount, turnCount, turnSymbol }),
  ));

  const { nextTurn, prevTurn, reset } = useStore(useShallow(
    ({ nextTurn, prevTurn, reset }) => ({ nextTurn, prevTurn, reset }),
  ));

  return (
    <aside className={styles.root}>
      <div className={styles.turn}>
        {!isFinished ? (
          <>
            Текущий ход:<Symbol symbol={turnSymbol} />
          </>
        ) :
          <h1>Игра окончена! Победа <Symbol symbol={isFinished} /></h1>}
      </div>

      <div className={styles.history}>
        <h1>История ходов</h1>
        <div className={styles.historyTurns}>
          {
            history.map((item, index) => (
              <div
                className={styles.historyTurn}
                key={`${item.turnCount}_${item.cellIndex}`}
              >
                {index + 1}.
                <Symbol symbol={item.turnCount % 2 ? 'O' : 'X'} />
                <span>
                  {item.cellIndex + 1}
                </span>
              </div>
            ))
          }
        </div>
      </div>

      <div className={styles.buttons}>
        <Button disabled={turnCount < 0} onClick={prevTurn}>Назад</Button>
        <Button disabled={history.length === 0} onClick={() => reset()}>Заново</Button>
        <Button disabled={turnCount === maxTurnCount} onClick={nextTurn}>Вперёд</Button>
      </div>
    </aside>
  );
};

export default Aside;
