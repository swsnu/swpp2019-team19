/* eslint-disable no-unused-vars */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Signup from './Signup';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as ActionCreators from '../../../store/actions/user';

const stubUserInitialState = {
  signinFail: false,
  signupFail: false,
};

const mockStore = getMockStore({}, stubUserInitialState, {});

describe('<Signup />', () => {
  const validEmail = 'lightb0x@naver.com';
  const validUsername = 'lightb0x';
  const validPassword = 'password_test123';
  const typoPassword = 'password-test123';
  const shortPassword = 'short';
  let signup;
  let spySignup;
  beforeEach(() => {
    signup = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Signup} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spySignup = jest
      .spyOn(ActionCreators, 'signup')
      .mockImplementation(() => (dispatch) => { });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    const component = mount(signup);
    const wrapper = component.find('.Signup');
    expect(wrapper.length).toBe(1);
  });

  it('input text and click button, fails', () => {
    const wrapper = mount(signup);
    const emailInput = wrapper.find('#email-input');
    const usernameInput = wrapper.find('#username-input');
    const passwordInput = wrapper.find('#pw-input');
    const passwordConfirmInput = wrapper.find('#pw-confirm-input');
    const buttonInput = wrapper.find('#Signup-button').at(0);

    emailInput.instance().value = validEmail;
    emailInput.simulate('change');

    usernameInput.instance().value = validUsername;
    usernameInput.simulate('change');

    passwordInput.instance().value = shortPassword;
    passwordInput.simulate('change');

    passwordConfirmInput.instance().value = shortPassword;
    passwordConfirmInput.simulate('change');

    expect(passwordInput.instance().value).toEqual(shortPassword);
    expect(passwordConfirmInput.instance().value).toEqual(shortPassword);
    buttonInput.simulate('click');


    expect(passwordInput.instance().value).toEqual('');
    expect(passwordConfirmInput.instance().value).toEqual('');

    passwordInput.instance().value = validPassword;
    passwordInput.simulate('change');

    passwordConfirmInput.instance().value = typoPassword;
    passwordConfirmInput.simulate('change');

    expect(passwordInput.instance().value).toEqual(validPassword);
    expect(passwordConfirmInput.instance().value).toEqual(typoPassword);
    buttonInput.simulate('click');
    expect(passwordInput.instance().value).toEqual('');
    expect(passwordConfirmInput.instance().value).toEqual('');
  });

  it('input text and click button, success and call signup', () => {
    const wrapper = mount(signup);
    const emailInput = wrapper.find('#email-input');
    const usernameInput = wrapper.find('#username-input');
    const passwordInput = wrapper.find('#pw-input');
    const passwordConfirmInput = wrapper.find('#pw-confirm-input');
    const buttonInput = wrapper.find('#Signup-button').at(0);

    emailInput.instance().value = validEmail;
    emailInput.simulate('change');

    usernameInput.instance().value = validUsername;
    usernameInput.simulate('change');

    passwordInput.instance().value = validPassword;
    passwordInput.simulate('change');

    passwordConfirmInput.instance().value = validPassword;
    passwordConfirmInput.simulate('change');

    expect(passwordInput.instance().value).toEqual(validPassword);
    expect(passwordConfirmInput.instance().value).toEqual(validPassword);
    expect(spySignup).toHaveBeenCalledTimes(0);
    buttonInput.simulate('click');
    expect(passwordInput.instance().value).toEqual('');
    expect(passwordConfirmInput.instance().value).toEqual('');
    expect(spySignup).toHaveBeenCalledTimes(1);
    expect(spySignup).toHaveBeenCalledWith(
      validEmail,
      validUsername,
      validPassword,
    );
  });

  it('goto signin page', () => {
    const wrapper = mount(signup);
    const buttonInput = wrapper.find('#direct-to-signin').at(0);

    expect(history.length).toEqual(1);
    expect(history.location.pathname).toBe('/');

    buttonInput.simulate('click');
    expect(history.length).toEqual(2);
    expect(history.location.pathname).toBe('/signin');
  });
});
