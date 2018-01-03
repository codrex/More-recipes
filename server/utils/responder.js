/**
 * @return {undefined}
 * @param {object} res
 */
const sendServerError = (res) => {
  res.status(500).send({
    status: 'fail',
    error: 'Server encountered an error',
  });
  res.end();
};

/**
 * @return {undefined}
 * @param {object} res
 * @param {number} code - status code
 * @param {string} key
 * @param {sting|object} value
 */
const sendSuccess = (res, code, key = 'message', value) => {
  res.status(code).send({
    status: 'success',
    [key]: value,
  });
  res.end();
};

/**
 * @return {undefined}
 * @param {object} res
 * @param {number} code - status code
 * @param {string} message
 */
const sendFail = (res, code, message) => {
  res.status(code).send({
    status: 'fail',
    error: message,
  });
  res.end();
};

/**
 * @return {undefined}
 * @param {object} res
 * @param {object} validation
 */
const sendValidationError = (res, validation) => {
  res.status(400).send({
    status: 'fail',
    error: validation.error,
  });
};

/**
 * @return {undefined}
 * @param {string} dataName
 * @param {object} data
 * @param {object} res
 * @param {number} code
 */
const sendPaginatedData = (dataName, data, res, code = 200) => {
  const { count, limit, rows } = data;
  res.status(code).send({
    status: 'success',
    pageCount: Math.ceil(count / limit),
    [dataName]: rows
  });
};

export {
  sendFail,
  sendSuccess,
  sendServerError,
  sendValidationError,
  sendPaginatedData
};
