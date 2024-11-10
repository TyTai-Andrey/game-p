// react
import { Outlet } from 'react-router-dom';

// styles
import styles from '@components/Layout/Layout.module.scss';

// components
import Header from '@components/Header';
import ModalProvider from '@components/ModalProvider';

const Layout = () => (
  <ModalProvider>
    <main className={styles.root}>
      <Header />
      <section className={styles.section}>
        <Outlet />
      </section>
    </main>
  </ModalProvider>
);

export default Layout;
