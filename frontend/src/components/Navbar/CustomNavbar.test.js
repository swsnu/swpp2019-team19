/* eslint-disable no-unused-vars */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { getMockStore } from '../../test-utils/mocks';
import CustomNavbar from './CustomNavbar';
import * as ActionCreators from '../../store/actions/user';

const stubArticleInitialState = {
  article: {
    id: 1,
    title: 'TEST_ARTICLE_TITLE_1',
    content: 'TEST_ARTICLE_CONTENT_1',
    author: 'TEST_AUTHOR',
    dislike: 4,
    like: 10,
    vote_diff: 6,
  },
};
const mockStore = getMockStore(stubArticleInitialState, {}, {});

describe('<CustomNavbar />', () => {
  let navbar;
  const historyMock = { push: jest.fn() };
  const spySignout = jest
    .spyOn(ActionCreators, 'signout')
    .mockImplementation(() => (dispatch) => { });

  beforeEach(() => {
    navbar = (
      <Provider store={mockStore}>
        <CustomNavbar
          history={historyMock}
          signout={spySignout}
        />
      </Provider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders navbar', () => {
    const component = mount(navbar);
    const wrapper = component.find('.custom-navbar');
    expect(wrapper.length).toBe(2);
  });

  it('renders sidebar', () => {
    const component = mount(navbar);
    const sidebarShowWrapper = component.find('.sidebar-show-button').at(1);
    sidebarShowWrapper.simulate('click');
    const sidebarwrapper = component.find('#sidebar-wrapper');
    expect(sidebarwrapper.length).toBe(1);
    const sidebarHideWrapper = component.find('.sidebar-hide-button').at(1);
    sidebarHideWrapper.simulate('click');
  });

  it('renders account button when signed in', () => {
    sessionStorage.setItem('username', 'logged in');
    const component = mount(navbar);
    const sidebarShowWrapper = component.find('.sidebar-show-button').at(1);
    sidebarShowWrapper.simulate('click');

    const accountButton = component.find('#account-button').at(1);

    expect(historyMock.push).not.toHaveBeenCalled();
    accountButton.simulate('click');
    expect(historyMock.push).toHaveBeenCalledWith('/account');

    sessionStorage.clear();
  });

  it('renders signout button when signed in', () => {
    sessionStorage.setItem('username', 'logged in');
    const component = mount(navbar);
    const sidebarShowWrapper = component.find('.sidebar-show-button').at(1);
    sidebarShowWrapper.simulate('click');

    const signoutButton = component.find('#signout-button').at(1);

    expect(spySignout).not.toHaveBeenCalled();
    signoutButton.simulate('click');
    expect(spySignout).toHaveBeenCalled();

    sessionStorage.clear();
  });

  it('renders signin button when not signed in', () => {
    const component = mount(navbar);
    const sidebarShowWrapper = component.find('.sidebar-show-button').at(1);
    sidebarShowWrapper.simulate('click');

    const signinButton = component.find('#signin-button').at(1);

    expect(historyMock.push).not.toHaveBeenCalled();
    signinButton.simulate('click');
    expect(historyMock.push).toHaveBeenCalledWith('/signin');
  });

  it('renders signup button when not signed in', () => {
    const component = mount(navbar);
    const sidebarShowWrapper = component.find('.sidebar-show-button').at(1);
    sidebarShowWrapper.simulate('click');

    const signupButton = component.find('#signup-button').at(1);

    expect(historyMock.push).not.toHaveBeenCalled();
    signupButton.simulate('click');
    expect(historyMock.push).toHaveBeenCalledWith('/signup');
  });
});
