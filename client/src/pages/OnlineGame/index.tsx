// react
import { FC, useLayoutEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// styles
import styles from '@pages/Game/Game.module.scss';

// components
import AuthenticationModal from '@components/modals/AuthenticationModal';
import ErrorInfo from '@pages/OnlineGame/ErrorInfo';
import Loader from '@components/Loader';

// compositions
import Aside from '@compositions/Aside';
import Dashboard from '@compositions/Dashboard';

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

  useLayoutEffect(() => {
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
    if (error) return <ErrorInfo />;
    if (!connected) return <Loader className={styles.loader} />;
    return (
      <>
        <Dashboard />
        <Aside />
      </>
    );
  }, [connected, error]);

  return (
    <div className={styles.root}>
      {content}
    </div>
  );
};

export default OnlineGame;
