import React from 'react';
import { shallow } from 'enzyme';
import BoardDetail from './BoardDetail';

describe('<BoardDetail />', () => {
  it('renders', () => {
    const wrapper = shallow(<BoardDetail />);
    const component = wrapper.find('.test');
    expect(component.length).toBe(1);
  });
});
