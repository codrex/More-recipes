import getInitials from '../getInitials';

describe('Get initials function test', () => {
  it('should return the "JS" when "java script" is pass in as args', () => {
    expect(getInitials('java script')).toBe('JS');
  });

  it('should return the "A" when "andela" is pass in as args', () => {
    expect(getInitials('andela')).toBe('A');
  });

  it('should return the PA when "peter adams johnson" is pass in as args', () => {
    expect(getInitials('peter adams johnson')).toBe('PA');
  });

  it('should return the an empty string when nothing is passed in', () => {
    expect(getInitials()).toBe('');
  });

  it('should return an empty string then a number is passed in', () => {
    expect(getInitials(1)).toBe('');
  });
});
