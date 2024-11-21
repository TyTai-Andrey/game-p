/* eslint-disable sort-imports */
// react
import { FC } from 'react';

// styles
import styles from '@pages/Game/Aside/Info/Info.module.scss';

// store
import useStore from '@store/index';

// components
import Row from '@components/Row';
import FirstInfoBlock from '@pages/Game/Aside/Info/FirstInfoBlock';
import SecondInfoBlock from '@pages/Game/Aside/Info/SecondInfoBlock';
import ThirdInfoBlock from '@pages/Game/Aside/Info/ThirdInfoBlock';
import FourthInfoBlock from '@pages/Game/Aside/Info/FourthInfoBlock';
import FifthInfoBlock from '@pages/Game/Aside/Info/FifthInfoBlock';
import SixthInfoBlock from '@pages/Game/Aside/Info/SixthInfoBlock';

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
        <FirstInfoBlock />
        <SecondInfoBlock />
      </Row>
      <Row className={styles.settingsWrapper}>
        <Row className={styles.turn} vertical>
          <ThirdInfoBlock />
          <FourthInfoBlock />
        </Row>
        <Row className={styles.shortSettings} vertical>
          <FifthInfoBlock />
          <SixthInfoBlock />
        </Row>
      </Row>
    </Row>
  );
};

export default Info;
