import React from 'react';
import { capitalize, isEqual } from 'lodash';
import cssModules from 'react-css-modules';
import Markdown from 'react-markdown';
import Configuration from 'components/Configuration';

import styles from './style.scss';

function isDisabled(configuration) {
  return configuration[0] === 'off';
}

function hasOptions(configuration) {
  return !(isDisabled(configuration) || isEqual(configuration, ['alert']));
}

const Rule = React.createClass({
  getInitialState() {
    return {
      allConfigurationsVisible: false,
    };
  },
  showAllConfigurations() {
    this.setState({ allConfigurationsVisible: true });
  },
  render() {
    const {
      rule,
      onConfigurationSelected,
      configurations,
    } = this.props;

    const configurationsWithOptions = configurations
      .filter(({ configuration }) => hasOptions(configuration));

    const configurationsWithoutOptions = configurations
      .filter(({ configuration }) => !hasOptions(configuration));

    const hasSecondaryConfigurations = configurationsWithOptions.length > 0;
    const visibleConfigurableOptions = configurationsWithOptions.slice(0, 3);

    return (
      <div>
        <div>
          <h1 styleName="title">
            {rule.name}
          </h1>
          <h2 styleName="category">
            {rule.category}
          </h2>
          <div styleName="description">
            <Markdown source={capitalize(rule.description)} />
            <a styleName="source" rel="noopener noreferrer" target="_blank" href={`http://eslint.org/docs/rules/${rule.name}`}>
              (Documentation)
            </a>
          </div>
        </div>
        {
          visibleConfigurableOptions.length > 0 && (
            <div styleName="configurations">
              {
                visibleConfigurableOptions.map(({ configuration, popularity }, i) =>
                  <Configuration
                    key={i}
                    rule={rule}
                    mostPopular={i === 0}
                    onClick={() => onConfigurationSelected(configuration)}
                    configurationValue={configuration[1]}
                    popularity={popularity}
                    styleName="configuration"
                  />
                )
              }
            </div>
          )
        }
        <div styleName="configurations">
          {
            !hasSecondaryConfigurations &&
            configurationsWithoutOptions.map(({ configuration, popularity }, i) => {
              const disabledOption = isDisabled(configuration);

              return (
                <Configuration
                  key={i}
                  rule={rule}
                  mostPopular={i === 0}
                  onClick={() => onConfigurationSelected(configuration)}
                  configurationValue={configuration[0]}
                  popularity={popularity}
                  styleName="configuration"
                >
                  { disabledOption ? 'Disabled' : 'Enabled' }
                </Configuration>
              );
            })
          }
        </div>
      </div>
    );
  },
});

export default cssModules(Rule, styles);
