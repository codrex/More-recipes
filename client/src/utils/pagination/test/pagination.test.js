import { getCurrentPage, getPageCount } from '../pagination';

describe('untest test: Pagination.js', () => {
  describe('get current page function', () => {
    test('should return [1, 2, 3, 3]', () => {
      const result = getCurrentPage([1, 2, 3, 3, 4, 5, 6, 6], 1, 4);
      expect(result).toEqual([1, 2, 3, 3]);
    });
    test('should return [4, 5, 6, 6]', () => {
      const result = getCurrentPage([1, 2, 3, 3, 4, 5, 6, 6], 2, 4);
      expect(result).toEqual([4, 5, 6, 6]);
    });
    test('should return [6, 6]', () => {
      const result = getCurrentPage([1, 2, 3, 3, 4, 5, 6, 6], 4, 2);
      expect(result).toEqual([6, 6]);
    });
  });
  describe('get page count function', () => {
    test('should return 3', () => {
      const result = getPageCount(10, 4);
      expect(result).toEqual(3);
    });
    test('should return 1', () => {
      const result = getPageCount(4, 5);
      expect(result).toEqual(1);
    });
    test('should return 1', () => {
      const result = getPageCount(5, 5);
      expect(result).toEqual(1);
    });
    test('should return 0', () => {
      const result = getPageCount('string', 4);
      expect(result).toEqual(0);
    });
    test('should return ', () => {
      const result = getPageCount(10, '');
      expect(result).toEqual(0);
    });
  });
});
