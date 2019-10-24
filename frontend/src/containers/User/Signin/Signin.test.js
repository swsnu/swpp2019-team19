import React from 'react';
import { shallow } from 'enzyme';
import Signin from './Signin';

describe('<Signin />', () => {
  it('renders', () => {
    const wrapper = shallow(<Signin />);
    const component = wrapper.find('.test');
    expect(component.length).toBe(1);
  });
});
