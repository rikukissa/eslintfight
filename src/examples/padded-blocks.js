export default {
  always: `
// good
if(true) {

  console.log('hello');
}

// bad
if(true) {
  console.log('hello');
}
  `,
  never: `
// good
if(true) {
  console.log('hello');
}

// bad
if(true) {
  
  console.log('hello');
}
  `,
};
