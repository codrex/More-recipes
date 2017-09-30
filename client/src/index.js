import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configStore';
import 'font-awesome-sass-loader';
import './scss/scss.scss';
import 'bootstrap';
import App from './components/app';
const store = configureStore();
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
