export default {
  always: `
// good
class MyComponent extends React.Component {
  render() {
    return <h1>Hello!</h1>;
  }
}

// bad
const MyComponent = React.createClass({
  render() {
    return <h1>Hello!</h1>;
  }
});
  `,
  never: `

// good
const MyComponent = React.createClass({
  render() {
    return <h1>Hello!</h1>;
  }
});

// bad
class MyComponent extends React.Component {
  render() {
    return <h1>Hello!</h1>;
  }
}
  `,
};
