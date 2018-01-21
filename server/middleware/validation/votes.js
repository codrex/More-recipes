import { validateVote, validationHandler } from '../../utils/validators';
import { sendFail } from '../../utils/responder';
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
  if (up && down) {
    sendFail(
      res,
      400,
      'Multiple parameters is not allow. Please send either true or false'
    );
    return;
  }
  const data = {
    vote: up || down,
    id: req.params.id,
  };
  validationHandler(data, validateVote, req, res, next);
};

export default voteValidation;
