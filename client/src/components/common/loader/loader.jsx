import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ClipLoader } from 'react-spinners';

const Loader = props => (
  <div className={classnames('loader', !props.loading && 'hide')}>
    <ClipLoader
      color={'#7B4E28'}
      loading={props.loading}
      size={60}
    />
    <h1 className="display-4">Loading...</h1>
  </div>
);

Loader.propTypes = {
  loading: PropTypes.bool.isRequired
};
export default Loader;
