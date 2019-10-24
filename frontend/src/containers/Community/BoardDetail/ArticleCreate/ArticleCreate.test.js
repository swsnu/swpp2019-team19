import React from 'react';
import ArticleCreate from './ArticleCreate'
import { shallow } from 'enzyme';

describe('<ArticleCreate />', () => {
  it('renders', () => {
    const wrapper = shallow(<ArticleCreate />);
    const component = wrapper.find('.test');
    expect(wrapper.length).toBe(1)
  });
});
