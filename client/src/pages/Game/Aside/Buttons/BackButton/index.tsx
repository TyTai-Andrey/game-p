// react
import { memo } from 'react';

// components
import Button from '@components/Button';

// store
import useStore from '@store/index';

const BackButton = memo(() => {
  const isFirstTurn = useStore(state => state.turnCount < 0);
  const prevTurn = useStore(state => state.prevTurn);

  return <Button disabled={isFirstTurn} onClick={prevTurn}>Назад</Button>;
});

export default BackButton;
