import imageParser from '../imageParser';

describe('untest test: image parser', () => {
  test('it should return an image object when for valid image input', () => {
    const image = {
      url: 'www.127.0.0.1',
    }
    expect(imageParser(JSON.stringify(image))).toEqual(image);
  });
  test('it should return an empty object when an empty string is passed', () => {
    expect(imageParser('')).toEqual({});
  });
  test('it should return an empty object when a string is passed', () => {
    expect(imageParser('none')).toEqual({});
  });
  test('it should return an empty object when an array is passed', () => {
    expect(imageParser(["2","2"])).toEqual({});
  });
  test('it should return an empty object when a number is passed', () => {
    expect(imageParser(1)).toEqual({});
  });
});
