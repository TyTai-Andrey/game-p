// react
import { memo, useMemo } from 'react';

// styles
import styles from '@pages/Game/Aside/Aside.module.scss';

// components
import Button from '@components/Button';

// store
import useStore from '@store/index';

const BackButton = memo(() => {
  const isFirstTurn = useStore(state => state.turnCount < 0);
  const prevTurn = useStore(state => state.prevTurn);

  return <Button disabled={isFirstTurn} onClick={prevTurn}>Назад</Button>;
});

const ResetButton = memo(() => {
  const hasHistory = useStore(state => state.maxTurnCount >= 0);
  const reset = useStore(state => state.reset);

  return <Button disabled={!hasHistory} onClick={() => reset()}>Заново</Button>;
});

const NextTurnButton = memo(() => {
  const turnCount = useStore(state => state.turnCount);
  const maxTurnCount = useStore(state => state.maxTurnCount);
  const nextTurn = useStore(state => state.nextTurn);

  const isLastTurn = useMemo(() => turnCount === maxTurnCount, [turnCount, maxTurnCount]);

  return <Button disabled={isLastTurn} onClick={nextTurn}>Вперёд</Button>;
});

const Buttons = () => (
  <div className={styles.buttons}>
    <BackButton />
    <ResetButton />
    <NextTurnButton />
  </div>
);

export default Buttons;
