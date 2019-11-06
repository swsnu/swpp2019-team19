import React from 'react';
import { shallow } from 'enzyme';
import IncomingMessage from './IncomingMessage';

const stubProp = {
  text: 'hi',
};
describe('<IncomingMessage />', () => {
  it('renders IncomingMessage', () => {
    const component = shallow(<IncomingMessage message={stubProp} />);
    const wrapper = component.find('.incoming_msg');
    expect(wrapper.length).toBe(1);
  });
});
