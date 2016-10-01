import { isEqual } from 'lodash';
import fetch from './utils/fetch';
import rules from './rules';
import { getPossibleConfigurations } from './utils/rule';
import config from '../config';

export function saveRuleConfiguration(ruleName, configuration, idToken) {
  const headers = idToken ? { token: idToken } : {};
  return fetch(`${config.api.path}/rules/${encodeURIComponent(ruleName)}/configurations`, {
    method: 'POST',
    headers,
    body: configuration,
  });
}

export function getRuleConfigurations(ruleName) {
  const possibleConfigurations = getPossibleConfigurations(rules[ruleName].schema);

  function populateMissingConfigs(configurations) {
    const missing = possibleConfigurations.filter((configuration) =>
      !configurations.some((conf) => isEqual(configuration, conf.configuration))
    ).map((configuration) => ({
      configuration,
      popularity: 0,
    }));

    return configurations.concat(missing);
  }

  return fetch(`${config.api.path}/rules/${encodeURIComponent(ruleName)}/configurations`).then(populateMissingConfigs);
}
