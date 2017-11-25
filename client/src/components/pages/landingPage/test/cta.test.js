import React from 'react';
import toJson from 'enzyme-to-json';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../../../../store/configStore';
import  Cta  from '../cta/cta';

const props = {
  push: jest.fn(),
  signin: jest.fn(),
  signup: jest.fn(),
};

describe('Cta form component ', () => {
  test('expect to match snapshot when signin button is clicked', () => {
    const component = mount(<Cta {...props} />);
    const tree = toJson(component);
    component.find('#login').simulate('click')
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
  test('expect to match snapshot when signup button is clicked', () => {
    const component = mount(<Cta {...props} />);
    const tree = toJson(component);
    component.find('#signup').simulate('click')
    expect(tree).toMatchSnapshot();
    expect(tree).toBeInstanceOf(Object);
  });
});
