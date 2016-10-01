const knex = require('knex');
const { isEqual } = require('lodash');
const knexConfig = require('../knexfile');
const getPossibleConfigurations = require('../utils/rule').getPossibleConfigurations;

const RULES = require('../rules');

const connection = knex(knexConfig);

const configurations = () => connection('configurations');

function toJSON(configuration) {
  return Object.assign({}, configuration, {
    configuration: JSON.parse(configuration.configuration),
  });
}

function byPopularity(configuration1, configuration2) {
  return configuration2.popularity - configuration1.popularity;
}

/*
 * Query methods
 */

function getConfiguration(rule, userId, ipAddress) {
  const query = userId ? { user_id: userId } : { ip_address: ipAddress };

  return configurations()
    .where(Object.assign(query, { rule }));
}

function getConfigurations(rules) {
  const sum = (memo, item) => memo + item;

  function toConfigurations(items) {
    return items.map((item) => {
      const totalConfigurations = items
        .filter(({ rule }) => item.rule === rule)
        .map(({ count }) => parseInt(count, 10)).reduce(sum, 0);

      return {
        rule: item.rule,
        configuration: toJSON(item).configuration,
        popularity: parseInt(item.count, 10) / totalConfigurations,
      };
    });
  }

  return configurations()
    .whereIn('rule', rules)
    .select('configuration', 'rule')
    .groupBy('configuration', 'rule')
    .count('*')
    .then(toConfigurations);
}

module.exports.getConfigurations = getConfigurations;

function getRules() {
  const ruleNames = RULES.map(({ name }) => name);

  return getConfigurations(ruleNames).then((configs) =>
    RULES.map((rule) => {
      const possibleConfigurations = getPossibleConfigurations(rule.schema);

      const storedConfigurations =
        configs.filter((config) => config.rule === rule.name);

      const missingConfigurations = possibleConfigurations.filter((configuration) =>
        !storedConfigurations.some((conf) => isEqual(configuration, conf.configuration))
      ).map((configuration) => ({
        configuration,
        popularity: 0,
      }));

      return Object.assign({}, rule, {
        configurations: storedConfigurations.concat(missingConfigurations).sort(byPopularity),
      });
    })
  );
}

module.exports.getRules = getRules;

/*
 * Save methods
 */

function createConfiguration(rule, configuration, userId, ipAddress) {
  return configurations().insert({
    rule,
    configuration: JSON.stringify(configuration),
    user_id: userId,
    ip_address: ipAddress,
  })
  .returning(['rule', 'configuration'])
  .then(([result]) => toJSON(result));
}

function updateConfiguration(rule, configuration, userId, ipAddress) {
  return getConfiguration(rule, userId, ipAddress).update({
    configuration: JSON.stringify(configuration),
  })
  .returning(['rule', 'configuration'])
  .then(([result]) => toJSON(result));
}

function saveConfiguration(rule, configuration, userId, ipAddress) {
  return getConfiguration(rule, userId, ipAddress).then((results) => {
    if (results.length === 0) {
      return createConfiguration(rule, configuration, userId, ipAddress);
    }
    return updateConfiguration(rule, configuration, userId, ipAddress);
  });
}

module.exports.saveConfiguration = saveConfiguration;
