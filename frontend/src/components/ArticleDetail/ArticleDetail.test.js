/* eslint-disable no-unused-vars */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { getMockStore } from '../../test-utils/mocks';
import * as ActionCreators from '../../store/actions/article';

import ArticleDetail from './ArticleDetail';

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
const mockStore = getMockStore(stubArticleInitialState, {}, {}, {});

describe('<ArticleDetail />', () => {
  let articleDetail;
  let spyVote;
  // let spyPostComment;

  beforeEach(() => {
    articleDetail = (
      <Provider store={mockStore}>
        <ArticleDetail
          article={stubArticleInitialState.article}
          key={stubArticleInitialState.article.id}
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
