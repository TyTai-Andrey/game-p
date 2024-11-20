// vendor imports
import classNames from 'classnames';

// react
import { Link, useLocation } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

// styles
import styles from '@components/Header/Header.module.scss';

// constants
import pathnames from '@constants/pathnames';

// components
import AuthenticationModal from '@components/modals/AuthenticationModal';
import Button from '@components/Button';

// hooks
import useModal from '@hooks/useModal';

// store
import useStore from '@store/index';

// api
import AuthApi from '@api/AuthApi';

const items = [
  {
    path: pathnames.main,
    text: 'Игра',
  },
  {
    path: pathnames.onlineGame,
    text: 'Онлайн игра',
  },
  {
    path: pathnames.settings,
    text: 'Настройки',
  },
];

const Header = () => {
  const isAuthenticated = useStore(state => state.isAuthenticated);
  const lastOnlineGame = useStore(state => state.lastOnlineGame);
  const logout = useStore(state => state.logout);
  const { openModal } = useModal();
  const location = useLocation();

  const onLoginAccount = useCallback(() => {
    openModal(AuthenticationModal);
  }, [openModal]);

  const onLogoutAccount = useCallback(() => {
    AuthApi.logout(logout);
  }, [logout]);

  const authButton = useMemo(() => {
    if (isAuthenticated) return <Button onClick={onLogoutAccount}>Выход</Button>;
    if (location.pathname === pathnames.register) return null;
    return <Button onClick={onLoginAccount}>Вход</Button>;
  }, [isAuthenticated, location.pathname, onLoginAccount, onLogoutAccount]);

  return (
    <header className={styles.root}>
      <ul className={styles.list}>
        {
          items.map((item) => {
            const isActive = item.path === pathnames.main ?
              item.path === location.pathname :
              new RegExp(item.path).test(location.pathname);

            const path = item.path === pathnames.onlineGame ?
              `${pathnames.onlineGame}${lastOnlineGame}` :
              item.path;

            if (item.path === pathnames.onlineGame && !lastOnlineGame) return null;

            return (
              <li className={styles.item} key={item.text}>
                <Link
                  className={classNames(styles.link, {
                    [styles.active]: isActive,
                  })}
                  to={path}
                >
                  {item.text}
                </Link>
              </li>
            );
          })
        }
      </ul>
      {authButton}
    </header>
  );
};

export default Header;
