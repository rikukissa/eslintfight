export default {
  tab: `
if (a) {
    b=c;
    function foo(d) {
        e=f;
    }
}
  `,
  2: `
if (a) {
  b=c;
  function foo(d) {
    e=f;
  }
}
  `,
  4: `
if (a) {
    b=c;
    function foo(d) {
        e=f;
    }
}
  `,
};
