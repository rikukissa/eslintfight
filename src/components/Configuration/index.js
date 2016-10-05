import React from 'react';
import cssModules from 'react-css-modules';
import CodeExample from 'components/CodeExample';
import getExample from 'examples';
import styles from './style.scss';

function Configuration({
  configurationValue,
  onClick,
  rule,
  children,
  className,
  mostPopular,
}) {
  const example = getExample(rule, configurationValue);
  return ( // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onClick={onClick} className={className} styleName="configuration">
      <div styleName="header">
        {children || configurationValue.toString()}
        {
          mostPopular && (
            <div styleName="tag">
              <i className="fa fa-star" />&nbsp;
              Popular
            </div>
          )
        }
      </div>
      {
        example && (
          <div styleName="code">
            <CodeExample rule={rule} configurationValue={configurationValue}>
              {example}
            </CodeExample>
          </div>
        )
      }
    </div>
  );
}

export default cssModules(Configuration, styles, {
  allowMultiple: true,
});
