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
  id: 2,
  content: 'content 2',
  author_id: 1,
};
const edittedComment = {
  id: 3,
  content: 'editted',
  author_id: 1,
};
const stubCommentList1 = [
  {
    id: 1,
    content: 'content 1',
    author_id: 1,
  },
  {
    id: 2,
    content: 'content 2',
    author_id: 1,
  },
  {
    id: 3,
    content: 'content 3',
    author_id: 1,
  },
];
const stubCommentList2 = [
  {
    id: 1,
    content: 'editted',
    author_id: 1,
  },
  {
    id: 2,
    content: 'content 2',
    author_id: 1,
  },
  {
    id: 3,
    content: 'content 3',
    author_id: 1,
  },
];
const stubCommentList3 = [
  {
    id: 2,
    content: 'content 2',
    author_id: 1,
  },
  {
    id: 3,
    content: 'content 3',
    author_id: 1,
  },
];
describe('action comment', () => {
  afterEach(() => {
    jest.clearAllMocks();
    store.dispatch(actionCreators.clearComment());
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

  it('edit comment', (done) => {
    const spyEdit = jest.spyOn(axios, 'put').mockImplementation(
      (id, commentId, content) => new Promise((resolve) => {
        const result = {
          status: 200,
        };
        resolve(result);
      }),
    );
    const spyFetch = jest.spyOn(axios, 'get').mockImplementation(
      (id) => new Promise((resolve) => {
        const result = {
          status: 200,
          data: stubCommentList1,
        };
        resolve(result);
      }),
    );

    store.dispatch(actionCreators.fetchComment(0)).then(() => {
      const newState = store.getState();
      expect(newState.comment.commentList)
        .toMatchObject(stubCommentList1);
      expect(spyFetch).toHaveBeenCalledTimes(1);

      store
        .dispatch(actionCreators.editComment(1, 1, 'editted'))
        .then(() => {
          const editState = store.getState();
          expect(editState.comment.commentList)
            .toMatchObject(stubCommentList2);
          expect(spyEdit).toHaveBeenCalledTimes(1);
          done();
        });
    });
  });
  it('delete comment', (done) => {
    const spyFetch = jest.spyOn(axios, 'get').mockImplementation(
      (id) => new Promise((resolve) => {
        const result = {
          status: 200,
          data: stubCommentList1,
        };
        resolve(result);
      }),
    );
    const spyDelete = jest.spyOn(axios, 'put').mockImplementation(
      (id, commentId) => new Promise((resolve) => {
        const result = {
          status: 200,
        };
        resolve(result);
      }),
    );

    store.dispatch(actionCreators.fetchComment(0)).then(() => {
      const newState = store.getState();
      expect(newState.comment.commentList)
        .toMatchObject(stubCommentList1);
      expect(spyFetch).toHaveBeenCalledTimes(1);
      store
        .dispatch(actionCreators.deleteComment(1, 1))
        .then(() => {
          const delState = store.getState();
          expect(delState.comment.commentList)
            .toMatchObject(stubCommentList3);
          expect(spyDelete).toHaveBeenCalledTimes(1);

          done();
        });
    });
  });
});
