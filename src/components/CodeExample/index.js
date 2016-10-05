import React from 'react';
import Highlight from 'react-highlight';
import cssModules from 'react-css-modules';
import getExample from 'examples';
import styles from './style.scss';

function CodeExample({
  rule,
  configurationValue,
}) {
  return (
    <div styleName="code">
      <Highlight className="javascript">
        {getExample(rule, configurationValue)}
      </Highlight>
    </div>
  );
}

export default cssModules(CodeExample, styles);
