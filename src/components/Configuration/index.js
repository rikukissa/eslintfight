import React from 'react';
import classNames from 'classnames';
import { isObject } from 'lodash';
import './style.css';

function toString(configuration) {
  return isObject(configuration) ?
    JSON.stringify(configuration) :
    configuration;
}

export default function Configuration({ children, configuration, className, onClick, popularity }) {
  const classes = classNames('configuration', className);

  return (
    <button onClick={onClick} className={classes}>
      { children || toString(configuration) }
      <div>
        <span className="configuration__popularity">
          {Math.round(popularity)}%
        </span>
      </div>
    </button>
  );
}
