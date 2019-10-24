import React from 'react';
import Signup from './Signup'
import { shallow } from 'enzyme';

describe('<Signup />', () => {
  it('renders', () => {
    const wrapper = shallow(<Signup />);
    const component = wrapper.find('.test');
    expect(wrapper.length).toBe(1)
  });
});
