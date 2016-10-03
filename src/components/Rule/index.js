import React from 'react';
import { capitalize, isEqual } from 'lodash';
import cssModules from 'react-css-modules';

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

    const mostPopular = configurationsWithOptions.slice(0, 2);
    const otherConfigurations = configurationsWithOptions.slice(2);

    const allConfigurationsVisible =
      this.state.allConfigurationsVisible || otherConfigurations.length <= 3;

    const visibleOtherConfigurations = otherConfigurations
      .slice(0, allConfigurationsVisible ? Infinity : 3);

    return (
      <div>
        <div>
          <h1 styleName="title">
            {rule.name}
          </h1>
          <h2 styleName="category">
            {rule.category}
          </h2>
          <p styleName="description">
            {capitalize(rule.description)}<br />
            <a styleName="source" rel="noopener noreferrer" target="_blank" href={`http://eslint.org/docs/rules/${rule.name}`}>
              (Documentation)
            </a>
          </p>
        </div>
        <div styleName="configurations">
          {
            mostPopular.map(({ configuration, popularity }, i) =>
              <Configuration
                key={i}
                onClick={() => onConfigurationSelected(configuration)}
                configurationValue={configuration[1]}
                popularity={popularity}
                styleName="configuration"
              />
            )
          }
        </div>
        <div styleName="configurations">
          {
            configurationsWithoutOptions.map(({ configuration, popularity }, i) => {
              const disabledOption = isDisabled(configuration);

              return (
                <Configuration
                  key={i}
                  onClick={() => onConfigurationSelected(configuration)}
                  secondary={hasSecondaryConfigurations}
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
        {
          otherConfigurations.length > 0 && (
            <div>
              <h2 styleName="others__title">
                Other options
              </h2>
              <div styleName="configurations--other">
                {
                  visibleOtherConfigurations.map(({ configuration, popularity }, i) => (
                    <Configuration
                      key={i}
                      onClick={() => onConfigurationSelected(configuration)}
                      configurationValue={configuration[1]}
                      popularity={popularity}
                      styleName="configuration--other"
                    />
                  ))
                }
              </div>
              {
                !allConfigurationsVisible && (
                  <div styleName="others__show-all">
                    <a href="#" onClick={this.showAllConfigurations}>
                      Show all available options
                    </a>
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    );
  },
});

export default cssModules(Rule, styles, {
  allowMultiple: true,
});
