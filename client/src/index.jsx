import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'react-select/dist/react-select.css';
import 'font-awesome-sass-loader';
import 'bootstrap';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
import configureStore from './store/configStore';
import App from './components/app';
import './scss/scss.scss';

const store = configureStore();
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
