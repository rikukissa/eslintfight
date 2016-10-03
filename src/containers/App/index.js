import React from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import styles from './style.scss';

const App = React.createClass({
  render() {
    return (
      <div styleName="app">
        { this.props.children }
      </div>
    );
  },
});

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(cssModules(App, styles));
