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
});
