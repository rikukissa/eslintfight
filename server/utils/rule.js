const { keys, flatten, values } = require('lodash');
const product = require('cartesian-product');

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

    return prod.map((p) => Object.assign({}, ...p));
  }

  if (option.type === 'boolean') {
    return [true, false];
  }
  return [];
}

function getPossibleConfigurations(schema) {
  const schemaValues = schema.map(possibleValues);

  if (schemaValues.length === 0) {
    return [['alert'], ['off']];
  }

  const configurations =
    product(schemaValues).map((configuration) => ['alert', ...configuration]);

  return [['off'], ...configurations];
}

module.exports.getPossibleConfigurations = getPossibleConfigurations;
