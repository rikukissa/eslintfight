export default {
  'prefer-single': `
// good
<div className='hello'>Hello</div>

// bad
<div className="hello">Hello</div>
  `,
  'prefer-double': `
// good
<div className="hello">Hello</div>

// bad
<div className='hello'>Hello</div>
  `,
};
