import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { getMockStore } from '../../test-utils/mocks';

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
const mockStore = getMockStore(stubArticleInitialState, {}, {});

describe('<ArticleDetail />', () => {
  let articleDetail;

  beforeEach(() => {
    articleDetail = (
      <Provider store={mockStore}>
        <ArticleDetail
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
    const component = mount(articleDetail);
    const wrapper = component.find('.ArticleDetail');
    expect(wrapper.length).toBe(1);
  });
});
