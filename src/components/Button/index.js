import React from 'react';
import cssModules from 'react-css-modules';
import { omit } from 'lodash';
import styles from './style.scss';

function Button(props) {
  const { className, children } = props;
  return (
    <button {...omit(props, 'styles')} styleName="button" className={className}>
      {children}
    </button>
  );
}

export default cssModules(Button, styles);
