export default {
  alert: `
// good
var obj = { "foo": 42 };

// bad
var obj = {"foo": 42};
  `,
  off: `
// good
var obj = {"foo": 42};
var obj = { "foo": 42 };
  `,
};
