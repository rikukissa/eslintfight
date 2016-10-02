const indent = require('eslint/lib/rules/indent');
const arrowParens = require('eslint/lib/rules/arrow-parens');
const jsxQuotes = require('eslint/lib/rules/jsx-quotes');
const keySpacing = require('eslint/lib/rules/key-spacing');
const newCap = require('eslint/lib/rules/new-cap');
const paddedBlocks = require('eslint/lib/rules/padded-blocks');
const consistentReturn = require('eslint/lib/rules/consistent-return');
const noConsole = require('eslint/lib/rules/no-console');
const commaDangle = require('eslint/lib/rules/comma-dangle');
const quotes = require('eslint/lib/rules/quotes');
const spaceBeforeFnParen = require('eslint/lib/rules/space-before-function-paren');

// React
const preferClasses = require('eslint-plugin-react/lib/rules/prefer-es6-class');

function createRule(esLintRule, name, overrides) {
  return Object.assign({
    name,
    category: esLintRule.meta.docs.category,
    description: esLintRule.meta.docs.description,
    schema: esLintRule.meta.schema,
  }, overrides);
}

module.exports = [
  createRule(indent, 'indent', {
    schema: [indent.meta.schema[0]],
  }),
  createRule(arrowParens, 'arrow-parens', {
    schema: [arrowParens.meta.schema[0]],
  }),
  createRule(jsxQuotes, 'jsx-quotes'),
  createRule(keySpacing, 'key-spacing', { schema: [] }),
  createRule(newCap, 'new-cap', { schema: [] }),
  createRule(paddedBlocks, 'padded-blocks'),
  createRule(consistentReturn, 'consistent-return', { schema: [] }),
  createRule(noConsole, 'no-console', { schema: [] }),
  createRule(commaDangle, 'comma-dangle'),
  createRule(spaceBeforeFnParen, 'space-before-function-paren'),
  createRule(quotes, 'quotes', {
    schema: [quotes.meta.schema[0]],
  }),

  // React plugin
  createRule(preferClasses, 'react/prefer-es6-class'),
];
