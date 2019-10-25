import React from 'react';
import { shallow } from 'enzyme';
import ArticleDetail from './ArticleDetail';

describe('<ArticleDetail />', () => {
  it('renders', () => {
    const wrapper = shallow(<ArticleDetail />);
    const component = wrapper.find('.ArticleDetail');
    expect(component.length).toBe(1);
  });
});
