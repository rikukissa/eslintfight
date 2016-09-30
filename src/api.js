import rules from './rules';
import { getPossibleConfigurations } from './utils/rule';

export function saveConfiguration(ruleName, configuration) {
  console.info('save', ruleName, configuration);
  return Promise.resolve();
}

export function getRuleConfigurations(ruleName) {
  const possibleConfigurations = getPossibleConfigurations(rules[ruleName].schema);

  const data = possibleConfigurations.map((configuration) => ({
    configuration,
    popularity: 100 / possibleConfigurations.length,
  }));

  return Promise.resolve(data);
}
