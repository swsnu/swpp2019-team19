/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import ArticleDetail from './ArticleDetail';
import { getMockStore } from '../../../../test-utils/mocks';
import { history } from '../../../../store/store';
import * as ActionCreators from '../../../../store/actions/article';

const stubArticleInitialState = {
  article: {
    id: 1,
    author: 1,
    title: 'ARTICLE_TEST_TITLE_1',
    content: 'TEST_CONTENT_1',
    like: 1,
    dislike: 1,
  },
  articleAck: true,
};

const mockStore = getMockStore(stubArticleInitialState, {}, {});

describe('<ArticleDetail />', () => {
  let articleDetail;
  let spyFetchArticle;
  let spyPutVote;
  beforeEach(() => {
    articleDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={ArticleDetail} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyFetchArticle = jest
      .spyOn(ActionCreators, 'fetchArticle')
      .mockImplementation(() => (dispatch) => { });
    spyPutVote = jest
      .spyOn(ActionCreators, 'putVote')
      .mockImplementation(() => (dispatch) => { });
  });

  afterEach(() => {
    history.push('/');
    jest.clearAllMocks();
  });

  it('renders', () => {
    const component = mount(articleDetail);
    const wrapper = component.find('.ArticleDetail');
    expect(wrapper.length).toBe(1);
    expect(spyFetchArticle).toHaveBeenCalledTimes(1);
  });
  it('like button clicked', () => {
    const component = mount(articleDetail);
    const wrapper = component.find('#direct-to-like').at(0);
    wrapper.simulate('click');
    expect(wrapper.length).toBe(1);
    expect(spyPutVote).toHaveBeenCalledTimes(1);
  });
  it('dislike button clicked', () => {
    const component = mount(articleDetail);
    const wrapper = component.find('#direct-to-dislike').at(0);
    wrapper.simulate('click');
    expect(spyPutVote).toHaveBeenCalledTimes(1);
  });
  it('redirect to board', () => {
    const component = mount(articleDetail);
    const wrapper = component.find('#direct-to-board').at(0);

    wrapper.simulate('click');

    expect(history.location.pathname).toBe('/boards/undefined/');
  });
  // it('mocks and calls window.location.reload', () => {
  //   Object.defineProperty(window.location, 'reload', {
  //     configurable: true,
  //   });
  //   window.location.reload = jest.fn();
  //   window.location.reload();
  //   expect(window.location.reload).toHaveBeenCalled();
  // });

  // it('mocks and calls window.location.reload', () => {
  //   window.location.reload = jest.fn();
  //   window.location.reload();
  //   expect(window.location.reload).toHaveBeenCalled();
  // });
  // it('mocks window.location.reload', () => {
  //   const { location } = window;
  //   delete window.location;
  //   window.location = { reload: jest.fn() };
  //   expect(window.location.reload).not.toHaveBeenCalled();
  //   window.location.reload();
  //   expect(window.location.reload).toHaveBeenCalled();
  //   window.location = location;
  // });
});
