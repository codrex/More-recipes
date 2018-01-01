import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionHeader,
  AccordionBody
} from '../../../common/accordion';

/**
 * @name Direction
 * @return {React} jsx
 */
class Direction extends React.Component {
  state = {
    open: false
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  }

  /**
   * @param {object} props
   * @return {React} Direction component
   */
  render() {
    const {
      index,
      content
    } = this.props;
    return (
      <Accordion
        index={index}
        id={`Step ${index}`}
        className="d-flex align-items-start flex-column col-12 no-box-shadow"
      >
        <AccordionHeader
          index={index}
          id={`Step ${index}`}
          title={`Step ${index + 1}`}
          className=" d-flex no-margin w-100"
        >
          <a
            href={`#item${index}`}
            data-toggle="collapse"
            aria-expanded="false"
            type=""
            className="collapsed collapse-trigger a btn btn-secondary-outline"
            onClick={this.toggleOpen}
          >
            {this.state.open ? 'Hide' : 'Show'}
          </a>
        </AccordionHeader>
        <AccordionBody
          id={`Step ${index}`}
          index={index}
        >
          <p className="no-margin">{content}</p>
        </AccordionBody>
      </Accordion>
    );
  }
}

Direction.propTypes = {
  index: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired
};

export default Direction;
