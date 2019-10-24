import React from 'react';
import Chat from './Chat'
import { shallow } from 'enzyme';

describe('<Chat />', () => {
  it('renders', () => {
    const wrapper = shallow(<Chat />);
    const component = wrapper.find('.test');
    expect(wrapper.length).toBe(1)
  });
});
