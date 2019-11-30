import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, Col, Button, Form, InputGroup,
} from 'react-bootstrap';

import PropTypes from 'prop-types';
import * as actionCreators from '../../store/actions';


const Comment = (props) => {
  const {
    author, content, editComment, deleteComment, articleId, commentId,
  } = props;
  const [edit, setEdit] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const isAuthor = (author === sessionStorage.getItem('nickname'));
  return (
    <Container className="Comment">
      <Row>
        <Col xs={3} id="comment-author">
          {author}
        </Col>
        {edit ? <div /> : (
          <Col id="comment-content">
            <h6>{content}</h6>
          </Col>
        )}
        {edit ? <div /> : (
          <Col align="right">
            {
              isAuthor
                ? (
                  <div id="author-only">
                    <Button
                      id="comment-edit-button"
                      onClick={() => setEdit(true)}
                    >
                      Edit
                    </Button>
                    {' '}
                    <Button
                      id="comment-delete-button"
                      onClick={() => deleteComment(articleId, commentId)}
                    >
                      Delete
                    </Button>
                  </div>
                )
                : <div />
            }
          </Col>
        )}
        {edit ? (
          <Col>
            <InputGroup>
              <Form.Control
                id="comment-edit"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <Button
                id="comment-edit-confirm-button"
                onClick={() => {
                  editComment(articleId, commentId, newContent);
                  setEdit(false);
                }}
              >
                Confirm
              </Button>
            </InputGroup>
          </Col>
        ) : <div />}
      </Row>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  editComment: (id, commentId, comment) => dispatch(
    actionCreators.editComment(id, commentId, comment),
  ),
  deleteComment: (articleId, commentId) => dispatch(
    actionCreators.deleteComment(articleId, commentId),
  ),
});

export default connect(
  null,
  mapDispatchToProps,
)(Comment);

Comment.propTypes = {
  editComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  articleId: PropTypes.number,
  commentId: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

Comment.defaultProps = {
  articleId: (-1),
};
