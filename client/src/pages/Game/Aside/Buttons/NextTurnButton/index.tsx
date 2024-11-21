// react
import { memo, useMemo } from 'react';

// components
import Button from '@components/Button';

// store
import useStore from '@store/index';

const NextTurnButton = memo(() => {
  const turnCount = useStore(state => state.turnCount);
  const maxTurnCount = useStore(state => state.maxTurnCount);
  const nextTurn = useStore(state => state.nextTurn);

  const isLastTurn = useMemo(() => turnCount === maxTurnCount, [turnCount, maxTurnCount]);

  return <Button disabled={isLastTurn} onClick={nextTurn}>Вперёд</Button>;
});

export default NextTurnButton;
