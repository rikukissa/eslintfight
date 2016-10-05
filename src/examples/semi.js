export default {
  always: `
// good
var website = "eslint.org";

// bad
var name = "ESLint"
  `,
  never: `
// good
var name = "ESLint"

// bad
var website = "eslint.org";
  `,
};
