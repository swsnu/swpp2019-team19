import React from 'react';
import { shallow } from 'enzyme';
import Signup from './Signup';

describe('<Signup />', () => {
  it('renders', () => {
    const wrapper = shallow(<Signup />);
    const component = wrapper.find('.test');
    expect(component.length).toBe(1);
  });
});
