import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PulseLoader } from 'react-spinners';
import './loader.scss';

const Loader = (props) => {
  console.log('jjjjfjfjf', props.loading);
  return (
    <div className={classnames('loader', !props.loading && 'hide')}>
      <PulseLoader
        color={'#ff0'}
        loading={props.loading}
        size={16}
      />
      <h1>Loading...</h1>
    </div>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool
};
export default Loader;
