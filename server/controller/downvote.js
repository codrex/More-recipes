import db from '../models/index';
import { validateVote } from '../validators/validator.js';
import { sendValidationError, serverError } from '../reply/reply';

const DownVotes = db.DownVotes;

export const validateUpVote = (req, res, next) => {
  const validate = validateVote({ review: req.body.review });
  if (validate.valid) {
    next();
  } else {
    sendValidationError(res, validate);
  }
};
export const createUpVote = (req, res, next) => {
  DownVotes.findOrCreate()
    .then(review => {
      req.reviewId = review.dataValues.id;
      next();
    }).catch((error) => {
      serverError(res, error);
    });
};
