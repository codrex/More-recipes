import {
  validateReview,
  validationHandler
} from '../../validators/validator';

const reviewValidation = (req, res, next) => {
  const { review } = req.body;
  validationHandler({ review }, validateReview, req, res, next);
};

export default reviewValidation;
