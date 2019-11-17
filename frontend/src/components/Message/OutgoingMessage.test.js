import React from 'react';
import { shallow } from 'enzyme';
import OutgoingMessage from './OutgoingMessage';

describe('<OutgoingMessage />', () => {
  it('renders OutgoingMessage', () => {
    const component = shallow(<OutgoingMessage message="hi" />);
    const wrapper = component.find('.outgoing_msg');
    expect(wrapper.length).toBe(1);
  });
});
