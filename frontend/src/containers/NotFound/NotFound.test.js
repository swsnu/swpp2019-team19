import React from 'react';
import NotFound from './NotFound'
import { shallow } from 'enzyme';

describe('<NotFound />', () => {
  it('renders', () => {
    const wrapper = shallow(<NotFound />);
    const component = wrapper.find('.test');
    expect(wrapper.length).toBe(1)
  });
});
