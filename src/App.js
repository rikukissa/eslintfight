import React from 'react';
import { values } from 'lodash';
import classNames from 'classnames';
import { connect } from 'react-redux';
import rules from './rules';
import './App.css';

import Rule from './components/Rule';
import { saveConfiguration, getConfigurations } from './ducks/rules';

const allRules = values(rules);

const App = React.createClass({
  getInitialState() {
    return {
      visibleRuleIndex: 0,
      rules: {},
      configurations: [],
    };
  },
  componentDidMount() {
    this.getRuleConfigurations(this.getVisibleRule());
  },
  getRuleConfigurations(rule) {
    this.props.dispatch(getConfigurations(rule));
  },
  getVisibleRule() {
    return allRules[this.state.visibleRuleIndex];
  },
  setRuleConfiguration(configuration) {
    const visibleRule = this.getVisibleRule();

    this.props.dispatch(
      saveConfiguration(visibleRule, configuration)
    );

    this.setState({
      rules: {
        ...this.state.rules,
        [visibleRule.name]: configuration,
      },
    });

    this.nextRule();
  },
  setRuleIndex(index) {
    const nextRule = allRules[index];

    this.getRuleConfigurations(nextRule);

    this.setState({
      // Just loop the rules for now
      visibleRuleIndex: index,
    });
  },
  nextRule() {
    const nextRuleIndex = (this.state.visibleRuleIndex + 1) % allRules.length;
    this.setRuleIndex(nextRuleIndex);
  },
  render() {
    const visibleRule = this.getVisibleRule();

    return (
      <div className="app">
        <div className="sidebar">
          <ul className="sidebar__rules">
            {
              allRules.map((rule, i) => {
                const classes = classNames('sidebar__rule', {
                  'sidebar__rule--selected': i === this.state.visibleRuleIndex,
                });

                return (
                  <li
                    onClick={() => this.setRuleIndex(i)}
                    className={classes}
                    key={rule.name}
                  >{rule.name}</li>
                );
              })
            }
          </ul>
        </div>
        <div className="app__view">
          <div className="app__rule">
            <Rule
              rule={visibleRule}
              configurations={this.props.configurations}
              onConfigurationSelected={this.setRuleConfiguration}
            />
            <pre>
              { /*JSON.stringify(this.state.rules, null, 2)*/ }
            </pre>
          </div>
        </div>
      </div>
    );
  },
});

function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    configurations: state.rules.configurations,
  };
}

export default connect(mapStateToProps)(App);
