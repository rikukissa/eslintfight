import React from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import { login } from 'ducks/user';

import styles from './style.scss';

const App = React.createClass({
  render() {
    return (
      <div styleName="app">
        <div styleName="header">
          <div styleName="profile">
            {
              this.props.loggedIn ? (
                <div>
                  <img styleName="avatar" alt="avatar" src={this.props.profile.picture} />
                  <span styleName="nickname">{this.props.profile.nickname}</span>
                </div>
              ) : (
                <button styleName="login-link" onClick={this.props.login}>
                  Login with Github
                </button>
              )
            }
          </div>
        </div>
        { this.props.children }
      </div>
    );
  },
});

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
