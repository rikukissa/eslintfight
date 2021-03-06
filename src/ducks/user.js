import Auth0Lock from 'auth0-lock';
import { SAVE_CONFIGURATION } from 'ducks/rules';
import config from '../../config';

const lock = new Auth0Lock(config.auth0.clientId, config.auth0.domain, {
  auth: {
    redirect: false,
  },
});

/*
 * Actions
 */
export const LOGGED_IN = 'LOGGED_IN';

/*
 * Reducer
 */

const storedIdToken = localStorage.getItem('idToken');
const INITIAL_STATE = {
  profile: JSON.parse(localStorage.getItem('profile')),
  idToken: storedIdToken,
  loggedIn: Boolean(storedIdToken),
  rules: {},
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGGED_IN: {
      const { idToken, profile } = action.payload;
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('idToken', idToken);

      return {
        ...state,
        profile,
        loggedIn: true,
        idToken,
      };
    }
    case SAVE_CONFIGURATION: {
      return {
        ...state,
        rules: {
          ...state.rules,
          [action.payload.rule.name]: action.payload.configuration,
        },
      };
    }
    default:
      return state;
  }
}

/*
 * Selectors
 */

export function getUserId(state) {
  return state.user.profile && state.user.profile.user_id;
}
export function getIdToken(state) {
  return state.user.idToken;
}

/*
 * Action creators
 */

export function login() {
  return () => {
    lock.show();
  };
}

/*
 * Middlewares
 */
export function authMiddleware(store) {
  lock.on('authenticated', (authResult) => {
    lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        // TODO Handle error
        return;
      }
      store.dispatch({
        type: LOGGED_IN,
        payload: {
          profile,
          idToken: authResult.idToken,
        },
      });
    });
  });
  return (next) => (action) => next(action);
}
