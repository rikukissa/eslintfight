export default {
  always: `
// good
a.then((foo) => {});
a.then((foo) => { if (true) {}; });

// bad
a.then(foo => {});
a.then(foo => a);
a(foo => { if (true) {}; });
  `,
  'as-needed': `
// good
a.then(foo => a);
a.then((foo) => {});
  `,
};
