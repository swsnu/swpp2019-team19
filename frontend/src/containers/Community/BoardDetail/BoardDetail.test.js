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
  article: {
    id: 1,
    author: 1,
    title: 'ARTICLE_TEST_TITLE_1',
    tag: 'normal',
    content: 'ARTICLE_TEST_CONTENT_1',
  },
  articleList: [
    {
      id: 1,
      author: 1,
      title: 'ARTICLE_TEST_TITLE_1',
      tag: 'normal',
      content: 'ARTICLE_TEST_CONTENT_1',
    },
    {
      id: 2,
      author: 1,
      title: 'ARTICLE_TEST_TITLE_2',
      tag: 'working',
      content: 'ARTICLE_TEST_CONTENT_2',
    },
    {
      id: 3,
      author: 1,
      title: 'ARTICLE_TEST_TITLE_3',
      tag: 'done',
      content: 'ARTICLE_TEST_CONTENT_3',
    },
    {
      id: 4,
      author: 1,
      title: 'ARTICLE_TEST_TITLE_4',
      tag: 'rejected',
      content: 'ARTICLE_TEST_CONTENT_4',
    },
    {
      id: 5,
      author: 1,
      title: 'ARTICLE_TEST_TITLE_5',
      tag: 'working',
      content: 'ARTICLE_TEST_CONTENT_5',
    },
  ],
  articlePages: 1,
};
const stubCommentInitialState = {
  commentList: [],
};

const mockStore = getMockStore(
  stubArticleInitialState, {}, {}, stubCommentInitialState,
);

