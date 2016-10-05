export default {
  always: `
// good
var foo = {
    bar: "baz",
    qux: "quux",
};
var arr = [1,2,];

// bad
var arr = [1,2];
  `,
  'always-multiline': `
// good
var foo = {
    bar: "baz",
    qux: "quux",
};
var arr = [1,2];

// bad
var arr = {
    bar: "baz",
    qux: "quux"
};
var arr = [1,2,]
  `,
  'only-multiline': `
// good
var foo = {
    qux: "quux",
};
var foo = {
    bar: "baz",
    qux: "quux"
};
var arr = [1,2];

// bad
var foo = { bar: "baz", };

var arr = [1,2,];
  `,
};
