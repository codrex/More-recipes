import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'react-select/dist/react-select.css';
import 'react-dropdown/style.css';
import 'font-awesome-sass-loader';
import 'bootstrap';
import configureStore from './store/configStore';
import App from './components/App';
import './style/index.scss';

const store = configureStore();
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
