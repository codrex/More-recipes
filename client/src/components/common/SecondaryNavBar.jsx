import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SearchBox from './SearchBox';

/**
 * SecondaryNavBar component
 * @param {object} props
 * @return {React} react element
 */
const SecondaryNavBar = (props) => {
  const {
    className,
    handleSubmit,
    handleChange,
    initialSearchTerm
  } = props;
  return (
    <div className={classnames('col-12 top-bar', className)} id="topbar">
      <div className="top-bar-top flex">
        <SearchBox
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          initialSearchTerm={initialSearchTerm}
        />
      </div>
    </div>
  );
};


SecondaryNavBar.defaultProps = {
  handleSubmit: () => {},
  handleChange: () => {},
  className: '',
  initialSearchTerm: ''
};

SecondaryNavBar.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  className: PropTypes.string,
  initialSearchTerm: PropTypes.string,
};

export default SecondaryNavBar;
