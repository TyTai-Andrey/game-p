// react
import { Outlet } from 'react-router-dom';

// styles
import styles from '@components/Layout/Layout.module.scss';

// components
import Header from '@components/Header';
import ModalProvider from '@components/ModalProvider';
import SocketProvider from '@components/SocketProvider';

const Layout = () => (
  <SocketProvider>
    <ModalProvider>
      <main className={styles.root}>
        <Header />
        <section className={styles.section}>
          <Outlet />
        </section>
      </main>
    </ModalProvider>
  </SocketProvider>
);

export default Layout;
