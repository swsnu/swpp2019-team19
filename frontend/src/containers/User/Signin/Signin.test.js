import React from 'react';
import Signin from './Signin'
import { shallow } from 'enzyme';

describe('<Signin />', () => {
  it('renders', () => {
    const wrapper = shallow(<Signin />);
    const component = wrapper.find('.test');
    expect(wrapper.length).toBe(1)
  });
});
