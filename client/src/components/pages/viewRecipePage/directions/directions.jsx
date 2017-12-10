import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionHeader,
  AccordionBody
} from '../../../common/accordion/accordion';
import Icon from '../../../common/icon/icon';

const Direction = props => (
  <Accordion
    index={props.index}
    id={`Step ${props.index}`}
    className="d-flex align-items-start flex-column"
  >
    <AccordionHeader
      index={props.index}
      id={`Step ${props.index}`}
      title={`Step ${props.index + 1}`}
      className=" d-flex no-margin w-100"
    >
      <a
        href={`#item${props.index}`}
        data-toggle="collapse"
        aria-expanded="false"
        className="collapsed collapse-trigger a bold"
      >
        <Icon iconClass="fa fa-angle-down" />
      </a>
    </AccordionHeader>
    <AccordionBody
      id={`Step ${props.index}`}
      index={props.index}
    >
      <p className="no-margin">{props.content}</p>
    </AccordionBody>
  </Accordion>
);

Direction.propTypes = {
  index: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired
};

const Directions = (props) => {
  const directions = props.directions || [];
  return (
    <div className="col-12">
      {directions.map((item, i) =>
        (<Direction
          key={i}
          content={item}
          index={i}
        />)
      )}
    </div>
  );
};

Directions.propTypes = {
  directions: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Directions;
