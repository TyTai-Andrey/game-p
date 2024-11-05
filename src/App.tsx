// react
import { Route, Routes } from 'react-router-dom';
import React from 'react';

// pages
import Game from '@pages/Game';
import Settings from '@pages/Settings';

// components
import Layout from '@components/Layout';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<Game />} path="/" />
        <Route element={<Settings />} path="/settings" />
      </Route>
    </Routes>
  );
}

export default App;
