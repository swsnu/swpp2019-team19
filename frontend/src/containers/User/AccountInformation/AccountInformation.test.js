/* eslint-disable no-unused-vars */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import AccountInformation from './AccountInformation';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as ActionCreators from '../../../store/actions/user';

const stubUserInitialState = {
  changeInfoFail: false,
};

const mockStore = getMockStore({}, stubUserInitialState, {});

describe('<AccountInformation />', () => {
  const username = 'mj';
  const newnickname = 'nicknames';
  const newemail = 'kimmando501@gmail.com';
  const currentPassword = 'test1234';
  const wrongpassword = 'short';
  const newPassword = 'test1234';
  const newPasswordConfirm = 'test1234';
  const wrongPasswrodConfirm = 'test12345';
  let accountinformation;
  let spyChangeInfo;
  let spyfetchUser;
  beforeEach(() => {
    accountinformation = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={AccountInformation} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyChangeInfo = jest
      .spyOn(ActionCreators, 'changeInfo')
      .mockImplementation(() => (dispatch) => { });
    spyfetchUser = jest
      .spyOn(ActionCreators, 'fetchUser')
      .mockImplementation(() => (dispatch) => { });
  });
  afterEach(() => {
    // history.push('/');
    jest.clearAllMocks();
  });

  it('renders', () => {
    sessionStorage.setItem(
      'sessionid',
      'asdfkjaweifjlkasdg',
    );
    const component = mount(accountinformation);
    const wrapper = component.find('.AccountInformation');
    expect(wrapper.length).toBe(1);
  });

  it('input text and click button, fail', () => {
    sessionStorage.setItem(
      'sessionid',
      'asdfkjaweifjlkasdg',
    );
    const wrapper = mount(accountinformation);
    const usernameInput = wrapper.find('#username-input');
    const nicknameInput = wrapper.find('#nickname-input');
    const emailInput = wrapper.find('#email-input');
    const currentPasswordInput = wrapper.find('#current-pw-input');
    const newPasswordInput = wrapper.find('#new-pw-input');
    const newPasswordConfirmInput = wrapper.find('#new-pw-confirm-input');
    const buttonInput = wrapper.find('#changeInfo').at(0);

    usernameInput.instance().value = username;
    usernameInput.simulate('change');

    nicknameInput.instance().value = newnickname;
    nicknameInput.simulate('change');

    emailInput.instance().value = newemail;
    emailInput.simulate('change');

    currentPasswordInput.instance().value = currentPassword;
    currentPasswordInput.simulate('change');

    newPasswordInput.instance().value = wrongpassword;
    newPasswordInput.simulate('change');

    newPasswordConfirmInput.instance().value = wrongpassword;
    newPasswordConfirmInput.simulate('change');

    expect(usernameInput.instance().value).toEqual(username);
    expect(nicknameInput.instance().value).toEqual(newnickname);
    expect(emailInput.instance().value).toEqual(newemail);
    expect(currentPasswordInput.instance().value).toEqual(currentPassword);
    expect(newPasswordInput.instance().value).toEqual(wrongpassword);
    expect(newPasswordConfirmInput.instance().value).toEqual(wrongpassword);
    expect(spyChangeInfo).toHaveBeenCalledTimes(0);

    buttonInput.simulate('click');
    expect(spyChangeInfo).toHaveBeenCalledTimes(0);

    expect(currentPasswordInput.instance().value).toEqual('');
    expect(newPasswordInput.instance().value).toEqual('');
    expect(newPasswordConfirmInput.instance().value).toEqual('');
  });

  it('input text and click button, success', () => {
    sessionStorage.setItem(
      'sessionid',
      'asdfkjaweifjlkasdg',
    );
    const wrapper = mount(accountinformation);
    const usernameInput = wrapper.find('#username-input');
    const nicknameInput = wrapper.find('#nickname-input');
    const emailInput = wrapper.find('#email-input');
    const currentPasswordInput = wrapper.find('#current-pw-input');
    const newPasswordInput = wrapper.find('#new-pw-input');
    const newPasswordConfirmInput = wrapper.find('#new-pw-confirm-input');
    const buttonInput = wrapper.find('#changeInfo').at(0);
    expect(buttonInput.length).toBe(1);

    usernameInput.instance().value = username;
    usernameInput.simulate('change');

    nicknameInput.instance().value = newnickname;
    nicknameInput.simulate('change');

    emailInput.instance().value = newemail;
    emailInput.simulate('change');

    currentPasswordInput.instance().value = currentPassword;
    currentPasswordInput.simulate('change');

    newPasswordInput.instance().value = newPassword;
    newPasswordInput.simulate('change');

    newPasswordConfirmInput.instance().value = newPasswordConfirm;
    newPasswordConfirmInput.simulate('change');

    expect(usernameInput.instance().value).toEqual(username);
    expect(nicknameInput.instance().value).toEqual(newnickname);
    expect(emailInput.instance().value).toEqual(newemail);
    expect(currentPasswordInput.instance().value).toEqual(currentPassword);
    expect(newPasswordInput.instance().value).toEqual(newPassword);
    expect(newPasswordConfirmInput.instance().value).toEqual(newPasswordConfirm);
    expect(spyChangeInfo).toHaveBeenCalledTimes(0);

    buttonInput.simulate('click');
    expect(spyChangeInfo).toHaveBeenCalledTimes(1);

    expect(currentPasswordInput.instance().value).toEqual('');
    expect(newPasswordInput.instance().value).toEqual('');
    expect(newPasswordConfirmInput.instance().value).toEqual('');
    expect(spyChangeInfo).toHaveBeenCalledTimes(1);
    expect(spyChangeInfo).toHaveBeenCalledWith(
      username,
      newnickname,
      newemail,
      currentPassword,
      newPasswordConfirm,
    );
  });

  it('input text and click button, failed wrong confirm', () => {
    sessionStorage.setItem(
      'sessionid',
      'asdfkjaweifjlkasdg',
    );
    const wrapper = mount(accountinformation);
    const usernameInput = wrapper.find('#username-input');
    const nicknameInput = wrapper.find('#nickname-input');
    const emailInput = wrapper.find('#email-input');
    const currentPasswordInput = wrapper.find('#current-pw-input');
    const newPasswordInput = wrapper.find('#new-pw-input');
    const newPasswordConfirmInput = wrapper.find('#new-pw-confirm-input');
    const buttonInput = wrapper.find('#changeInfo').at(0);
    expect(buttonInput.length).toBe(1);

    usernameInput.instance().value = username;
    usernameInput.simulate('change');

    nicknameInput.instance().value = newnickname;
    nicknameInput.simulate('change');

    emailInput.instance().value = newemail;
    emailInput.simulate('change');

    currentPasswordInput.instance().value = currentPassword;
    currentPasswordInput.simulate('change');

    newPasswordInput.instance().value = newPassword;
    newPasswordInput.simulate('change');

    newPasswordConfirmInput.instance().value = wrongPasswrodConfirm;
    newPasswordConfirmInput.simulate('change');

    expect(usernameInput.instance().value).toEqual(username);
    expect(nicknameInput.instance().value).toEqual(newnickname);
    expect(emailInput.instance().value).toEqual(newemail);
    expect(currentPasswordInput.instance().value).toEqual(currentPassword);
    expect(newPasswordInput.instance().value).toEqual(newPassword);
    expect(newPasswordConfirmInput.instance().value).toEqual(wrongPasswrodConfirm);
    expect(spyChangeInfo).toHaveBeenCalledTimes(0);

    buttonInput.simulate('click');
    expect(spyChangeInfo).toHaveBeenCalledTimes(0);

    expect(currentPasswordInput.instance().value).toEqual('');
    expect(newPasswordInput.instance().value).toEqual('');
    expect(newPasswordConfirmInput.instance().value).toEqual('');
  });

  it('not logged in', () => {
    sessionStorage.clear();
    const component = mount(accountinformation);
    const wrapper = component.find('.AccountInformation');
    expect(wrapper.length).toBe(0);

    expect(history.location.pathname).toBe('/signin');
  });
});
