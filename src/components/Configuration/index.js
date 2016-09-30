import React from 'react';
import classNames from 'classnames';
import { isObject } from 'lodash';
import './style.css';

export default function Configuration({ configuration, className, onClick, popularity }) {
  const classes = classNames('configuration', className);

  return (
    <button onClick={onClick} className={classes}>
      { isObject(configuration) ? JSON.stringify(configuration) : configuration }
      <div>
        <span className="configuration__popularity">
          {Math.round(popularity)}%
        </span>
      </div>
    </button>
  );
}
