import React from 'react';
import { shallow } from 'enzyme';
import ArticleCreate from './ArticleCreate';

describe('<ArticleCreate />', () => {
  it('renders', () => {
    const wrapper = shallow(<ArticleCreate />);
    const component = wrapper.find('.test');
    expect(component.length).toBe(1);
  });
});
