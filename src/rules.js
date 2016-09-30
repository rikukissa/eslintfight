import indentRule from 'eslint/lib/rules/indent';
import arrowParens from 'eslint/lib/rules/arrow-parens';
import jsxQuotes from 'eslint/lib/rules/jsx-quotes';
import keySpacing from 'eslint/lib/rules/key-spacing';
import newCap from 'eslint/lib/rules/new-cap';
import preferClasses from 'eslint-plugin-react/lib/rules/prefer-es6-class';

function createRule(esLintRule, name, overrides) {
  return {
    name,
    category: esLintRule.meta.docs.category,
    description: esLintRule.meta.docs.description,
    schema: esLintRule.meta.schema,
    ...overrides,
  };
}

const rules = {
  indent: createRule(indentRule, 'indent', {
    schema: [indentRule.meta.schema[0]],
  }),
  'arrow-parens': createRule(arrowParens, 'arrow-parens', {
    schema: [arrowParens.meta.schema[0]],
  }),
  'jsx-quotes': createRule(jsxQuotes, 'jsx-quotes'),
  'key-spacing': createRule(keySpacing, 'key-spacing', { schema: [] }),
  'new-cap': createRule(newCap, 'new-cap', { schema: [] }),

  // React plugin
  'react/prefer-es6-class': createRule(preferClasses, 'react/prefer-es6-class'),
};

export default rules;
