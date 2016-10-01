import rules from './rules';
import { getPossibleConfigurations } from './utils/rule';

export function saveRuleConfiguration(ruleName, configuration, userId, idToken) {
  console.info('📤', `/api/users/${userId}/rules/${ruleName}`, configuration, {
    TOKEN: idToken
  });
  return Promise.resolve();
}

export function getRuleConfigurations(ruleName) {
  const possibleConfigurations = getPossibleConfigurations(rules[ruleName].schema);
  console.info('📩', `/api/rules/${ruleName}`);

  const data = possibleConfigurations.map((configuration) => ({
    configuration,
    popularity: 100 / possibleConfigurations.length,
  }));

  return Promise.resolve(data);
}
