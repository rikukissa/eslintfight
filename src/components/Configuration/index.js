import React from 'react';
import classNames from 'classnames';
import { isObject, map } from 'lodash';
import cssModules from 'react-css-modules';
import Button from 'components/Button';
import { isDisabled } from 'utils/configuration';
import styles from './style.scss';

function toString(configurationValue) {
  return isObject(configurationValue) ? (
    <table styleName="table">
      <thead>
        <tr>
          {Object.keys(configurationValue).map((key) => <th key={key}>{key}</th>)}
        </tr>
      </thead>
      <tbody>
        <tr>
          {map(configurationValue, (value, key) => <td key={key + value}>{toString(value)}</td>)}
        </tr>
      </tbody>
    </table>
  ) : configurationValue.toString();
}

function Configuration({
  children,
  secondary,
  configurationValue,
  className,
  onClick,
  popularity,
}) {
  const object = isObject(configurationValue);
  const disabled = isDisabled([configurationValue]);

  const styleName = classNames({
    'configuration--object': object,
    'configuration--secondary': secondary,
    'configuration--disabled': disabled,
  }) || 'configuration';

  return (
    <Button onClick={onClick} styleName={styleName} className={className}>
      <span styleName="configuration__popularity">
        {Math.round(popularity * 100)}%
      </span>
      { children || toString(configurationValue) }
    </Button>
  );
}

export default cssModules(Configuration, styles, {
  allowMultiple: true,
});
