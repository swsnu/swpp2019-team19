import React from 'react';
import { shallow } from 'enzyme';
import About from './About';

describe('<About />', () => {
  it('renders', () => {
    const wrapper = shallow(<About />);
    const component = wrapper.find('.test');
    expect(component.length).toBe(1);
  });
});
