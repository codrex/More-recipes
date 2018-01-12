import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * AccordionBody component
 * @param {object} props
 * @return {React} react element
 */
const AccordionBody = props => (
  <div
    id={`item${props.index}`}
    className="collapse w-100"
    role="tabpanel"
    data-parent={`#${props.id}`}
  >
    <div className={classnames(props.className, 'card-body accordion-text')}>
      {props.children}
    </div>
  </div>
);

AccordionBody.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  index: PropTypes.number,
  className: PropTypes.string
};
AccordionBody.defaultProps = {
  id: 0,
  children: null,
  index: 0,
  className: ''
};

export default AccordionBody;
