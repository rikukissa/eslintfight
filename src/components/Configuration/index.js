import React from 'react';
import classNames from 'classnames';
import { isObject } from 'lodash';
import './style.css';

export default function Configuration({ configuration, className, onClick, popularity }) {
  const classN = classNames('configuration', className);

  return (
    <button onClick={onClick} className={classN}>
      { isObject(configuration) ? JSON.stringify(configuration) : configuration }
      <div>
        <span className="configuration__popularity">
          {Math.round(popularity)}%
        </span>
      </div>
    </button>
  );
}
