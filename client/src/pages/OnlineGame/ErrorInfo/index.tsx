import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import Button from '@components/Button';

// styles
import styles from '@pages/Game/Game.module.scss';

// constants
import pathnames from '@constants/pathnames';

type ErrorInfoProps = {
};

const ErrorInfo: FC<ErrorInfoProps> = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.error}>
      <p>Данная игра недоступна или была удалена</p>
      <Button onClick={() => navigate(pathnames.settings)}>Перейти к настройкам</Button>
    </div>
  );
};

export default ErrorInfo;
