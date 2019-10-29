/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import App from './App';

import { getMockStore } from './test-utils/mocks';
import { history } from './store/store';

const stubArticleInitialState = {

};
const stubUserInitialState = {

};

const mockStore = getMockStore(
  stubArticleInitialState,
  stubUserInitialState,
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
    const component = mount(appLogIn);
    expect(component.find('.App').length).toBe(1);
  });
});
