import React from 'react';
import ArticleEdit from './ArticleEdit'
import { shallow } from 'enzyme';

describe('<ArticleEdit />', () => {
  it('renders', () => {
    const wrapper = shallow(<ArticleEdit />);
    const component = wrapper.find('.test');
    expect(wrapper.length).toBe(1)
  });
});
