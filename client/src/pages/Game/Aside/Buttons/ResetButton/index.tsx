// react
import { memo } from 'react';

// components
import Button from '@components/Button';

// store
import useStore from '@store/index';

const ResetButton = memo(() => {
  const hasHistory = useStore(state => state.maxTurnCount >= 0);
  const reset = useStore(state => state.reset);

  return <Button disabled={!hasHistory} onClick={() => reset()}>Заново</Button>;
});

export default ResetButton;
