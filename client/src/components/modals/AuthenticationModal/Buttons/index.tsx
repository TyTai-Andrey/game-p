// react
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import Button from '@components/Button';

// styles
import styles from '@components/modals/AuthenticationModal/AuthenticationModal.module.scss';

// constants
import pathnames from '@constants/pathnames';

type Props = {
  handleClose: () => void;
};

const Buttons: FC<Props> = ({ handleClose }) => {
  const navigate = useNavigate();
  const onRegister = useCallback(() => {
    handleClose();
    navigate(pathnames.register);
  }, []);

  return (
    <div className={styles.buttons}>
      <Button onClick={onRegister} variant="text">Нет аккаунта ?</Button>
      <Button type="submit">Войти</Button>
    </div>
  );
};

export default Buttons;
