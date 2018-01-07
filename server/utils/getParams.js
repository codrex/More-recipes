/**
 * @return {object} parameters
 * @param {object} req
 */
const getParams = (req) => {
  let { limit, page } = req.query;
  limit = parseInt(limit, 10) || 10;
  page = parseInt(page, 10) || 1;
  const offset = (page - 1) * limit;

  return {
    offset,
    limit,
    page
  };
};

export default getParams;
