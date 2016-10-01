import {
  saveRuleConfiguration,
  getRuleConfigurations,
} from '../api';

import { getIdToken } from './user';

/*
 * Actions
 */

const CONFIGURATIONS_LOADED = 'CONFIGURATIONS_LOADED';
const CONFIGURATIONS_SAVED = 'CONFIGURATIONS_SAVED';

/*
 * Reducer
 */

const INITIAL_STATE = {
  configurations: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CONFIGURATIONS_LOADED: {
      return {
        ...state,
        configurations: action.payload,
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
    const idToken = getIdToken(state);

    saveRuleConfiguration(rule.name, configuration, idToken).then(() => {
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
