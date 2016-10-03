import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { find } from 'lodash';
import cssModules from 'react-css-modules';
import { Link } from 'react-router';
import Rule from 'components/Rule';
import { saveConfiguration, getRules } from 'ducks/rules';

import styles from './style.scss';

const RuleView = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentDidMount() {
    this.props.dispatch(getRules());
  },
  getVisibleRule() {
    if (!this.props.params.name) {
      return this.props.rules[0];
    }

    return find(this.props.rules, {
      name: this.props.params.name
    });
  },
  setRuleConfiguration(configuration) {
    const visibleRule = this.getVisibleRule();

    this.props.dispatch(
      saveConfiguration(visibleRule, configuration)
    );

    this.nextRule();
  },
  nextRule() {
    const { rules } = this.props;
    const { router } = this.context;
    const currentIndex = rules.indexOf(this.getVisibleRule());

    if (currentIndex === rules.length - 1) {
      router.push(`/rules/${encodeURIComponent(rules[0].name)}`);
    } else {
      router.push(`/rules/${encodeURIComponent(rules[currentIndex + 1].name)}`);
    }
  },
  render() {
    const visibleRule = this.getVisibleRule();

    return (
      <div styleName="view">
        <div styleName="sidebar">
          <ul styleName="rules">
            {
              this.props.rules.map((rule) => {
                const isSelected = rule === this.getVisibleRule();

                const styleName = classNames({
                  rule: !isSelected,
                  'rule--selected': isSelected,
                });

                return (
                  <li key={rule.name}>
                    <Link styleName={styleName} to={`/rules/${rule.name}`}>
                      {rule.name}
                    </Link>
                  </li>
                );
              })
            }
          </ul>
        </div>
        <div styleName="content">
          <div styleName="rule-wrapper">
            {
              visibleRule && (
                <Rule
                  rule={visibleRule}
                  configurations={visibleRule.configurations}
                  onConfigurationSelected={this.setRuleConfiguration}
                />
              )
            }
          </div>
        </div>
      </div>
    );
  },
});

function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    rules: state.rules.rules,
    configurations: state.rules.configurations,
  };
}

export default connect(mapStateToProps)(cssModules(RuleView, styles));
