import React from 'react';
import ReactToolTip from 'react-tooltip';
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * Icon component
 * @param {object} props
 * @return {React} react element
 */
const Icon = props => (
  <div
    className={
      classnames(
        'icon-wrapper',
        props.parentClass,
        props.active,
        props.pointer && 'pointer'
      )}
    onClick={() => {
      ReactToolTip.hide();
      props.handleClick();
    }}
    onMouseEnter={props.onMouseEnter}
    role="button"
    tabIndex="0"
  >
    <i
      className={classnames('icon', props.iconClass, props.className)}
      data-toggle={props.dataToggle}
      data-target={props.dataTarget}
      data-for={props.toolTipId}
      data-tip={props.tip}
    >
      <span>{props.children}</span>
    </i>
    {
      props.toolTip &&
      <ReactToolTip
        id={props.toolTipId}
        type={props.toolTipType}
        effect="solid"
        place={props.toolTipPlace}
      />
    }
  </div>
);

Icon.defaultProps = {
  active: '',
  className: '',
  dataTarget: '',
  dataToggle: '',
  iconClass: '',
  parentClass: '',
  handleClick: () => {},
  children: null,
  pointer: false,
  onMouseEnter: () => {},
  toolTipType: 'dark',
  tip: 'hello',
  toolTipId: '',
  toolTip: false,
  toolTipPlace: 'bottom'
};

Icon.propTypes = {
  active: PropTypes.string,
  className: PropTypes.string,
  dataTarget: PropTypes.string,
  dataToggle: PropTypes.string,
  iconClass: PropTypes.string,
  parentClass: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.node,
  pointer: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  toolTip: PropTypes.bool,
  tip: PropTypes.string,
  toolTipType: PropTypes.string,
  toolTipId: PropTypes.string,
  toolTipPlace: PropTypes.string
};
export default Icon;
