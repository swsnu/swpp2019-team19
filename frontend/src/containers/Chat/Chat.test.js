import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import Chat from './Chat';

const stubChatInitialState1 = {
  chatHistory: [],
};
const stubChatInitialState2 = {
  chatHistory: [
    {
      from: 'user',
      message: 'hi',
    },
    {
      from: 'bot',
      message: {
        text: 'hi',
      },
    },
    {
      from: 'user',
      message: 'hi',
    },
    {
      from: 'bot',
      message: {
        image: 'stubimge',
      },
    },
  ],
};

const mockStore1 = getMockStore({}, {}, stubChatInitialState1);
const mockStore2 = getMockStore({}, {}, stubChatInitialState2);

describe('<ArticleCreate />', () => {
  let chat1; let
    chat2;
  beforeEach(() => {
    chat1 = (
      <Provider store={mockStore1}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Chat} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    chat2 = (
      <Provider store={mockStore2}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Chat} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    history.push('/');
    jest.clearAllMocks();
  });

  it('renders when no message', () => {
    const component = mount(chat1);
    const submitButtonWrpper = component.find('#direct-to-boards');
    submitButtonWrpper.at(0).simulate('click');
    expect(history.location.pathname).toBe('/boards/');
  });

  it('renders when exist message', () => {
    const event = { target: { value: 'hi' } };
    const component = mount(chat2);
    const wrapper = component.find('.inbox_msg');
    expect(wrapper.length).toBe(1);
    const formControlWrapper = component.find('.write_msg');
    formControlWrapper.at(0).simulate('change', event);
    const submitButtonWrpper = component.find('.msg_send_btn');
    submitButtonWrpper.at(0).simulate('click');
  });
});
