import { validateVote, validationHandler } from '../../validators/validator';

const voteValidation = (req, res, next) => {
  const { up, down } = req.query;
  const data = {
    vote: up || down,
    id: req.params.id,
  };
  validationHandler(data, validateVote, req, res, next);
};

export default voteValidation;
