const serverError = res => {
  res.status(500).send({
    status: 'fail',
    error: 'Server encountered an error',
  });
  res.end();
};
const sendSuccess = (res, code, key = 'message', value) => {
  res.status(code).send({
    status: 'success',
    [key]: value,
  });
  res.end();
};
const sendFail = (res, code, msg) => {
  res.status(code).send({
    status: 'fail',
    error: msg,
  });
  res.end();
};
const sendValidationError = (res, validation) => {
  res.status(400).send({
    status: 'fail',
    error: validation.error,
  });
};
module.exports = {
  sendFail,
  sendSuccess,
  serverError,
  sendValidationError,
}
;
