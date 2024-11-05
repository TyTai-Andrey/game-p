// react
import { Outlet } from 'react-router-dom';

// styles
import styles from '@components/Layout/Layout.module.scss';

// components
import Header from '@components/Header';

const Layout = () => (
  <main className={styles.root}>
    <Header />
    <section className={styles.section}>
      <Outlet />
    </section>
  </main>
);

export default Layout;
