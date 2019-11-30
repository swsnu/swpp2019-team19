/* eslint-disable no-unused-vars */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
// import { render, fireEvent, getByTestId } from '@testing-library/react';
import { getMockStore } from '../../test-utils/mocks';
import * as ActionCreators from '../../store/actions/article';
import * as commentAction from '../../store/actions/comment';

import ArticleDetail from './ArticleDetail';

const stubArticleNormal = {
  article: {
    id: 1,
    title: 'TEST_ARTICLE_TITLE_1',
    content: 'TEST_ARTICLE_CONTENT_1',
    author__nickname: 'TEST_AUTHOR',
    dislike: 4,
    like: 10,
    vote_diff: 6,
    tag: 'normal',
  },
};
const stubArticleWorking = {
  article: {
    id: 1,
    title: 'TEST_ARTICLE_TITLE_1',
    content: 'TEST_ARTICLE_CONTENT_1',
    author: 'TEST_AUTHOR',
    dislike: 4,
    like: 10,
    vote_diff: 6,
    tag: 'working',
  },
};
const stubArticleDone = {
  article: {
    id: 1,
    title: 'TEST_ARTICLE_TITLE_1',
    content: 'TEST_ARTICLE_CONTENT_1',
    author: 'TEST_AUTHOR',
    dislike: 4,
    like: 10,
    vote_diff: 6,
    tag: 'done',
  },
};
const stubArticleRejected = {
  article: {
    id: 1,
    title: 'TEST_ARTICLE_TITLE_1',
    content: 'TEST_ARTICLE_CONTENT_1',
    author: 'TEST_AUTHOR',
    dislike: 4,
    like: 10,
    vote_diff: 6,
    tag: 'rejected',
  },
};

const stubCommentInitialState = {
  commentList: [],
};

const mockStore = getMockStore(
  stubArticleNormal, {}, {}, stubCommentInitialState,
);

