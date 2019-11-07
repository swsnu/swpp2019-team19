/* eslint-disable no-unused-vars */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import CommunityMain from './CommunityMain';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as ActionCreators from '../../store/actions/article';

const stubArticleInitialState = {
  articleListAll: [
    {
      id: 1,
      author: 1,
      title: 'ARTICLE_TEST_TITLE_1',
      tag: 'all',
    },
    {
      id: 2,
      author: 1,
      title: 'ARTICLE_TEST_TITLE_1',
      tag: 'all',
    },
  ],
  articleListAllAck: true,
  articleListHot: [
    {
      id: 3,
      author: 1,
      title: 'ARTICLE_TEST_TITLE_1',
      tag: 'all',
    },
    {
      id: 4,
      author: 1,
      title: 'ARTICLE_TEST_TITLE_1',
      tag: 'all',
    },
  ],
  articleListHotAck: true,
};

const mockStore = getMockStore(stubArticleInitialState, {}, {});

describe('<CommunityMain />', () => {
  let communityMain;
  let spyFetchAllBoard;
  let spyFetchHotBoard;
  beforeEach(() => {
    communityMain = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={CommunityMain} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyFetchAllBoard = jest
      .spyOn(ActionCreators, 'fetchAllBoard')
      .mockImplementation(() => (dispatch) => { });
    spyFetchHotBoard = jest
      .spyOn(ActionCreators, 'fetchHotBoard')
      .mockImplementation(() => (dispatch) => { });
  });

  afterEach(() => {
    history.push('/');
    jest.clearAllMocks();
  });

  it('renders', () => {
    const component = mount(communityMain);
    const wrapper = component.find('.CommunityMain');
    expect(wrapper.length).toBe(1);
    expect(spyFetchAllBoard).toHaveBeenCalledTimes(1);
    expect(spyFetchHotBoard).toHaveBeenCalledTimes(1);
  });

  it('direct-to-all board buton', () => {
    const wrapper = mount(communityMain);
    expect(spyFetchAllBoard).toHaveBeenCalledTimes(1);
    expect(spyFetchHotBoard).toHaveBeenCalledTimes(1);
    const allButton = wrapper.find('#direct-to-all-board').at(0);

    allButton.simulate('click');

    expect(history.location.pathname).toBe('/boards/all/');
  });

  it('direct-to-hot board buton', () => {
    const wrapper = mount(communityMain);
    // expect(spyFetchAllBoard).toHaveBeenCalledTimes(1);
    expect(spyFetchHotBoard).toHaveBeenCalledTimes(1);
    const hotButton = wrapper.find('#direct-to-hot-board').at(0);

    hotButton.simulate('click');

    expect(history.location.pathname).toBe('/boards/hot/');
  });

  /*
   it('direct-to-hot board buton', () => {
     const component = mount(communityMain);
     const wrapper = component.find('#direct-to-hot-board').at(0);

     wrapper.simulate('click');

     expect(history.location.pathname).toBe('/boards/hot/');
   });
   */
});
