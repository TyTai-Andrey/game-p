// vendor imports
import { ReactNotifications } from 'react-notifications-component';

// react
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';

// styles
import './index.scss';
import 'react-notifications-component/dist/theme.css';

// app
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <ReactNotifications />
    <App />
  </BrowserRouter>,
);
