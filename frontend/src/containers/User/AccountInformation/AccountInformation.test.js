import React from 'react';
import AccountInformation from './AccountInformation'
import { shallow } from 'enzyme';

describe('<AccountInformation />', () => {
  it('renders', () => {
    const wrapper = shallow(<AccountInformation />);
    const component = wrapper.find('.test');
    expect(wrapper.length).toBe(1)
  });
});
