/* eslint-disable no-unused-vars */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { getMockStore } from '../../test-utils/mocks';
import * as ActionCreators from '../../store/actions/article';

import ArticleDetail from './ArticleDetail';

const stubArticleNormal = {
  article: {
    id: 1,
    title: 'TEST_ARTICLE_TITLE_1',
    content: 'TEST_ARTICLE_CONTENT_1',
    author: 'TEST_AUTHOR',
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
const mockStore = getMockStore(stubArticleInitialState, {}, {}, {});

describe('<ArticleDetail />', () => {
  let articleDetail;
  let spyVote;
  // let spyPostComment;
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
    // spyPostComment = jest
    //   .spyOn(ActionCreators, 'postComment')
    //   .mockImplementation((id, content) => (dispatch) => { });
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
    const description = wrapper.find('#tag-description');
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
    const description = wrapper.find('#tag-description');
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
    const description = wrapper.find('#tag-description');
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
    const description = wrapper.find('#tag-description');
    expect(description.text()).toBe('this suggestion was rejected');
  });
  it('like and dislike', () => {
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
  });

  // it('post comment', () => {
  //   const component = mount(articleDetail);
  //   const postCommentButton = component.find('#post-component-button').at(0);
  //   const input = component.find('#comment-input');
  //   expect(spyPostComment).toHaveBeenCalledTimes(0);
  //   expect(input).simulate('change', { target: { value: 'hello' } });
  //   postCommentButton.simulate('click');
  //   expect(spyPostComment).toHaveBeenCalledTimes(1);
  //   // expect(spyPostComment).toHaveBeenLastCalledWith('content', )
  // });
});
