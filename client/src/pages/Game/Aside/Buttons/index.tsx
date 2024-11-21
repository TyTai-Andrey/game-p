// styles
import styles from '@pages/Game/Aside/Buttons/Buttons.module.scss';

// components
import BackButton from '@pages/Game/Aside/Buttons/BackButton';
import NextTurnButton from '@pages/Game/Aside/Buttons/NextTurnButton';
import ResetButton from '@pages/Game/Aside/Buttons/ResetButton';

const Buttons = () => (
  <div className={styles.root}>
    <BackButton />
    <ResetButton />
    <NextTurnButton />
  </div>
);

export default Buttons;
