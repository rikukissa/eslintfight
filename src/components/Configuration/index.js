import React from 'react';
import classNames from 'classnames';
import { isObject } from 'lodash';
import './style.css';

function toString(configuration) {
  return isObject(configuration) ? (
    <pre>
      {JSON.stringify(configuration, null, 2)}
    </pre>
  ) : configuration;
}

export default function Configuration({ children, configuration, className, onClick, popularity }) {

  const classes = classNames('configuration', className, {
    'configuration--object': isObject(configuration),
  });

  return (
    <button onClick={onClick} className={classes}>
      <span className="configuration__popularity">
        {Math.round(popularity * 100)}%
      </span>
      { children || toString(configuration) }
    </button>
  );
}
