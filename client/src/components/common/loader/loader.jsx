import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { GridLoader } from 'react-spinners';
import './loader.scss';

const Loader = (props) => (
  <div className={classnames('loader', !props.loading && 'hide')}>
    <GridLoader
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
