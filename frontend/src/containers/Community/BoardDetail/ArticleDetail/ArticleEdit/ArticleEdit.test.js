import React from 'react';
import { shallow } from 'enzyme';
import ArticleEdit from './ArticleEdit';

describe('<ArticleEdit />', () => {
  it('renders', () => {
    const wrapper = shallow(<ArticleEdit />);
    const component = wrapper.find('.test');
    expect(component.length).toBe(1);
  });
});
