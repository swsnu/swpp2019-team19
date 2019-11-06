import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import Chat from './Chat';

const stubChatInitialState = {
  chatHistory: [],
};


const mockStore = getMockStore({}, {}, stubChatInitialState);

describe('<ArticleCreate />', () => {
  let chat;
  beforeEach(() => {
    chat = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Chat} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });
  it('renders', () => {
    const component = mount(chat);
    const wrapper = component.find('.chat');
    expect(wrapper.length).toBe(1);
    const submitButtonWrpper = component.find('.msg_send_btn');
    submitButtonWrpper.at(0).simulate('click');
  });
});
