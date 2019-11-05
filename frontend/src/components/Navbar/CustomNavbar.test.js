import React from 'react';
import { shallow } from 'enzyme';
import CustomNavbar from './CustomNavbar';

describe('<CustomNavbar />', () => {
  it('renders navbar', () => {
    const component = shallow(<CustomNavbar />);
    const wrapper = component.find('.custom-navbar');
    expect(wrapper.length).toBe(1);
  });
  it('renders sidebar', () => {
    const component = shallow(<CustomNavbar />);
    const sidebarShowWrapper = component.find('.sidebar-show-button');
    sidebarShowWrapper.simulate('click');
    const sidebarwrapper = component.find('#sidebar-wrapper');
    expect(sidebarwrapper.length).toBe(1);
    const sidebarHideWrapper = component.find('.sidebar-hide-button');
    sidebarHideWrapper.simulate('click');
  });
});
