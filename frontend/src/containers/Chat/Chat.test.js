import React from 'react';
import { shallow } from 'enzyme';
import Chat from './Chat';

describe('<Chat />', () => {
  it('renders', () => {
    const component = shallow(<Chat />);
    const wrapper = component.find('.chat');
    expect(wrapper.length).toBe(1);
    const submitButtonWrpper = component.find('.msg_send_btn')
    submitButtonWrpper.simulate('click');
  });
});
