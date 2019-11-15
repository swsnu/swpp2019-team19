/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions';
import Comment from '../Comment/Comment';

export default function ArticleDetail(props) {
  const tagToDescription = (tag) => {
    switch (tag) {
      case 'normal':
        return 'this suggestion is not reviewed yet';
      case 'working':
        return 'we are working on it!';
      case 'done':
        return 'this suggestion is applied!';
      case 'rejected':
        return 'this suggestion was rejected';
      default:
        return '';
    }
  };
  const commentSelector = (state) => (state.comment);

  const dispatch = useDispatch();
  const storedComment = useSelector(commentSelector);
  const [newComment, setComment] = useState('');

  const makeCommentEntry = (comment) => (
    <Comment content={comment.content} author={comment.author} key={comment.id} />
  );
  const onChangeComment = (e) => (
    setComment(e.target.value)
  );

  return (
    <div className="ArticleDetail">
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.article.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{props.article.content}</h4>
          <p>{props.article.author}</p>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ textAlign: 'left' }}>
            {tagToDescription(props.article.tag)}
          </div>
          <Button onClick={props.like} variant="outline-primary">
            <FontAwesomeIcon icon={faThumbsUp} />
            {props.article.like}
          </Button>
          <Button onClick={props.dislike} variant="outline-danger">
            <FontAwesomeIcon icon={faThumbsDown} />
            {props.article.dislike}
          </Button>
        </Modal.Footer>
        <div className="comment">
          <div className="comment-input">
            <input value={newComment} onChange={onChangeComment} />
            <Button
              onClick={() => dispatch(actionCreators.postComment(props.article.id, newComment))}
            >
              Comment
            </Button>
          </div>
          <div className="comment-list">
            {
              storedComment.commentAck === true
                ? storedComment.commentList.map(makeCommentEntry)
                : <div />
            }
          </div>
        </div>
      </Modal>
    </div>
  );
}
