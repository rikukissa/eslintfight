import React from 'react';
import classNames from 'classnames';
import { isObject, map } from 'lodash';
import Button from '../Button';
import './style.css';

function toString(configuration) {
  return isObject(configuration) ? (
    <table className="configuration--object__table">
      <thead>
        <tr>
          {Object.keys(configuration).map((key) => <th key={key}>{key}</th>)}
        </tr>
      </thead>
      <tbody>
        <tr>
          {map(configuration, (value, key) => <td key={key + value}>{value}</td>)}
        </tr>
      </tbody>
    </table>
  ) : configuration;
}

export default function Configuration({ children, configuration, className, onClick, popularity }) {
  const classes = classNames('configuration', className, {
    'configuration--object': isObject(configuration),
  });

  return (
    <Button onClick={onClick} className={classes}>
      <span className="configuration__popularity">
        {Math.round(popularity * 100)}%
      </span>
      { children || toString(configuration) }
    </Button>
  );
}
