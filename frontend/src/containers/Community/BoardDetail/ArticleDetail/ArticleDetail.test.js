import React from 'react';
import ArticleDetail from './ArticleDetail'
import { shallow } from 'enzyme';

describe('<ArticleDetail />', () => {
  it('renders', () => {
    const wrapper = shallow(<ArticleDetail />);
    const component = wrapper.find('.test');
    expect(wrapper.length).toBe(1)
  });
});
