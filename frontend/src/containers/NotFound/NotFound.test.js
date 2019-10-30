import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './NotFound';

describe('<NotFound />', () => {
  it('renders', () => {
    const wrapper = shallow(<NotFound />);
    const component = wrapper.find('.test');
    expect(component.length).toBe(1);
  });
});
