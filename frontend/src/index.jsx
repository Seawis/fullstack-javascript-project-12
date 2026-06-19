import 'bootstrap/dist/css/bootstrap.min.css'

import { StrictMode } from 'react'
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import store from './slices/index';
import './i18n';
import socketIo from './fetch/socket.js';
import Main from './main.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {socketIo()}
      <Main />
    </Provider>
  </StrictMode>,
)
