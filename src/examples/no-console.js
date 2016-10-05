export default {
  alert: `
// bad
console.log('hello world!');
console.warn('hello world!');
console.dir('hello world!');
  `,
  off: `
// good
console.log('hello world!');
console.warn('hello world!');
console.dir('hello world!');
  `,
};
