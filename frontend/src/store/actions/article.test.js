import axios from 'axios';

import * as actionCreators from './article';
import store from '../store';

const stubArticle = {
  id: 1,
  title: 'title 1',
  content: 'content 1',
  author_id: 1,
};
const stubArticleList1 = [
  {
    id: 1,
    title: 'title 1',
    content: 'content 1',
    author_id: 1,
  },
  {
    id: 1,
    title: 'title 1',
    content: 'content 1',
    author_id: 1,
  },
  {
    id: 1,
    title: 'title 1',
    content: 'content 1',
    author_id: 1,
  },
];
const stubArticleList2 = [
  {
    id: 2,
    title: 'title 2',
    content: 'content 2',
    author_id: 2,
  },
  {
    id: 2,
    title: 'title 2',
    content: 'content 2',
    author_id: 2,
  },
  {
    id: 2,
    title: 'title 2',
    content: 'content 2',
    author_id: 2,
  },
];
describe('action article', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('\'getArticles\' should fetch Articles correctly', (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation((id) => new Promise((resolve) => {
      const result = {
        status: 200,
        data: stubArticle,
      };
      resolve(result);
    }));

    store.dispatch(actionCreators.fetchArticle(0)).then(() => {
      const newState = store.getState();
      expect(newState.article.article).toBe(stubArticle);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'clearArticle\' should fetch Article correctly', (done) => {
    store.dispatch(actionCreators.clearArticle());
    const newState = store.getState();
    expect(newState.article.articleAck).toBe(false);
    done();
  });

  it('\'postArticle\' should post Article correctly', (done) => {
    const spy = jest.spyOn(axios, 'post').mockImplementation((title, content) => new Promise((resolve) => {
      const result = {
        status: 200,
        data: stubArticle,
      };
      resolve(result);
    }));

    store.dispatch(actionCreators.postArticle('title 1', 'content 1')).then(() => {
      const newState = store.getState();
      expect(newState.article.article).toBe(stubArticle);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'editArticle\' should put Article correctly', (done) => {
    const spy = jest.spyOn(axios, 'put').mockImplementation((id, title, content) => new Promise((resolve, reject) => {
      const result = {
        status: 200,
        data: stubArticle,
      };
      resolve(result);
    }));

    store.dispatch(actionCreators.editArticle(1, 'title 1', 'content 1')).then(() => {
      const newState = store.getState();
      expect(newState.article.article).toBe(stubArticle);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'deleteArticle\' should delete Article correctly', (done) => {
    const spy = jest.spyOn(axios, 'delete').mockImplementation((id) => new Promise((resolve) => {
      const result = {
        status: 200,
      };
      resolve(result);
    }));

    store.dispatch(actionCreators.deleteArticle()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('\'deleteArticle\' should delete Article correctly', (done) => {
    const spy = jest.spyOn(axios, 'delete').mockImplementation((id) => new Promise((resolve) => {
      const result = {
        status: 200,
      };
      resolve(result);
    }));

    store.dispatch(actionCreators.deleteArticle()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
