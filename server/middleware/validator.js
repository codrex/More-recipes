import { sendValidationError } from '../reply/reply';


export const validateSignupData = (req, res, next, func) => {
  const validate = func(data);
  if (validate.valid) {
    req.body = data;
    next();
  } else {
    console.log(validate.error);
    sendValidationError(res, validate);
  }
};
