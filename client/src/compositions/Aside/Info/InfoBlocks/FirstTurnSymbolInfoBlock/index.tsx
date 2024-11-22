// react
import { memo } from 'react';

// styles
import styles from '@compositions/Aside/Info/Info.module.scss';

// store
import useStore from '@store/index';

// components
import Symbol from '@components/Symbol';

const FirstTurnSymbolInfoBlock = memo(() => {
  const firstTurnSymbol = useStore(state => state.firstTurnSymbol);
  return <div className={styles.infoBlock}>Вы играете за: <Symbol symbol={firstTurnSymbol} /></div>;
});

export default FirstTurnSymbolInfoBlock;
