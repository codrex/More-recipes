import {
  validateReview,
  validationHandler
} from '../../utils/validators';

/**
 * @name reviewValidation
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
const reviewValidation = (req, res, next) => {
  const { review } = req.body;
  validationHandler({ review }, validateReview, req, res, next);
};

export default reviewValidation;
