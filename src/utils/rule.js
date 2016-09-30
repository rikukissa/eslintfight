import { keys, flatten, values } from 'lodash';
import product from 'cartesian-product';

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
    return prod;
  }

  if (option.type === 'boolean') {
    return [true, false];
  }
  return [];
}

export function getPossibleConfigurations(schema) {
  const schemaValues = schema.map(possibleValues);

  if (schemaValues.length === 0) {
    return [['alert'], ['off']];
  }

  const configurations =
    product(schemaValues).map((configuration) => ['alert', ...configuration]);

  return [['off'], ...configurations];
}
