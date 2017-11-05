import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, AccordionHeader,
  AccordionBody } from '../../../common/accordion/accordion';
import Icon from '../../../common/icon/icon';

const Direction = (props) => (
  <Accordion
    index={props.index}
    id={`Step ${props.index}`}
  >
    <AccordionHeader
      index={props.index}
      id={`Step ${props.index}`}
      title={`Step ${props.index + 1}`}
      className=" d-flex no-margin"
    >
      <a
        href={`#item${props.index}`}
        data-toggle="collapse"
        aria-expanded="false"
        className="collapsed collapse-trigger a"
      >
        <Icon iconClass="fa fa-angle-down" />
      </a>
    </AccordionHeader>
    <AccordionBody
      id={`Step ${props.index}`}
      index={props.index}
    >
      <p>{props.content}</p>
    </AccordionBody>
  </Accordion>
);

Direction.propTypes = {
  index: PropTypes.number,
  content: PropTypes.string
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
  directions: PropTypes.array,
};
export default Directions;
