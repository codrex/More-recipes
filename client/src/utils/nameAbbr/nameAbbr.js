const nameAbbr = (fullname) => {
  if (typeof fullname === 'string') {
    if (fullname.split(' ').length > 1) {
      return `${fullname.split(' ')[0][0]}${fullname.split(' ')[1][0]}`.toUpperCase();
    }
    return fullname.slice(0, 2);
  }
  return '';
};

export default nameAbbr;
