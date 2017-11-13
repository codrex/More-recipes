export const getPageCount = (length, OFFSET) => {
  let page = 0;
  if (typeof length === 'number' && typeof OFFSET === 'number') {
    const floor = Math.floor(length / OFFSET);
    const round = Math.round(length / OFFSET);
    if (floor <= round) {
      page = floor;
      page += length % OFFSET < 5 && length % OFFSET > 0 ? 1 : 0;
    } else {
      page = round;
    }
  }
  return page;
};

export const getCurrentPage = (items, currentPos, OFFSET) =>
items.slice((currentPos * OFFSET) - OFFSET, currentPos * OFFSET);

