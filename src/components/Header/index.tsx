// vendor imports
import classNames from 'classnames';

// react
import { Link, useLocation } from 'react-router-dom';

// styles
import styles from '@components/Header/Header.module.scss';

const items = [
  {
    path: '/',
    text: 'Настройки',
  },
  {
    path: '/game',
    text: 'Игра',
  },
];

const Header = () => {
  const location = useLocation();

  return (
    <header className={styles.root}>
      <ul className={styles.list}>
        {
          items.map(item => (
            <li className={styles.item} key={item.text}>
              <Link
                className={classNames(styles.link, { [styles.active]: location.pathname === item.path })}
                to={item.path}
              >{item.text}
              </Link>
            </li>
          ))
        }
      </ul>
    </header>
  );
};

export default Header;
