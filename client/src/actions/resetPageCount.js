import { RESET_PAGE_COUNT } from './actions';

/**
 * reset pageCount to 0
 * @return {object} action
 */
const resetPageCount = () => ({
  type: RESET_PAGE_COUNT
});

export default resetPageCount;
