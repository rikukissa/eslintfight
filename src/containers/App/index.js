import React from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import { login } from 'ducks/user';

import styles from './style.scss';

function App(props) {
  return (
    <div styleName="app">
      <div styleName="header">
        <div styleName="profile">
          {
            props.loggedIn ? (
              <div>
                <img styleName="avatar" alt="avatar" src={props.profile.picture} />
              </div>
            ) : (
              <button styleName="login-link" onClick={props.login}>
                Login with Github
              </button>
            )
          }
        </div>
      </div>
      { props.children }
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(login()),
  };
}

function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    profile: state.user.profile,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(App, styles));
