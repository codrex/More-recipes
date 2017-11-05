import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ClipLoader } from 'react-spinners';

const Loader = (props) => (
  <div className={classnames('loader', !props.loading && 'hide')}>
    <ClipLoader
      color={'#2c3e50'}
      loading={props.loading}
      size={30}
    />
    <h1 className="display-4">Loading...</h1>
  </div>
);

Loader.propTypes = {
  loading: PropTypes.bool
};
export default Loader;
