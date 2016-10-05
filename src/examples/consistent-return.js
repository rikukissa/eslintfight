export default {
  off: `
// good
function launchMissiles() {
  doSomething();
}
  `,
  alert: `
// good
function launchMissiles() {
  doSomething();
  return undefined;
}

// bad
function launchMissiles() {
  doSomething();
}
  `,
};
