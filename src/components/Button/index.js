import React from 'react';
import classNames from 'classnames';

import './style.css';

export default function Button(props) {
  const { className, children } = props;
  const classes = classNames('button', className);
  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}
