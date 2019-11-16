/* eslint-disable no-unused-vars */
import axios from 'axios';

import * as actionCreators from './comment';
import store from '../store';

const stubComment = {
  id: 1,
  content: 'content 1',
  author_id: 1,
};
const stubPostedComment = {
  id: 1,
  content: 'content 2',
  author_id: 1,
};
const stubCommentList1 = [
  {
    id: 1,
    content: 'content 1',
    author_id: 1,
  },
  {
    id: 1,
    content: 'content 1',
    author_id: 1,
  },
  {
    id: 1,
    content: 'content 1',
    author_id: 1,
  },
];
const stubCommentList2 = [
  {
    id: 2,
    content: 'content 2',
    author_id: 2,
  },
  {
    id: 2,
    content: 'content 2',
    author_id: 2,
  },
  {
    id: 2,
    content: 'content 2',
    author_id: 2,
  },
];
const stubCommentList3 = [
  {
    id: 3,
    content: 'content 3',
    author_id: 3,
  },
  {
    id: 4,
    content: 'content 4',
    author_id: 4,
  },
  {
    id: 5,
    content: 'content 5',
    author_id: 5,
  },
];
describe('action comment', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  // 여기부터 다시
  it("'fetchComment' should fetch Comments correctly", (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(
      (id) => new Promise((resolve) => {
        const result = {
          status: 200,
          data: stubComment,
        };
        resolve(result);
      }),
    );

    store.dispatch(actionCreators.fetchComment(0)).then(() => {
      const newState = store.getState();
      expect(newState.comment.commentList).toBe(stubComment);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("'clearComment' should clear Comment correctly", (done) => {
    store.dispatch(actionCreators.clearComment());
    const newState = store.getState();
    expect(Object.keys(newState.comment.commentList).length).toBe(0);
    done();
  });

  it("'postComment' should post Comment correctly", (done) => {
    const spy = jest.spyOn(axios, 'post').mockImplementation(
      (id, content) => new Promise((resolve) => {
        const result = {
          status: 200,
          data: stubPostedComment,
        };
        resolve(result);
      }),
    );

    store
      .dispatch(actionCreators.postComment('1', 'content 2'))
      .then(() => {
        const newState = store.getState();
        expect(newState.comment.commentList).toBe(stubPostedComment);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });
});
