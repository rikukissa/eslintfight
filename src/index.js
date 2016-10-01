import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer, { authMiddleware } from './ducks/user';
import rulesReducer from './ducks/rules';

import App from './App';
import './index.css';

const store = createStore(combineReducers({
  user: userReducer,
  rules: rulesReducer,
}), applyMiddleware(thunk, authMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
