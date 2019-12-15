/* eslint-disable no-unused-vars */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { getMockStore } from '../../test-utils/mocks';

import * as articleAction from '../../store/actions/article';
import * as commentAction from '../../store/actions/comment';
import ArticleEntry from './ArticleEntry';

const stubArticleInitialState = {
  article: {
    id: 1,
    title: 'TEST_ARTICLE_TITLE_1',
    content: 'TEST_ARTICLE_CONTENT_1',
    author: 'TEST_AUTHOR',
    dislike: 4,
    like: 10,
    vote_diff: 6,
  },
};

const stubCommentInitialState = {
  commentList: [],
};

const mockStore = getMockStore(
  stubArticleInitialState, {}, {}, stubCommentInitialState,
);

describe('<ArticleEntry />', () => {
  let articleEntry;

  beforeEach(() => {
    articleEntry = (
      <Provider store={mockStore}>
        <ArticleEntry
          article={stubArticleInitialState.article}
          key={stubArticleInitialState.article.id}
        />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    const component = mount(articleEntry);
    const wrapper = component.find('.ArticleEntry');
    expect(wrapper.length).toBe(2);
    expect(component.find('#article-entry')).toHaveLength(2);
  });

  it('mouseover and mouseout', () => {
    const component = mount(articleEntry);
    const wrapper = component.find('#article-entry').at(1);
    wrapper.simulate('mouseover');
    wrapper.simulate('mouseout');
  });
  it('focus and blur', () => {
    const component = mount(articleEntry);
    const wrapper = component.find('#article-entry').at(1);
    wrapper.simulate('focus');
    wrapper.simulate('blur');
  });
  it('fetch when clicked, clear when closed', () => {
    const wrapper = mount(articleEntry);
    const clickable = wrapper.find('#article-entry').at(1);
    const spyFetch = jest
      .spyOn(articleAction, 'fetchArticle')
      .mockImplementation(() => (dispatch) => { });
    const spyFetchComment = jest
      .spyOn(commentAction, 'fetchComment')
      .mockImplementation(() => (dispatch) => { });

    expect(spyFetch).not.toHaveBeenCalled();
    expect(spyFetchComment).not.toHaveBeenCalled();
    expect(clickable.exists()).toBeTruthy();
    clickable.simulate('click');

    expect(spyFetch).toHaveBeenCalled();
    expect(spyFetchComment).toHaveBeenCalled();
  });
});
