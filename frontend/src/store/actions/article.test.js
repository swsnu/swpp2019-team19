/* eslint-disable no-unused-vars */
import axios from 'axios';

import * as actionCreators from './article';
import store from '../store';

const stubArticle = {
  id: 1,
  title: 'title 1',
  content: 'content 1',
  author_id: 1,
  like: 10,
  dislike: 0,
};
const stubPostedArticle = {
  id: 1,
  title: 'title 2',
  content: 'content 2',
  author_id: 1,
};
const stubEditedArticle = {
  id: 1,
  title: 'title 3',
  content: 'content 3',
  author_id: 1,
};
const stubVoteEditedArticle = {
  id: 1,
  title: 'title 1',
  content: 'content 1',
  author_id: 1,
  like: 11,
  dislike: 0,
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
const stubArticleList3 = [
  {
    id: 3,
    title: 'title 3',
    content: 'content 3',
    author_id: 3,
  },
  {
    id: 4,
    title: 'title 4',
    content: 'content 4',
    author_id: 4,
  },
  {
    id: 5,
    title: 'title 5',
    content: 'content 5',
    author_id: 5,
  },
];
describe('action article', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("'clearArticle' should clear Article correctly", (done) => {
    store.dispatch(actionCreators.clearArticle());
    const newState = store.getState();
    expect(Object.keys(newState.article.article).length).toBe(0);
    done();
  });

  it("'postArticle' should post Article correctly", (done) => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(
      (title, content) => new Promise((resolve) => {
        const result = {
          status: 200,
          data: stubPostedArticle,
        };
        resolve(result);
      }),
    );

    store
      .dispatch(actionCreators.postArticle('title 2', 'content 2'))
      .then(() => {
        const newState = store.getState();
        expect(newState.article.article).toBe(stubPostedArticle);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it("'editArticle' should put Article correctly", (done) => {
    const spy = jest.spyOn(axios, 'put').mockImplementation(
      (id, title, content) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubEditedArticle,
        };
        resolve(result);
      }),
    );

    store
      .dispatch(actionCreators.editArticle(1, 'title 3', 'content 3'))
      .then(() => {
        const newState = store.getState();
        expect(newState.article.article).toBe(stubEditedArticle);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it("'deleteArticle' should delete Article correctly", (done) => {
    const { location } = window;
    delete window.location;
    window.location = { reload: jest.fn() };

    const spy = jest.spyOn(axios, 'delete').mockImplementation(
      (id) => new Promise((resolve) => {
        const result = {
          status: 200,
        };
        resolve(result);
      }),
    );

    expect(window.location.reload).not.toHaveBeenCalled();
    store.dispatch(actionCreators.deleteArticle()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(window.location.reload).toHaveBeenCalled();
      window.location = location;
      done();
    });
  });

  it("'fetchAllBoard' should post Article correctly", (done) => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(
      (articleCount, tag) => new Promise((resolve) => {
        const result = {
          status: 200,
          data: [1, stubArticleList1],
        };
        resolve(result);
      }),
    );

    store.dispatch(actionCreators.fetchAllBoard(0)).then(() => {
      const newState = store.getState();
      expect(newState.article.articleListAll).toBe(stubArticleList1);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("'fetchHotBoard' should post Article correctly", (done) => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(
      (articleCount, tag) => new Promise((resolve) => {
        const result = {
          status: 200,
          data: [1, stubArticleList2],
        };
        resolve(result);
      }),
    );

    store.dispatch(actionCreators.fetchHotBoard(0)).then(() => {
      const newState = store.getState();
      expect(newState.article.articleListHot).toBe(stubArticleList2);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("'fetchArticleList' should post Article correctly", (done) => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(
      (articleCount, boardName, tag) => new Promise((resolve) => {
        const result = {
          status: 200,
          data: [1,
            stubArticleList3],
        };
        resolve(result);
      }),
    );

    store.dispatch(actionCreators.fetchArticleList(1)).then(() => {
      const newState = store.getState();
      expect(newState.article.articleList).toBe(stubArticleList3);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("'clearAllBoard' should clear Article correctly", (done) => {
    store.dispatch(actionCreators.clearAllBoard());
    const newState = store.getState();
    expect(newState.article.articleListAll.length).toBe(0);
    done();
  });

  it("'clearHotBoard' should clear Article correctly", (done) => {
    store.dispatch(actionCreators.clearHotBoard());
    const newState = store.getState();
    expect(newState.article.articleListHot.length).toBe(0);
    done();
  });

  it("'clearArticleList' should clear Article correctly", (done) => {
    store.dispatch(actionCreators.clearArticleList());
    const newState = store.getState();
    expect(newState.article.articleList.length).toBe(0);
    done();
  });

  it("'fetchArticles' should fetch Articles correctly, then 'putVote' should put Article correctly", (done) => {
    const spyGet = jest.spyOn(axios, 'get').mockImplementation(
      (id) => new Promise((resolve) => {
        const result = {
          status: 200,
          data: stubArticle,
        };
        resolve(result);
      }),
    );

    store.dispatch(actionCreators.fetchArticle(1)).then(() => {
      const newState = store.getState();
      expect(newState.article.article).toBe(stubArticle);
      expect(spyGet).toHaveBeenCalledTimes(1);
      done();
      const spyPut = jest.spyOn(axios, 'put').mockImplementation(
        (id, vote) => new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubVoteEditedArticle,
          };
          resolve(result);
        }),
      );

      store
        .dispatch(actionCreators.putVote('like', 1))
        .then(() => {
          const newNextState = store.getState();
          expect(newNextState.article.article).toStrictEqual(stubVoteEditedArticle);
          expect(spyPut).toHaveBeenCalledTimes(1);
          done();
        });
    });
  });
});
