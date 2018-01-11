import React from 'react';
import toJson from 'enzyme-to-json';
import RecipeEditor from '../../../components/pages/RecipeEditor';

const props = {
  loading: false,
  hasRender: true,
  submitButtonText: 'post',
  handleButtonClick: jest.fn(),
  hasNotFound: false,
};

describe('Recipe editor component ', () => {
  test('render as expected when component is mounted', () => {
    const component = shallow(
      <RecipeEditor {...props} />
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
  test('expected to match snapshot when recipe was not found', () => {
    const component = shallow(
      <RecipeEditor {...{ ...props, hasNotFound: true }} />
    );
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