describe('<BoardDetail />', () => {
  const defaultOption = {
    currentPageNumber: 1,
    filterCriteria: 'all',
    sortCriteria: 'new',
    searchCriteria: 'title',
    searchKeyword: '',
    articlesPerRequest: 6,
    tmpKeyword: '',
    articleCreateShow: false,
  };
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
      .mockImplementation(() => (dispatch) => { });
  });

  afterEach(() => {
    history.push('/');
    jest.clearAllMocks();
  });

  it('renders', () => {
    const component = mount(boardDetail);
    const wrapper = component.find('.BoardDetail');
    expect(wrapper.length).toBe(2);
    expect(spyFetchArticleList).toHaveBeenCalledTimes(1);
  });

  it('sorts', () => {
    expect(spyFetchArticleList).toHaveBeenCalledTimes(0);
    const wrapper = mount(boardDetail);
    expect(spyFetchArticleList).toHaveBeenCalledTimes(1);
    expect(spyFetchArticleList).toHaveBeenLastCalledWith(defaultOption);

    const sortCriteria = wrapper.find('#sort-criteria').at(4);
    sortCriteria.simulate('click');

    const sortByNew = wrapper.find('#sort-by-new').at(2);
    const sortByOld = wrapper.find('#sort-by-old').at(2);
    const sortByGood = wrapper.find('#sort-by-good').at(2);

    expect(spyFetchArticleList).toHaveBeenCalledTimes(1);
    sortByGood.simulate('click');
    expect(spyFetchArticleList).toHaveBeenCalledTimes(2);
    expect(spyFetchArticleList).toHaveBeenLastCalledWith({
      ...defaultOption, sortCriteria: 'good',
    });

    expect(spyFetchArticleList).toHaveBeenCalledTimes(2);
    sortByOld.simulate('click');
    expect(spyFetchArticleList).toHaveBeenCalledTimes(3);
    expect(spyFetchArticleList).toHaveBeenLastCalledWith({
      ...defaultOption, sortCriteria: 'old',
    });

    expect(spyFetchArticleList).toHaveBeenCalledTimes(3);
    sortByNew.simulate('click');
    expect(spyFetchArticleList).toHaveBeenCalledTimes(4);
    expect(spyFetchArticleList).toHaveBeenLastCalledWith(defaultOption);
  });

  it('searches', () => {
    expect(spyFetchArticleList).toHaveBeenCalledTimes(0);
    const wrapper = mount(boardDetail);
    expect(spyFetchArticleList).toHaveBeenCalledTimes(1);
    const searchKeyword = wrapper.find('#search-keyword').at(1);
    const searchButton = wrapper.find('#search-button').at(0);

    searchKeyword.instance().value = 'ARTICLE_TEST_TITLE_1';
    searchKeyword.simulate('change');

    expect(spyFetchArticleList).toHaveBeenCalledTimes(1);
    searchButton.simulate('click');
    expect(spyFetchArticleList).toHaveBeenCalledTimes(2);
    expect(spyFetchArticleList).toHaveBeenLastCalledWith({
      ...defaultOption,
      searchKeyword: 'ARTICLE_TEST_TITLE_1',
      tmpKeyword: 'ARTICLE_TEST_TITLE_1',
    });

    const searchCriteria = wrapper.find('#search-criteria').at(4);
    searchCriteria.simulate('click');

    const searchByTitle = wrapper.find('#search-by-title').at(2);
    const searchByNickname = wrapper.find('#search-by-nickname').at(2);

    searchByNickname.simulate('click');

    searchKeyword.instance().value = 'ARTICLE_TEST_TITLE_2';
    searchKeyword.simulate('change');
    expect(spyFetchArticleList).toHaveBeenCalledTimes(2);
    searchButton.simulate('click');
    expect(spyFetchArticleList).toHaveBeenCalledTimes(3);
    expect(spyFetchArticleList).toHaveBeenLastCalledWith({
      ...defaultOption,
      searchKeyword: 'ARTICLE_TEST_TITLE_2',
      tmpKeyword: 'ARTICLE_TEST_TITLE_2',
      searchCriteria: 'nickname',
    });

    searchByTitle.simulate('click');

    searchKeyword.instance().value = 'ARTICLE_TEST_TITLE_3';
    searchKeyword.simulate('change');
    expect(spyFetchArticleList).toHaveBeenCalledTimes(3);
    searchButton.simulate('click');
    expect(spyFetchArticleList).toHaveBeenCalledTimes(4);
    expect(spyFetchArticleList).toHaveBeenLastCalledWith({
      ...defaultOption,
      searchKeyword: 'ARTICLE_TEST_TITLE_3',
      tmpKeyword: 'ARTICLE_TEST_TITLE_3',
      searchCriteria: 'title',
    });
  });

  it('filters', () => {
    expect(spyFetchArticleList).toHaveBeenCalledTimes(0);
    const wrapper = mount(boardDetail);
    wrapper.props.match = {};
    wrapper.props.match.params = {};
    wrapper.props.match.params.boardName = 'hot';
    expect(spyFetchArticleList).toHaveBeenCalledTimes(1);

    const allButton = wrapper.find('#filter-all').at(0);
    const normalButton = wrapper.find('#filter-normal').at(0);
    const workingButton = wrapper.find('#filter-working').at(0);
    const doneButton = wrapper.find('#filter-done').at(0);
    const rejectedButton = wrapper.find('#filter-rejected').at(0);

    expect(spyFetchArticleList).toHaveBeenCalledTimes(1);
    normalButton.simulate('click');
    expect(spyFetchArticleList).toHaveBeenCalledTimes(2);
    expect(spyFetchArticleList).toHaveBeenLastCalledWith({
      ...defaultOption, filterCriteria: 'normal',
    });

    workingButton.simulate('click');
    expect(spyFetchArticleList).toHaveBeenCalledTimes(3);
    expect(spyFetchArticleList).toHaveBeenLastCalledWith({
      ...defaultOption, filterCriteria: 'working',
    });
    doneButton.simulate('click');
    expect(spyFetchArticleList).toHaveBeenCalledTimes(4);
    expect(spyFetchArticleList).toHaveBeenLastCalledWith({
      ...defaultOption, filterCriteria: 'done',
    });
    rejectedButton.simulate('click');
    expect(spyFetchArticleList).toHaveBeenCalledTimes(5);
    expect(spyFetchArticleList).toHaveBeenLastCalledWith({
      ...defaultOption, filterCriteria: 'rejected',
    });
    allButton.simulate('click');
    expect(spyFetchArticleList).toHaveBeenCalledTimes(6);
    expect(spyFetchArticleList).toHaveBeenLastCalledWith({
      ...defaultOption, filterCriteria: 'all',
    });
  });

  it('direct to create', () => {
    expect(spyFetchArticleList).toHaveBeenCalledTimes(0);
    const wrapper = mount(boardDetail);
    expect(spyFetchArticleList).toHaveBeenCalledTimes(1);

    const writeButton = wrapper.find('#write-button').at(0);

    writeButton.simulate('click');
    expect(history.location.pathname).toBe('/');
  });

  it('direct to board', () => {
    expect(spyFetchArticleList).toHaveBeenCalledTimes(0);
    const wrapper = mount(boardDetail);
    expect(spyFetchArticleList).toHaveBeenCalledTimes(1);

    const boardButton = wrapper.find('#direct-to-board').at(0);

    boardButton.simulate('click');
    expect(history.location.pathname).toBe('/boards');
  });
});
