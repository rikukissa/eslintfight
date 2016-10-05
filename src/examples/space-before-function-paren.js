export default {
  always: `
// good
function sum (a, b) {
  return a + b;
}

// bad
function sum(a, b) {
  return a + b;
}
  `,
  never: `
// good
function sum(a, b) {
  return a + b;
}

// bad
function sum (a, b) {
  return a + b;
}
  `,
};
