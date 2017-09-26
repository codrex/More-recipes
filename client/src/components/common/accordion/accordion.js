import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './accordion.scss';

export const Accordion = (props) => {
  return (
    <div className={classnames(props.className, 'card')}>
      {props.children}
    </div>
  );
};

Accordion.propTypes = {
  children: PropTypes.any,
};

export const AccordionHeader = (props) => (
  <div
    className={classnames(props.className, 'card-header')} role="tab" id={`accordion${props.index}`}
  >
    <h5 className="mb-0 lead flex-auto">
      <a
        className="collapsed collapse-trigger a"
        data-toggle="collapse"
        href={`#item${props.index}`}
        aria-expanded="false"
        aria-controls={props.id}
      >
        {props.title}
      </a>
    </h5>
    {props.children}
  </div>
);

AccordionHeader.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  index: PropTypes.number,
  children: PropTypes.any,
};

export const AccordionBody = (props) => {
  return (
    <div
      id={`item${props.index}`}
      className="collapse"
      role="tabpanel"
      data-parent={`#${props.id}`}
    >
      <div className={classnames(props.className, 'card-body')}>
        {props.children}
      </div>
    </div>
  );
};

AccordionBody.propTypes = {
  id: PropTypes.string,
  children: PropTypes.any,
  index: PropTypes.number,
};
