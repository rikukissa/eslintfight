import React from 'react';
import { values } from 'lodash';
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
    console.log(configuration);
    this.setState({
      rules: {
        ...this.state.rules,
        [visibleRule.name]: configuration,
      },
    });

    this.nextRule();
  },
  nextRule() {
    const visibleRule = this.getVisibleRule();

    const nextRuleIndex = (this.state.visibleRuleIndex + 1) % allRules.length;
    const nextRule = allRules[nextRuleIndex];

    /* TODO */
    saveConfiguration(visibleRule.name, this.state.rules[visibleRule.name]);
    this.getRuleConfigurations(nextRule);

    this.setState({
      // Just loop the rules for now
      visibleRuleIndex: nextRuleIndex,
    });
  },
  render() {
    const visibleRule = this.getVisibleRule();

    return (
      <div className="app">
        <Rule
          rule={visibleRule}
          configurations={this.state.configurations}
          onConfigurationSelected={this.setRuleConfiguration}
        />
        <pre>
          { JSON.stringify(this.state.rules, null, 2) }
        </pre>
      </div>
    );
  },
});
