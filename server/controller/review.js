import db from '../models/index';
import { validateReview } from '../validators/validator';
import { sendValidationError, serverError } from '../reply/reply';

const RecipeReviews = db.RecipeReviews;

export const reviewValidation = (req, res, next) => {
  const validate = validateReview({ review: req.body.review });
  if (validate.valid) {
    next();
  } else {
    sendValidationError(res, validate);
  }
};
export const createReview = (req, res, next) => {
  RecipeReviews.create({ review: req.body.review, ReviewerId: req.requestId })
    .then((review) => {
      req.reviewId = review.dataValues.id;
      next();
    }).catch(() => {
      serverError(res);
    });
};
