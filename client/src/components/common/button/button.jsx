import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Button = (props) => {
  const {
    Tag,
    handleClick,
    dataTarget,
    dataToggle,
    href,
    type
  } = props;
  return (
    <Tag
      type={type}
      className={classnames('btn', props.className)}
      data-dismiss="modal"
      data-toggle={dataToggle}
      data-target={dataTarget}
      onClick={handleClick}
      href={href}
    >
      {props.text}
      {props.children}
    </Tag>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  dataToggle: PropTypes.string,
  dataTarget: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.node,
  Tag: PropTypes.string,
  href: PropTypes.string
};
Button.defaultProps = {
  type: 'button',
  text: '',
  className: '',
  dataToggle: '',
  dataTarget: '',
  handleClick: () => {},
  children: null,
  Tag: 'button',
  href: ''
};

export default Button;
