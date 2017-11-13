export const getPageCount = (length, OFFSET) => {
  if (typeof length === 'number' && typeof OFFSET === 'number') {
    return Math.ceil(length / OFFSET);
  }
  return 0;
};

export const getCurrentPage = (items, currentPos, OFFSET) =>
items.slice((currentPos * OFFSET) - OFFSET, currentPos * OFFSET);

