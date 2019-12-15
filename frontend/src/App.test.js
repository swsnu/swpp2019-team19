/* eslint-disable no-unused-vars */
import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import App from './App';

import { getMockStore } from './test-utils/mocks';
import { history } from './store/store';

import * as ActionCreators from './store/actions/chat';

const stubArticleInitialState = {

};
const stubUserInitialState = {

};
const stubChatInitialState = {
  chatHistory: [],
  engCategory: [],
  korCategory: [],
};

const stubCommentInitialState = {

};

const mockStore = getMockStore(
  stubArticleInitialState,
  stubUserInitialState,
  stubChatInitialState,
  stubCommentInitialState,
);


describe('renders without crashing', () => {
  let appLogIn;
  beforeEach(() => {
    appLogIn = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
  });

  it('should render App', () => {
    const spyFetchCategory = jest
      .spyOn(ActionCreators, 'fetchCategory')
      .mockImplementation(() => (dispatch) => { });

    expect(spyFetchCategory).not.toHaveBeenCalled();
    const component = mount(appLogIn);
    expect(component.find('.App').length).toBe(1);
    expect(spyFetchCategory).toHaveBeenCalled();
  });
});
