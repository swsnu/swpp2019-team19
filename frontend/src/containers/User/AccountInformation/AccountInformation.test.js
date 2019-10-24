import React from 'react';
import { shallow } from 'enzyme';
import AccountInformation from './AccountInformation';

describe('<AccountInformation />', () => {
  it('renders', () => {
    const wrapper = shallow(<AccountInformation />);
    const component = wrapper.find('.test');
    expect(component.length).toBe(1);
  });
});
