import React from 'react';
import Sidebar from '../sidebar';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

describe('Sidebar component ', () => {
  test('render as expected without any recipe', () => {
    const component = renderer.create(
      <BrowserRouter>
        <Sidebar user={{}} />
      </BrowserRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
