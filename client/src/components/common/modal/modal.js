import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './modal.scss';

const Modal = (props) => (
  <div
    className="modal fade"
    id="modal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby={`${props.id}Label`}
    aria-hidden="true"
  >
    <div className="modal-header">
      <h5
        className="modal-title text-capitalize display-4 text-white"
        id={`${props.id}Label`}
      >
        {props.title}
      </h5>
      <button
        type="button"
        className="close"
        data-dismiss="modal"
        aria-label="Close"
        onClick={props.closeBtnClicked}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="modal-dialog" role="document">
      <div className="modal-content col-xs-12 col-sm-12 col-md-8 col-lg-8">

        <div className="modal-body">
          {props.children}
        </div>
        {props.footer &&
          <div
            className={classnames('modal-footer',
                        props.center && 'modal-footer-center',
                        props.right && 'modal-footer-right',
                        props.left && ' modal-footer-left')}
          >
            <button
              type="button"
              className="btn btn-primary btn-lg text-white text-capitalize" data-dismiss="modal"
            >{props.leftBtnText || 'Cancel'}
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-lg text-white text-capitalize"
            >
              {props.rightBtnText || 'Continue'}
            </button>
          </div>
      }
      </div>
    </div>
  </div>
  );

Modal.propTypes = {
  children: PropTypes.any,
  id: PropTypes.string.isRequired,
  leftBtnText: PropTypes.string,
  rightBtnText: PropTypes.string,
  center: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
  title: PropTypes.string.isRequired,
  footer: PropTypes.bool,
  closeBtnClicked: PropTypes.func,
};

export default Modal;
