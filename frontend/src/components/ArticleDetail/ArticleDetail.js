/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import * as actionCreators from '../../store/actions';
import Comment from '../Comment/Comment';

const ArticleDetail = (props) => {
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

  // TODO : move to container
  const { show, onHide, article } = props;
  return (
    <div className="ArticleDetail">
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {article.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{article.content}</h4>
          <p>{article.author}</p>
        </Modal.Body>
        <Modal.Footer>
          <div id="tag-description" style={{ textAlign: 'left' }}>
            {tagToDescription(article.tag)}
          </div>
          <Button
            id="like-button"
            onClick={() => props.like(article.id)}
            variant="outline-primary"
          >
            <FontAwesomeIcon icon={faThumbsUp} />
            {article.like}
          </Button>
          <Button
            id="dislike-button"
            onClick={() => props.dislike(article.id)}
            variant="outline-danger"
          >
            <FontAwesomeIcon icon={faThumbsDown} />
            {article.dislike}
          </Button>
        </Modal.Footer>
        <div className="comment">
          <div className="comment-input">
            <input id="comment-input" value={newComment} onChange={onChangeComment} />
            <Button
              id="post-comment-button"
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
};

const mapDispatchToProps = (dispatch) => ({
  like: (id) => dispatch(
    actionCreators.putVote('like', id),
  ),
  dislike: (id) => dispatch(
    actionCreators.putVote('dislike', id),
  ),
});

export default connect(
  null,
  mapDispatchToProps,
)(ArticleDetail);

ArticleDetail.propTypes = {
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  article: PropTypes.object.isRequired,
};
