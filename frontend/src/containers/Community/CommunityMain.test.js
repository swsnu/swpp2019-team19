import React from 'react';
import CommunityMain from './CommunityMain'
import { shallow } from 'enzyme';

describe('<CommunityMain />', () => {
  it('renders', () => {
    const wrapper = shallow(<CommunityMain />);
    const component = wrapper.find('.test');
    expect(wrapper.length).toBe(1)
  });
});
