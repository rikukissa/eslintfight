const { identity } = require('lodash');

function createRuleObject(eslintRule, name, schemaFilter = identity) {
  return {
    name,
    category: eslintRule.meta.docs.category,
    description: eslintRule.meta.docs.description,
    recommended: eslintRule.meta.docs.recommended,
    schema: schemaFilter(eslintRule.meta.schema),
  };
}

function createRule(name, schemaFilter) {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const eslintRule = require(`eslint/lib/rules/${name}`);
  return createRuleObject(eslintRule, name, schemaFilter);
}

function createReactRule(name, schemaFilter) {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const reactRule = require(`eslint-plugin-react/lib/rules/${name}`);
  return createRuleObject(reactRule, `react/${name}`, schemaFilter);
}


module.exports = [
  createRule('indent', (schema) => [schema[0]]),
  createRule('arrow-parens', (schema) => [schema[0]]),
  createRule('jsx-quotes'),
  createRule('key-spacing', () => []),
  createRule('new-cap', () => []),
  createRule('padded-blocks', () => [{ enum: ['always', 'never'] }]),
  createRule('consistent-return', () => []),
  createRule('no-console', () => []),
  createRule('comma-dangle'),
  createRule('semi', () => ([{
    enum: ['always', 'never'],
  }])),
  createRule('space-before-function-paren', () => [{ enum: ['always', 'never'] }]),
  createRule('quotes', (schema) => [schema[0]]),

  // React plugin
  createReactRule('prefer-es6-class'),
];
