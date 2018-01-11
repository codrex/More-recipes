import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * AccordionHeader component
 * @param {object} props
 * @return {React} react element
 */
const AccordionHeader = props => (
  <div
    className={classnames(props.className)}
    role="tab"
    id={`accordion${props.index}`}
  >
    <h4 className="mb-0 flex-auto ellipsis" style={{ margin: '.1em' }}>
      <a
        className="collapsed collapse-trigger lead a"
        data-toggle="collapse"
        href={`#item${props.index}`}
        aria-expanded="false"
        aria-controls={props.id}
      >
        {props.title}
      </a>
    </h4>
    {props.children}
  </div>
);

AccordionHeader.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  index: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string
};
AccordionHeader.defaultProps = {
  id: 0,
  title: '',
  index: 0,
  children: null,
  className: ''
};

export default AccordionHeader;
