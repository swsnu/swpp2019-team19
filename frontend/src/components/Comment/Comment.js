import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import PropTypes from 'prop-types';


const Comment = (props) => {
  const { author, content } = props;
  return (
    <Container className="Comment">
      <Row>
        <Col xs={3} id="comment-author">
          {author}
        </Col>
        <Col id="comment-content">
          <h6>{content}</h6>
        </Col>
      </Row>
    </Container>
  );
};
export default Comment;

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
