import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


const Modal = (props) => {
  const {
    children,
    id,
    leftBtnText,
    rightBtnText,
    center,
    left,
    right,
    title,
    footer,
    closeBtnClicked,
    onContinueClicked,
    loading,
    operationCompleted,
  } = props;
  return (
    <div
      className="modal fade"
      id="modal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
      data-backdrop="false"
      data-show="true"
    >
      <div className="modal-dialog" role="document" >
        <div className="modal-content col-xs-12 col-sm-12 col-md-8 col-lg-5">
          <div className="modal-header">
            <h5
              className="modal-title text-capitalize display-4"
              id={`${id}Label`}
            >
              {title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={closeBtnClicked}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          {footer &&
            <div
              className={
                classnames(
                  'modal-footer',
                  center && 'modal-footer-center',
                  right && 'modal-footer-right',
                  left && ' modal-footer-left'
                )
              }
            >
              <button
                type="button"
                className="btn btn-secondary btn-lg text-capitalize"
                data-dismiss="modal"
                disabled={loading}
                onClick={closeBtnClicked}
              >{leftBtnText || 'Cancel'}
              </button>
              <button
                type="button"
                className="btn btn-primary btn-lg text-capitalize"
                onClick={
                  !operationCompleted ?
                    onContinueClicked :
                    () => {}
                }
                disabled={loading}
                data-dismiss={operationCompleted && 'modal'}
              >
                {(loading && 'Loading...') || (rightBtnText || 'Continue')}
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  leftBtnText: '',
  rightBtnText: '',
  center: false,
  left: false,
  right: false,
  footer: false,
  closeBtnClicked: () => {},
  onContinueClicked: () => {},
  loading: false,
  operationCompleted: false,
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  leftBtnText: PropTypes.string,
  rightBtnText: PropTypes.string,
  center: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
  title: PropTypes.string.isRequired,
  footer: PropTypes.bool,
  closeBtnClicked: PropTypes.func,
  onContinueClicked: PropTypes.func,
  loading: PropTypes.bool,
  operationCompleted: PropTypes.bool,
};

export default Modal;
