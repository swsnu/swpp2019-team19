import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { getMockStore } from '../../test-utils/mocks';

import * as ActionCreators from '../../store/actions/comment';
import Comment from './Comment';

const stubCommentInitialState = {
  comment: {
    id: 1,
    content: 'TEST_ARTICLE_CONTENT_1',
    author: 'TEST_AUTHOR',
  },
};
const mockStore = getMockStore({}, {}, {}, stubCommentInitialState);

describe('<Comment />', () => {
  let comment;
  const spyEdit = jest
    .spyOn(ActionCreators, 'editComment')
    // eslint-disable-next-line no-unused-vars
    .mockImplementation(() => (dispatch) => { });

  beforeEach(() => {
    comment = (
      <Provider store={mockStore}>
        <Comment
          commentId={1}
          articleId={1}
          content={stubCommentInitialState.comment.content}
          author={stubCommentInitialState.comment.author}
          key={stubCommentInitialState.comment.id}
          editComment={spyEdit}
        />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  it('renders', () => {
    const component = mount(comment);
    const wrapper = component.find('.Comment');
    expect(wrapper.length).toBe(2);
  });

  it('edit (logged in)', () => {
    sessionStorage.setItem('nickname', 'TEST_AUTHOR');
    const component = mount(comment);
    const wrapper = component.find('#comment-edit-button').at(1);
    expect(wrapper.exists()).toBeTruthy();

    wrapper.simulate('click');

    const inputField = component.find('#comment-edit').at(1);
    const confirmButton = component.find('#comment-edit-confirm-button').at(1);
    expect(inputField.exists()).toBeTruthy();
    expect(confirmButton.exists()).toBeTruthy();


    expect(inputField.instance().value).toEqual('TEST_ARTICLE_CONTENT_1');
    inputField.instance().value = 'EDITTED_COMMENT';
    inputField.simulate('change');
    expect(inputField.instance().value).toEqual('EDITTED_COMMENT');

    expect(spyEdit).toHaveBeenCalledTimes(0);
    confirmButton.simulate('click');
    expect(spyEdit).toHaveBeenCalledTimes(1);
  });

  it('edit (not logged in)', () => {
    const component = mount(comment);
    const wrapper = component.find('#comment-edit-button');

    expect(wrapper.exists()).not.toBeTruthy();
  });
});
