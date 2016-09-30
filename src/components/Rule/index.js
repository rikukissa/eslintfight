import React from 'react';
import { capitalize, isEqual } from 'lodash';
import Configuration from '../Configuration';

import './style.css';

function hasOptions(configuration) {
  return !(isEqual(configuration, ['off']) || isEqual(configuration, ['alert']));
}

export default function Rule({
  rule,
  onConfigurationSelected,
  configurations,
}) {
  const configurationsWithOptions = configurations
    .filter(({ configuration }) => hasOptions(configuration));

  const configurationsWithoutOptions = configurations
    .filter(({ configuration }) => !hasOptions(configuration));

  return (
    <div>
      <div className="rule__header">
        <h1 className="rule__title">
          {rule.name}
        </h1>
        <h2 className="rule__category">
          {rule.category}
        </h2>
        <p className="rule__description">
          {capitalize(rule.description)}<br />
          <a className="rule__source" rel="noopener noreferrer" target="_blank" href={`http://eslint.org/docs/rules/${rule.name}`}>
            (Documentation)
          </a>
        </p>
      </div>
      <div className="rule__configurations">
        {
          configurationsWithOptions.map(({ configuration, popularity }, i) =>
            <Configuration
              key={i}
              onClick={() => onConfigurationSelected(configuration)}
              configuration={configuration[1]}
              popularity={popularity}
              className="rule__configuration"
            />
          )
        }
      </div>
      <div className="rule__statuses">
        {
          configurationsWithoutOptions.map(({ configuration, popularity }, i) =>
            <Configuration
              key={i}
              onClick={() => onConfigurationSelected(configuration)}
              configuration={configuration[0]}
              popularity={popularity}
              className="rule__configuration rule__status"
            />
          )
        }
      </div>
    </div>
  );
}
