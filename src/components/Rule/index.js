import React from 'react';
import { capitalize, isEqual } from 'lodash';
import classNames from 'classnames';
import Configuration from '../Configuration';
import './style.css';

function isDisabled(configuration) {
  return isEqual(configuration, ['off']);
}

function hasOptions(configuration) {
  return !(isDisabled(configuration) || isEqual(configuration, ['alert']));
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

  const hasSecondary = configurationsWithOptions.length > 0;

  const mostPopular = configurationsWithOptions.slice(0, 2);
  const otherConfigurations = configurationsWithOptions.slice(2);

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
          mostPopular.map(({ configuration, popularity }, i) =>
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
      <div className="rule__configurations">
        {
          configurationsWithoutOptions.map(({ configuration, popularity }, i) => {
            const disabledOption = isDisabled(configuration);

            const classes = classNames(
              'rule__configuration',
              {
                'rule__configuration--secondary': hasSecondary,
                'rule__configuration--disabled': disabledOption,
                'rule__configuration--enabled': !disabledOption,
              }
            );

            return (
              <Configuration
                key={i}
                onClick={() => onConfigurationSelected(configuration)}
                configuration={configuration[0]}
                popularity={popularity}
                className={classes}
              >
                { disabledOption ? 'Disabled' : 'Enabled' }
              </Configuration>
            );
          })
        }
      </div>
      {
        otherConfigurations.length > 0 && (
          <div>
            <h2 className="rule__others__title">
              Other options
            </h2>
            <div className="rule__configurations rule__configurations--other">
              {
                otherConfigurations.map(({ configuration, popularity }, i) => {
                  const classes = classNames(
                    'rule__configuration',
                    'rule__configuration--other'
                  );

                  return (
                    <Configuration
                      key={i}
                      onClick={() => onConfigurationSelected(configuration)}
                      configuration={configuration[1]}
                      popularity={popularity}
                      className={classes}
                    />
                  );
                })
              }
            </div>
          </div>
        )
      }
    </div>
  );
}
