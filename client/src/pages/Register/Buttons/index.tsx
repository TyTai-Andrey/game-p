// react
import { FC } from 'react';

// components
import Button from '@components/Button';

// styles
import styles from '@pages/Register/Register.module.scss';

type Props = {};

const Buttons: FC<Props> = () => (
  <div className={styles.buttons}>
    <Button type="submit">Зарегистрироваться</Button>
  </div>
);

export default Buttons;
