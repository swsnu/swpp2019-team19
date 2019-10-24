import React from 'react';
import BoardDetail from './BoardDetail'
import { shallow } from 'enzyme';

describe('<BoardDetail />', () => {
  it('renders', () => {
    const wrapper = shallow(<BoardDetail />);
    const component = wrapper.find('.test');
    expect(wrapper.length).toBe(1)
  });
});
