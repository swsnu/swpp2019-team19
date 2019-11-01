/* eslint-disable no-unused-vars */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import BoardDetail from './BoardDetail';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as ActionCreators from '../../../store/actions/article';

const stubArticleInitialState = {
  articleList: [
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
  articleListAck: true,
};

const mockStore = getMockStore(stubArticleInitialState);

describe('<BoardDetail />', () => {
  let boardDetail;
  let spyFetchArticleList;
  beforeEach(() => {
    boardDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={BoardDetail} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyFetchArticleList = jest
      .spyOn(ActionCreators, 'fetchArticleList')
      .mockImplementation(() => (dispatch) => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    const component = mount(boardDetail);
    const wrapper = component.find('.BoardDetail');
    expect(wrapper.length).toBe(1);
    expect(spyFetchArticleList).toHaveBeenCalledTimes(1);
  });
});
