import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import Rule from 'components/Rule';
import { saveConfiguration, getRules } from 'ducks/rules';

import styles from './App.scss';

const App = React.createClass({
  getInitialState() {
    return {
      visibleRuleIndex: 0,
      configurations: [],
    };
  },
  componentDidMount() {
    this.props.dispatch(getRules());
  },
  getVisibleRule() {
    return this.props.rules[this.state.visibleRuleIndex];
  },
  setRuleConfiguration(configuration) {
    const visibleRule = this.getVisibleRule();

    this.props.dispatch(
      saveConfiguration(visibleRule, configuration)
    );

    this.nextRule();
  },
  setRuleIndex(index) {
    this.setState({
      // Just loop the rules for now
      visibleRuleIndex: index,
    });
  },
  nextRule() {
    const nextRuleIndex = (this.state.visibleRuleIndex + 1) % this.props.rules.length;
    this.setRuleIndex(nextRuleIndex);
  },
  render() {
    const visibleRule = this.getVisibleRule();

    return (
      <div styleName="app">
        <div styleName="sidebar">
          <ul styleName="rules">
            {
              this.props.rules.map((rule, i) => {
                const isSelected = i === this.state.visibleRuleIndex;

                const styleName = classNames({
                  rule: !isSelected,
                  'rule--selected': isSelected,
                });

                return (
                  <li
                    onClick={() => this.setRuleIndex(i)}
                    styleName={styleName}
                    key={rule.name}
                  >{rule.name}</li>
                );
              })
            }
          </ul>
        </div>
        <div styleName="view">
          <div styleName="rule-wrapper">
            {
              visibleRule && (
                <Rule
                  rule={visibleRule}
                  configurations={visibleRule.configurations}
                  onConfigurationSelected={this.setRuleConfiguration}
                />
              )
            }
          </div>
        </div>
      </div>
    );
  },
});

function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    rules: state.rules.rules,
    configurations: state.rules.configurations,
  };
}

export default connect(mapStateToProps)(cssModules(App, styles));
