import React from 'react';
import { shallow } from 'enzyme';
import IncomingMessage from './IncomingMessage';

describe('<IncomingMessage />', () => {
  it('renders IncomingMessage', () => {
    const component = shallow(<IncomingMessage />);
    const wrapper = component.find('.incoming_msg');
    expect(wrapper.length).toBe(1);
  });
});