describe('<ArticleDetail />', () => {
  let articleDetail;
  let spyVote;
  let spyPostComment;
  const spyOnHide = jest.fn();

  beforeEach(() => {
    articleDetail = (
      <Provider store={mockStore}>
        <ArticleDetail
          article={stubArticleNormal.article}
          key={stubArticleNormal.article.id}
          onHide={spyOnHide}
          show
        />
      </Provider>
    );
    spyPostComment = jest
      .spyOn(commentAction, 'postComment')
      .mockImplementation((id, content) => (dispatch) => { });
    spyVote = jest
      .spyOn(ActionCreators, 'putVote')
      .mockImplementation(() => (dispatch) => { });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    const component = mount(articleDetail);
    const wrapper = component.find('.ArticleDetail');
    expect(wrapper.length).toBe(1);
  });
  it('displays normal tag', () => {
    const wrapper = mount(
      <Provider store={mockStore}>
        <ArticleDetail
          article={stubArticleNormal.article}
          key={stubArticleNormal.article.id}
          onHide={spyOnHide}
          show
        />
      </Provider>,
    );
    const description = wrapper.find('#tag-description').at(1);
    expect(description.text()).toBe('this suggestion is not reviewed yet');
  });

  it('displays working tag', () => {
    const wrapper = mount(
      <Provider store={mockStore}>
        <ArticleDetail
          article={stubArticleWorking.article}
          key={stubArticleWorking.article.id}
          onHide={spyOnHide}
          show
        />
      </Provider>,
    );
    const description = wrapper.find('#tag-description').at(1);
    expect(description.text()).toBe('we are working on it!');
  });
  it('displays done tag', () => {
    const wrapper = mount(
      <Provider store={mockStore}>
        <ArticleDetail
          article={stubArticleDone.article}
          key={stubArticleDone.article.id}
          onHide={spyOnHide}
          show
        />
      </Provider>,
    );
    const description = wrapper.find('#tag-description').at(1);
    expect(description.text()).toBe('this suggestion is applied!');
  });

  it('displays rejected tag', () => {
    const wrapper = mount(
      <Provider store={mockStore}>
        <ArticleDetail
          article={stubArticleRejected.article}
          key={stubArticleRejected.article.id}
          onHide={spyOnHide}
          show
        />
      </Provider>,
    );
    const description = wrapper.find('#tag-description').at(1);
    expect(description.text()).toBe('this suggestion was rejected');
  });
  it('like and dislike (logged in)', () => {
    sessionStorage.setItem('username', 'hello');
    const component = mount(articleDetail);
    const likeButton = component.find('#like-button').at(1);
    const dislikeButton = component.find('#dislike-button').at(1);

    expect(spyVote).toHaveBeenCalledTimes(0);
    likeButton.simulate('click');
    expect(spyVote).toHaveBeenCalledTimes(1);
    expect(spyVote).toHaveBeenLastCalledWith('like', 1);

    expect(spyVote).toHaveBeenCalledTimes(1);
    dislikeButton.simulate('click');
    expect(spyVote).toHaveBeenCalledTimes(2);
    expect(spyVote).toHaveBeenLastCalledWith('dislike', 1);
    sessionStorage.clear();
  });

  it('like and dislike (not logged in)', () => {
    const component = mount(articleDetail);
    const likeButton = component.find('#like-button').at(1);
    const dislikeButton = component.find('#dislike-button').at(1);

    expect(spyVote).toHaveBeenCalledTimes(0);
    likeButton.simulate('click');
    expect(spyVote).toHaveBeenCalledTimes(0);
    dislikeButton.simulate('click');
    expect(spyVote).toHaveBeenCalledTimes(0);
  });

  it('post comment (logged in)', () => {
    sessionStorage.setItem('username', 'hello');
    const component = mount(articleDetail);
    const commentInput = component.find('#comment-input').at(1);
    const commentButton = component.find('#comment-write-button').at(1);
    commentInput.instance().value = 'new comment';
    commentInput.simulate('change');
    expect(commentInput.instance().value).toEqual('new comment');
    expect(spyPostComment).toHaveBeenCalledTimes(0);
    commentButton.simulate('click');
    expect(spyPostComment).toHaveBeenCalledTimes(1);
    expect(commentInput.instance().value).toEqual('');
    sessionStorage.clear();
  });
  it('post comment (not logged in)', () => {
    const component = mount(articleDetail);
    const commentInput = component.find('#comment-input').at(1);
    const commentButton = component.find('#comment-write-button').at(1);
    commentInput.instance().value = 'new comment';
    commentInput.simulate('change');
    expect(commentInput.instance().value).toEqual('new comment');
    expect(spyPostComment).toHaveBeenCalledTimes(0);
    commentButton.simulate('click');
    expect(spyPostComment).toHaveBeenCalledTimes(0);
    expect(commentInput.instance().value).toEqual('new comment');
  });
  it('edit', () => {
    sessionStorage.setItem('nickname', 'TEST_AUTHOR');
    const wrapper = mount(
      <Provider store={mockStore}>
        <ArticleDetail
          article={stubArticleNormal.article}
          key={stubArticleNormal.article.id}
          onHide={spyOnHide}
          show
        />
      </Provider>,
    );
    const editButton = wrapper.find('#article-edit-button').at(1);
    expect(editButton.exists()).toBeTruthy();

    editButton.simulate('click');

    const editCard = wrapper.find('.article-edit-card');
    expect(editCard.exists()).toBeTruthy();

    sessionStorage.clear();
  });
  it('delete', () => {
    sessionStorage.setItem('nickname', 'TEST_AUTHOR');
    const spyDelete = jest
      .spyOn(ActionCreators, 'deleteArticle')
      .mockImplementation(() => (dispatch) => { });
    const wrapper = mount(
      <Provider store={mockStore}>
        <ArticleDetail
          article={stubArticleNormal.article}
          key={stubArticleNormal.article.id}
          onHide={spyOnHide}
          show
        />
      </Provider>,
    );
    const deleteButton = wrapper.find('#article-delete-button').at(1);
    expect(deleteButton.exists()).toBeTruthy();

    deleteButton.simulate('click');

    const deleteNoButton = wrapper.find('#delete-confirm-no').at(1);
    expect(deleteNoButton.exists()).toBeTruthy();

    deleteNoButton.simulate('click');
    deleteButton.simulate('click');

    const deleteYesButton = wrapper.find('#delete-confirm-yes').at(1);
    expect(deleteYesButton.exists()).toBeTruthy();

    expect(spyDelete).not.toHaveBeenCalled();
    deleteYesButton.simulate('click');
    expect(spyDelete).toHaveBeenCalledTimes(1);

    sessionStorage.clear();
  });
});
