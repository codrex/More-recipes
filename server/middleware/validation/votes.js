import { validateVote, validationHandler } from '../../utils/validators/validator';

/**
 * @name voteValidation
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
const voteValidation = (req, res, next) => {
  const { up, down } = req.query;
  const data = {
    vote: up || down,
    id: req.params.id,
  };
  validationHandler(data, validateVote, req, res, next);
};

export default voteValidation;
