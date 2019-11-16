import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { getMockStore } from '../../test-utils/mocks';

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

  beforeEach(() => {
    comment = (
      <Provider store={mockStore}>
        <Comment
          content={stubCommentInitialState.comment.content}
          author={stubCommentInitialState.comment.author}
          key={stubCommentInitialState.comment.id}
        />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    const component = mount(comment);
    const wrapper = component.find('.Comment');
    expect(wrapper.length).toBe(1);
  });
});
