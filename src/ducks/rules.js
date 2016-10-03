import {
  saveConfiguration as saveConfigurationRequest,
  getRules as getRulesRequest,
} from 'api';

import { getIdToken } from 'ducks/user';

/*
 * Actions
 */

const RULES_LOADED = 'RULES_LOADED';
const CONFIGURATIONS_LOADED = 'CONFIGURATIONS_LOADED';
const CONFIGURATION_SAVED = 'CONFIGURATION_SAVED';
export const SAVE_CONFIGURATION = 'SAVE_CONFIGURATION';

/*
 * Reducer
 */

const INITIAL_STATE = {
  configurations: [],
  rules: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RULES_LOADED: {
      return {
        ...state,
        rules: action.payload,
      };
    }
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

    dispatch({
      type: SAVE_CONFIGURATION,
      payload: { rule, configuration },
    });

    saveConfigurationRequest(rule.name, configuration, idToken).then(() => {
      dispatch({
        type: CONFIGURATION_SAVED,
        payload: { rule, configuration },
      });
    });
  };
}

export function getRules() {
  return (dispatch) => {
    getRulesRequest().then((rules) => {
      dispatch({ type: RULES_LOADED, payload: rules });
    });
  };
}
