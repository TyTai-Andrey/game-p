// react
import { FC, useEffect, useLayoutEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// styles
import styles from '@pages/Game/Game.module.scss';

// components
import Aside from '@pages/Game/Aside';
import AuthenticationModal from '@components/modals/AuthenticationModal';
import Button from '@components/Button';
import Dashboard from '@pages/Game/Dashboard';
import Loader from '@components/Loader';

// constants
import pathnames from '@constants/pathnames';

// hooks
import useModal from '@hooks/useModal';
import useSocket from '@hooks/useSocket';

// store
import useStore from '@store/index';

// utils
import authorization from '@utils/authorization';

export type Props = {};

const OnlineGame: FC<Props> = () => {
  const isAuthenticated = useStore(state => state.isAuthenticated);

  const setState = useStore(state => state.setState);

  const { openSocket, closeSocket, connected, error } = useSocket();
  const { openModal } = useModal();

  const { id: gameId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (gameId) {
      openSocket(gameId);
      setState({ lastOnlineGame: gameId });
    }

    return () => {
      closeSocket();
    };
  }, [gameId, isAuthenticated, closeSocket]);

  useLayoutEffect(() => {
    if (!isAuthenticated && !authorization.getToken() && gameId) {
      openModal(AuthenticationModal, {
        onClose: () => { navigate(pathnames.main); },
      });
    }
  }, [isAuthenticated, gameId]);

  const content = useMemo(() => {
    if (!gameId || connected) {
      return (
        <>
          <Dashboard />
          <Aside />
        </>
      );
    }

    if (error) {
      return (
        <div className={styles.error}>
          <p>Данная игра недоступна или была удалена</p>
          <Button onClick={() => navigate(pathnames.settings)}>Перейти к настройкам</Button>
        </div>
      );
    }

    return <Loader className={styles.loader} />;
  }, [connected, error, gameId]);

  return (
    <div className={styles.root}>
      {content}
    </div>
  );
};

export default OnlineGame;
