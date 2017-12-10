import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ListItem } from '../list/list';

export const Accordion = props => (
  <ListItem className={classnames(props.className, 'accordion')}>
    {props.children}
  </ListItem>
);

Accordion.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  className: PropTypes.string
};
Accordion.defaultProps = {
  className: ''
};

export const AccordionHeader = props => (
  <div
    className={classnames(props.className)}
    role="tab"
    id={`accordion${props.index}`}
  >
    <h4 className="mb-0 lead flex-auto ellipsis" style={{ margin: '.2rem' }}>
      <a
        className="collapsed collapse-trigger a"
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

export const AccordionBody = props => (
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
