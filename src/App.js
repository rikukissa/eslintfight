import React from 'react';
import { keys, flatten, values, capitalize } from 'lodash';
import classNames from 'classnames';
import product from 'cartesian-product';

import rules from './rules';
import './App.css';

function possibleValues(option) {
  if (option.type === 'integer') {
    return [2, 4];
  }

  if (option.oneOf) {
    return flatten(option.oneOf.map(possibleValues));
  }

  if (option.enum) {
    return values(option.enum);
  }

  if (option.type === 'object') {
    const prod = product(keys(option.properties).map((optionName) =>
      possibleValues(option.properties[optionName]).map((value) => ({
        [optionName]: value,
      }))
    ));
    return prod;
  }

  if (option.type === 'boolean') {
    return [true, false];
  }
  return [];
}

function possibleConfigurations(schema) {
  return product(schema.map(possibleValues));
}

function Configuration({ configuration, className, onClick }) {
  const classN = classNames('configuration', className);

  return (
    <button onClick={onClick} className={classN}>
      { JSON.stringify(configuration) }
    </button>
  );
}

function Rule({
  rule,
  onConfigurationSelected,
  onRuleStatusSelected,
}) {
  const configurations = possibleConfigurations(rule.schema);
  const configurable = configurations.length > 1;

  return (
    <div>
      <div className="rule__header">
        <h1 className="rule__title">{rule.name}</h1>
        <h2 className="rule__category">{rule.category}</h2>
        <a className="rule__source" rel="noopener noreferrer" target="_blank" href={`http://eslint.org/docs/rules/${rule.name}`}>
          Documentation
        </a>
        <p className="rule__description">{capitalize(rule.description)}</p>
      </div>
      <div className="rule__statuses">
        <button
          onClick={() => onRuleStatusSelected('off')}
        >Disabled</button>
        <button
          onClick={() => onRuleStatusSelected('warn')}
        >Warn</button>
        <button
          onClick={() => onRuleStatusSelected('error')}
        >Error</button>
      </div>
      <div className="rule__configurations">
        {
          configurable && configurations.map((configuration, i) =>
            <Configuration
              key={i}
              onClick={() => onConfigurationSelected(configuration)}
              configuration={configuration}
              className="rule__configuration"
            />
          )
        }
      </div>
    </div>
  );
}


const allRules = values(rules);

export default React.createClass({
  getInitialState() {
    return {
      visibleRuleIndex: 0,
      rules: {},
    };
  },
  nextRule() {
    this.setState({
      // Just loop the rules for now
      visibleRuleIndex: (this.state.visibleRuleIndex + 1) % allRules.length,
    });
  },
  setRuleStatus(status) {
    const visibleRule = allRules[this.state.visibleRuleIndex];
    const currentConfiguration = this.state.rules[visibleRule.name] || [];

    this.setState({
      rules: {
        ...this.state.rules,
        [visibleRule.name]: [status, ...currentConfiguration.slice(1)],
      },
    });
  },
  setRuleConfiguration(configuration) {
    const visibleRule = allRules[this.state.visibleRuleIndex];
    const currentConfiguration = this.state.rules[visibleRule.name] || ['error'];

    this.setState({
      rules: {
        ...this.state.rules,
        [visibleRule.name]: [currentConfiguration[0], configuration[0]],
      },
    });
  },
  render() {
    const visibleRule = allRules[this.state.visibleRuleIndex];

    return (
      <div className="app">
        <button onClick={this.nextRule}>next</button>
        <Rule
          rule={visibleRule}
          onRuleStatusSelected={this.setRuleStatus}
          onConfigurationSelected={this.setRuleConfiguration}
        />
        <pre>
          { JSON.stringify(this.state.rules, null, 2) }
        </pre>
      </div>
    );
  },
});
