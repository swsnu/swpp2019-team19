import React from 'react';
import About from './About'
import { shallow } from 'enzyme';

describe('<About />', () => {
  it('renders', () => {
    const wrapper = shallow(<About />);
    const component = wrapper.find('.test');
    expect(wrapper.length).toBe(1)
  });
});
