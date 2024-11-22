/* eslint-disable sort-imports */
// react
import { FC } from 'react';

// styles
import styles from '@pages/Game/Aside/Info/Info.module.scss';

// store
import useStore from '@store/index';

// components
import Row from '@components/Row';
import ClientsOnlineInfoBlock from '@pages/Game/Aside/InfoBlocks/ClientsOnlineInfoBlock';
import CopyLinkInfoBlock from '@pages/Game/Aside/InfoBlocks/CopyLinkInfoBlock';
import TurnSymbolInfoBlock from '@pages/Game/Aside/InfoBlocks/TurnSymbolInfoBlock';
import FirstTurnSymbolInfoBlock from '@pages/Game/Aside/InfoBlocks/FirstTurnSymbolInfoBlock';
import UnfairPlayInfoBlock from '@pages/Game/Aside/InfoBlocks/UnfairPlayInfoBlock';
import ItemsForWinInfoBlock from '@pages/Game/Aside/InfoBlocks/ItemsForWinInfoBlock';

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
