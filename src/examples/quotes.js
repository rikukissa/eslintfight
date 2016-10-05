export default {
  single: `
// good
const foo = 'bar';

// bad
const foo = "bar";
  `,
  double: `
// good
const foo = "bar";

// bad
const foo = 'bar';
  `,
  backtick: `
// good
const foo = \`bar\`;

// bad
const foo = "bar";

// bad
const foo = 'bar';
  `,
};
