// react
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

// pages
import Game from '@pages/Game';
import Register from '@pages/Register';
import Settings from '@pages/Settings';

// components
import Layout from '@components/Layout';

// constants
import pathnames from '@constants/pathnames';

// store
import useStore from '@store/index';

// utils
import authorization from '@utils/authorization';

function App() {
  const isAuthenticated = useStore(state => state.isAuthenticated);
  const setAuthData = useStore(state => state.setAuthData);

  useEffect(() => {
    if (!isAuthenticated) {
      authorization.getRefreshedToken().then((response) => {
        if (authorization.getToken()) {
          setAuthData(response, false);
        }
      });
    }
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<Game />} path={pathnames.main} />
        <Route element={<Settings />} path={pathnames.settings} />
        <Route element={<Register />} path={pathnames.register} />
        <Route element={<Navigate replace to={pathnames.settings} />} path="*" />
      </Route>
    </Routes>
  );
}

export default App;
