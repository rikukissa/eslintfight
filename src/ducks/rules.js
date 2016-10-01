import {
  saveRuleConfiguration,
  getRuleConfigurations,
} from '../api';

import {
  getUserId,
  getIdToken,
  login,
  LOGGED_IN,
} from './user';

/*
 * Actions
 */

const CONFIGURATIONS_LOADED = 'CONFIGURATIONS_LOADED';
const CONFIGURATIONS_SAVED = 'CONFIGURATIONS_SAVED';
const PENDING_SAVED = 'PENDING_SAVED';
const PENDING_CONFIGURATION = 'PENDING_CONFIGURATION';

/*
 * Reducer
 */

const INITIAL_STATE = {
  configurations: [],
  pendingConfigurations: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CONFIGURATIONS_LOADED: {
      return {
        ...state,
        configurations: action.payload,
      };
    }
    case PENDING_CONFIGURATION: {
      return {
        ...state,
        pendingConfigurations: state.pendingConfigurations.concat(action.payload),
      };
    }
    case PENDING_SAVED: {
      return {
        ...state,
        pendingConfigurations: [],
      };
    }
    default:
      return state;
  }
}

/*
 * Action creators
 */

export function saveConfiguration(rule, configuration) {
  return (dispatch, getState) => {
    const state = getState();
    const userId = getUserId(state);
    const idToken = getIdToken(state);

    if (!userId) {
      dispatch({
        type: PENDING_CONFIGURATION,
        payload: {
          ruleName: rule.name,
          configuration,
        },
      });
      dispatch(login());
      return;
    }

    saveRuleConfiguration(rule.name, configuration, userId, idToken).then(() => {
      dispatch({ type: CONFIGURATIONS_SAVED, payload: null });
    });
  };
}

export function getConfigurations(rule) {
  return (dispatch) => {
    getRuleConfigurations(rule.name).then((configurations) => {
      dispatch({ type: CONFIGURATIONS_LOADED, payload: configurations });
    });
  };
}

/*
 * Middlewares
 */

export function savePendingConfigurations(store) {
  return (next) => (action) => {
    next(action);
    if (action.type === LOGGED_IN) {
      const state = store.getState();

      const promises = state.rules.pendingConfigurations.map(({ ruleName, configuration }) =>
        saveRuleConfiguration(
          ruleName,
          configuration,
          action.payload.profile.user_id,
          action.payload.idToken
        )
      );

      Promise.all(promises).then(() =>
        store.dispatch({ type: PENDING_SAVED })
      );
    }
  };
}
