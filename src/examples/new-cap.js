export default {
  alert: `
// good
var friend = new Person();

// bad
var friend = new person();
  `,
  off: `
// good
var friend = new Person();
var friend = new person();
  `,
};
