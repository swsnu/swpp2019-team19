import React from 'react';
import { shallow } from 'enzyme';
import CommunityMain from './CommunityMain';

describe('<CommunityMain />', () => {
  it('renders', () => {
    const wrapper = shallow(<CommunityMain />);
    const component = wrapper.find('.test');
    expect(component.length).toBe(1);
  });
});
