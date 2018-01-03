/**
 * @return {string} result
 * @param {string} value
 */
const getInitials = (value) => {
  if (typeof value === 'string') {
    if (value.split(' ').length > 1) {
      return `${value.split(' ')[0][0]}${value.split(' ')[1][0]}`.toUpperCase();
    }
    return value.slice(0, 1).toUpperCase();
  }
  return '';
};

export default getInitials;
