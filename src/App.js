import React from 'react';
import { values } from 'lodash';
import classNames from 'classnames';
import rules from './rules';
import './App.css';

import Rule from './components/Rule';
import { saveConfiguration, getRuleConfigurations } from './api';

const allRules = values(rules);

export default React.createClass({
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
    getRuleConfigurations(rule.name).then((configurations) => {
      this.setState({ configurations });
    });
  },
  getVisibleRule() {
    return allRules[this.state.visibleRuleIndex];
  },
  setRuleConfiguration(configuration) {
    const visibleRule = this.getVisibleRule();
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

    /* TODO */
    this.getRuleConfigurations(nextRule);

    this.setState({
      // Just loop the rules for now
      visibleRuleIndex: index,
    });
  },
  nextRule() {
    const visibleRule = this.getVisibleRule();
    const nextRuleIndex = (this.state.visibleRuleIndex + 1) % allRules.length;

    /* TODO */
    saveConfiguration(visibleRule.name, this.state.rules[visibleRule.name]);
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
                  'sidebar__rule--selected': i === this.state.visibleRuleIndex
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
        <div className="app__rule">
          <div>
            <Rule
              rule={visibleRule}
              configurations={this.state.configurations}
              onConfigurationSelected={this.setRuleConfiguration}
            />
            <pre>
              { JSON.stringify(this.state.rules, null, 2) }
            </pre>
          </div>
        </div>
      </div>
    );
  },
});
