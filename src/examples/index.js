import quotes from 'examples/quotes';
import indent from 'examples/indent';
import spaceBeforeFunctionParen from 'examples/space-before-function-paren';
import jsxQuotes from 'examples/jsx-quotes';
import consistentReturn from 'examples/consistent-return';
import reactPreferES6Class from 'examples/react-prefer-es6-class';
import semi from 'examples/semi';
import keySpacing from 'examples/key-spacing';
import paddedBlocks from 'examples/padded-blocks';
import newCap from 'examples/new-cap';
import arrowParens from 'examples/arrow-parens';
import noConsole from 'examples/no-console';
import commaDangle from 'examples/comma-dangle';

const EXAMPLES = {
  quotes,
  indent,
  semi,
  'arrow-parens': arrowParens,
  'comma-dangle': commaDangle,
  'no-console': noConsole,
  'padded-blocks': paddedBlocks,
  'new-cap': newCap,
  'space-before-function-paren': spaceBeforeFunctionParen,
  'jsx-quotes': jsxQuotes,
  'consistent-return': consistentReturn,
  'key-spacing': keySpacing,
  'react/prefer-es6-class': reactPreferES6Class,
};

export default function getExample(rule, configurationValue) {
  if (!EXAMPLES[rule.name] || !EXAMPLES[rule.name][configurationValue]) {
    return null;
  }
  return EXAMPLES[rule.name][configurationValue].trim();
}
