import React from 'react';
import Highlight from 'react-highlight';
import cssModules from 'react-css-modules';
import styles from './style.scss';

function CodeExample({ children }) {
  return (
    <div styleName="code">
      <Highlight className="javascript">
        {children}
      </Highlight>
    </div>
  );
}

export default cssModules(CodeExample, styles);
