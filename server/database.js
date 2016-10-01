const knex = require('knex');
const knexConfig = require('./knexfile');

const connection = knex(knexConfig);

const configurations = () => connection('configurations');

function toJSON(configuration) {
  return Object.assign({}, configuration, {
    configuration: JSON.parse(configuration.configuration),
  });
}

function getConfiguration(rule, userId, ipAddress) {
  const query = userId ? { user_id: userId } : { ip_address: ipAddress };

  return configurations()
    .where(Object.assign(query, { rule }));
}

function getConfigurations(rule) {
  const sum = (memo, item) => memo + item;

  function toConfigurations(items) {
    const totalConfigurations =
      items.map(({ count }) => parseInt(count, 10)).reduce(sum, 0);

    return items.map((item) =>
      ({
        configuration: toJSON(item).configuration,
        popularity: parseInt(item.count, 10) / totalConfigurations,
      }));
  }

  return configurations()
    .where({ rule })
    .select('configuration')
    .groupBy('configuration')
    .count('configuration')
    .then(toConfigurations);
}

module.exports.getConfigurations = getConfigurations;

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
