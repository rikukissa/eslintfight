import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import {
  IndexRoute,
  Router,
  Route,
  hashHistory,
} from 'react-router';
import {
  syncHistoryWithStore,
  routerReducer,
} from 'react-router-redux';

import 'index.scss';

/*
 * Ducks
 */

import userReducer, { authMiddleware } from 'ducks/user';
import rulesReducer from 'ducks/rules';

/*
 * Containers
 */

import App from 'containers/App';
import RuleView from 'containers/RuleView';

const store = createStore(combineReducers({
  user: userReducer,
  rules: rulesReducer,
  routing: routerReducer,
}), applyMiddleware(thunk, authMiddleware));

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={RuleView} />
        <Route path="rules/:name" component={RuleView} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
