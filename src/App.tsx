// react
import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';

// pages
import Game from '@pages/Game';
import Settings from '@pages/Settings';

// components
import Layout from '@components/Layout';

// constants
import pathnames from '@constants/pathnames';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<Game />} path={pathnames.main} />
        <Route element={<Settings />} path={pathnames.settings} />
        <Route element={<Navigate replace to={pathnames.settings} />} path="*" />
      </Route>
    </Routes>
  );
}

export default App;
