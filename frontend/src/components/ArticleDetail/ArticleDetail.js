import React, { useState } from 'react';
import { useSelector, connect } from 'react-redux';
import {
  Modal, Button, InputGroup, Form, Alert, Col, DropdownButton, DropdownItem,
} from 'react-bootstrap';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import * as actionCreators from '../../store/actions';
import Comment from '../Comment/Comment';
import ArticleCreate from '../ArticleCreate/ArticleCreate';

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

  const storedComment = useSelector(commentSelector);
  const [newComment, setComment] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const {
    show, onHide, article, postComment, deleteArticle, like, dislike, isSuper,
    editTag,
  } = props;

  const makeCommentEntry = (comment) => (
    <Modal.Footer key={comment.id}>
      <Comment
        articleId={article.id}
        commentId={comment.id}
        content={comment.content}
        author={comment.author__nickname}
      />
    </Modal.Footer>
  );

  const voteHandler = (id, handle) => {
    if (sessionStorage.getItem('username') === null) {
      setShowLogin(true);
    } else if (handle === 'like') {
      like(id);
    } else {
      dislike(id);
    }
  };
  const commentHandler = (id, comment) => {
    if (sessionStorage.getItem('username') === null) {
      setShowLogin(true);
    } else {
      postComment(id, comment);
      setComment('');
    }
  };

  const isAuthor = (
    article.author__nickname === sessionStorage.getItem('nickname')
  );
  const articleTitle = article.title;
  const articleContent = article.content;

  const dropdownItemFactory = (name) => {
    const articleId = article.id;
    const newId = `tag-into-${name}`;
    return (
      <DropdownItem
        id={newId}
        onSelect={() => editTag(articleId, name)}
      >
        {name}
      </DropdownItem>
    );
  };
  return (
    <div className="ArticleDetail">
      <Modal
        show={show}
        onHide={() => {
          setShowLogin(false);
          onHide();
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Col>
            <Modal.Title id="contained-modal-title-vcenter">
              {article.title}
            </Modal.Title>
          </Col>
          {
            isSuper
              ? (
                <DropdownButton title={article.tag ? article.tag : ''}>
                  {dropdownItemFactory('normal')}
                  {dropdownItemFactory('working')}
                  {dropdownItemFactory('done')}
                  {dropdownItemFactory('rejected')}
                </DropdownButton>
              ) : <div />
          }
          {
            isAuthor
              ? (
                <Col align="right">
                  <Button
                    id="article-edit-button"
                    onClick={() => setEdit(true)}
                  >
                    Edit
                  </Button>
                  {' '}
                  <Button
                    id="article-delete-button"
                    onClick={() => setShowDelete(true)}
                  // onClick={() => {
                  //   deleteArticle(article.id);
                  //   onHide();
                  // }}
                  >
                    Delete
                  </Button>
                </Col>
              )
              : <div />
          }

        </Modal.Header>
        <Modal.Body>
          <h4>{article.content}</h4>
          <p>{article.author__nickname}</p>
          {
            showLogin
              ? (
                <Alert variant="warning">
                  Requires
                  {' '}
                  <Alert.Link href="/signin">
                    Login!
                  </Alert.Link>
                </Alert>
              )
              : <div />
          }
        </Modal.Body>
        <Modal.Footer>
          <Col id="tag-description" align="left">
            {tagToDescription(article.tag)}
          </Col>
          <Button
            id="like-button"
            onClick={() => voteHandler(article.id, 'like')}
            variant="outline-primary"
          >
            <FontAwesomeIcon icon={faThumbsUp} />
            {article.like}
          </Button>
          {' '}
          <Button
            id="dislike-button"
            onClick={() => voteHandler(article.id, 'dislike')}
            variant="outline-danger"
          >
            <FontAwesomeIcon icon={faThumbsDown} />
            {article.dislike}
          </Button>
        </Modal.Footer>
        <div className="comment">
          <div className="comment-list">
            {storedComment.commentList.map(makeCommentEntry)}
          </div>
          <Modal.Footer className="comment-input">
            <InputGroup>
              <Form.Control
                id="comment-input"
                value={newComment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                id="comment-write-button"
                onClick={() => {
                  commentHandler(article.id, newComment);
                }}
              >
                Comment
              </Button>
            </InputGroup>
          </Modal.Footer>
        </div>
      </Modal>
      <ArticleCreate
        show={edit}
        onHide={() => setEdit(false)}
        id={article.id}
        title={articleTitle}
        content={articleContent}
        className="article-edit-card"
      />
      <Modal
        show={showDelete}
        onHide={() => {
          setShowDelete(false);
          onHide();
        }}
      >
        <Modal.Header closeButton>
          <h5>Are you sure to delete?</h5>
        </Modal.Header>
        <Modal.Footer>
          <Button
            id="delete-confirm-yes"
            onClick={() => {
              deleteArticle(article.id);
              onHide();
              setShowDelete(false);
            }}
          >
            Yes
          </Button>
          <Button
            id="delete-confirm-no"
            onClick={() => setShowDelete(false)}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isSuper: state.user.isSuper,
});

const mapDispatchToProps = (dispatch) => ({
  postComment: (id, comment) => dispatch(
    actionCreators.postComment(id, comment),
  ),
  deleteArticle: (id) => dispatch(
    actionCreators.deleteArticle(id),
  ),
  like: (id) => dispatch(
    actionCreators.putVote('like', id),
  ),
  dislike: (id) => dispatch(
    actionCreators.putVote('dislike', id),
  ),
  editTag: (id, tag) => dispatch(
    actionCreators.editArticleTag(id, tag),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleDetail);

ArticleDetail.propTypes = {
  postComment: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  editTag: PropTypes.func.isRequired,

  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  article: PropTypes.object.isRequired,
  isSuper: PropTypes.bool.isRequired,
};
