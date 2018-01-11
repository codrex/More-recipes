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
  } = props;
  return (
    <div className={classnames('col-12 top-bar', className)} id="topbar">
      <div className="top-bar-top flex">
        <SearchBox
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};


SecondaryNavBar.defaultProps = {
  handleSubmit: () => {},
  handleChange: () => {},
  className: '',
};

SecondaryNavBar.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  className: PropTypes.string,
};

export default SecondaryNavBar;
