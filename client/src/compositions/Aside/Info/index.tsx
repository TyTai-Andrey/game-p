// react
import { FC } from 'react';

// styles
import styles from '@compositions/Aside/Info/Info.module.scss';

// store
import useStore from '@store/index';

// components
import ClientsOnlineInfoBlock from '@compositions/Aside/Info/InfoBlocks/ClientsOnlineInfoBlock';
import CopyLinkInfoBlock from '@compositions/Aside/Info/InfoBlocks/CopyLinkInfoBlock';
import FirstTurnSymbolInfoBlock from '@compositions/Aside/Info/InfoBlocks/FirstTurnSymbolInfoBlock';
import ItemsForWinInfoBlock from '@compositions/Aside/Info/InfoBlocks/ItemsForWinInfoBlock';
import Row from '@components/Row';
import TurnSymbolInfoBlock from '@compositions/Aside/Info/InfoBlocks/TurnSymbolInfoBlock';
import UnfairPlayInfoBlock from '@compositions/Aside/Info/InfoBlocks/UnfairPlayInfoBlock';

type Props = {};

const Info: FC<Props> = () => {
  const isOnline = useStore(state => state.isOnline);

  return (
    <Row vertical>
      <Row
        className={styles.onlineInfo}
        hide={!isOnline}
        vertical
      >
        <ClientsOnlineInfoBlock />
        <CopyLinkInfoBlock />
      </Row>
      <Row className={styles.settingsWrapper}>
        <Row className={styles.turn} vertical>
          <TurnSymbolInfoBlock />
          <FirstTurnSymbolInfoBlock />
        </Row>
        <Row className={styles.shortSettings} vertical>
          <UnfairPlayInfoBlock />
          <ItemsForWinInfoBlock />
        </Row>
      </Row>
    </Row>
  );
};

export default Info;
