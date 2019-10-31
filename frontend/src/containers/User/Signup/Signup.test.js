/* eslint-disable no-unused-vars */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Signup from './Signup';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as ActionCreators from '../../../store/actions/article';

const stubArticleInitialState = {

};
const stubUserInitialState = {

};

const mockStore = getMockStore(
  stubArticleInitialState,
  stubUserInitialState,
);

describe('<Signup />', () => {
  let signup;
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
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation((_str) => { });

    const wrapper = mount(signup);
    const emailInput = wrapper.find('#email-input');
    const usernameInput = wrapper.find('#username-input');
    const passwordInput = wrapper.find('#pw-input');
    const passwordConfirmInput = wrapper.find('#pw-confirm-input');
    const buttonInput = wrapper.find('#Signup-button').at(0);

    emailInput.instance().value = 'a';
    emailInput.simulate('change');

    usernameInput.instance().value = 'b';
    usernameInput.simulate('change');

    passwordInput.instance().value = 'c';
    passwordInput.simulate('change');

    passwordConfirmInput.instance().value = 'd';
    passwordConfirmInput.simulate('change');

    expect(alertSpy).toHaveBeenCalledTimes(0);
    expect(passwordInput.instance().value).toEqual('c');
    expect(passwordConfirmInput.instance().value).toEqual('d');
    buttonInput.simulate('click');
    expect(passwordInput.instance().value).toEqual('');
    expect(passwordConfirmInput.instance().value).toEqual('');
    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy)
      .toHaveBeenCalledWith('Password should be at least 8 characters');
  });

  // it('goto signin page', () => {
  //   const wrapper = mount(signup);
  //   const buttonInput = wrapper.find('#direct-to-signin').at(0);

  //   buttonInput.simulate('click');

  //   // expect();
  // })
  // TODO : historyMock is not applicable with this model
});
