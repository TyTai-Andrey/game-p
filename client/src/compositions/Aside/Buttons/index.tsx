// styles
import styles from '@compositions/Aside/Buttons/Buttons.module.scss';

// components
import BackButton from '@compositions/Aside/Buttons/BackButton';
import NextTurnButton from '@compositions/Aside/Buttons/NextTurnButton';
import ResetButton from '@compositions/Aside/Buttons/ResetButton';

const Buttons = () => (
  <div className={styles.root}>
    <BackButton />
    <ResetButton />
    <NextTurnButton />
  </div>
);

export default Buttons;
