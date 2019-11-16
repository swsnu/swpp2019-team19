/* eslint-disable react/self-closing-comp */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { Card, Col } from 'react-bootstrap';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ArticleDetail from '../ArticleDetail/ArticleDetail';
import * as actionCreators from '../../store/actions';

import './ArticleEntry.css';

const ArticleEntry = (props) => {
  const ARTICLE_CONTENT_MAX_LEN = 100;
  const tagToBg = (tag) => {
    switch (tag) {
      case 'normal': {
        return 'light';
      }
      case 'working': {
        return 'warning';
      }
      case 'done': {
        return 'success';
      }
      case 'rejected': {
        return 'danger';
      }
      default: return '';
    }
  };

  const tagToText = (tag) => {
    switch (tag) {
      case 'working':
      case 'normal': {
        return 'dark';
      }
      default: {
        return 'light';
      }
    }
  };

  const [modalShow, setModalShow] = React.useState(false);

  const {
    tag, content, title, author,
  } = props.article;

  const dispatch = useDispatch();
  return (
    <Col className="ArticleEntry">
      <Card
        id="article-entry"
        tag="a"
        onClick={() => {
          setModalShow(true);
          dispatch(actionCreators.fetchComment(props.article.id));
          props.fetch(props.article.id);
          setModalShow(true);
        }}
        bg={tagToBg(tag)}
        text={tagToText(tag)}
        style={{ width: '18rem' }}
        className="p-3 card"
      >
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {
              content.length > 100
                ? content.substr(0, ARTICLE_CONTENT_MAX_LEN).concat('...')
                : content
            }
          </Card.Text>
          <footer className="blockquote-footer">
            <cite title="author">{author}</cite>
          </footer>
          <div className="vote-difference">
            <FontAwesomeIcon icon={faThumbsUp} />
            {props.article.vote_diff}
          </div>
        </Card.Body>
        {/* additional information in footer if needed */}
        {/* <Card.Footer>
          <small className="text-muted">{props.article.author}</small>
        </Card.Footer> */}
      </Card>
      {/* article modal happens here */}
      {/* TODO : fetch in articleDetail, not passing article as props */}
      <ArticleDetail
        article={props.storedArticle}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          dispatch(actionCreators.clearComment());
        }}
      />
    </Col>
  );
};

const mapStateToProps = (state) => ({
  storedArticle: state.article.article,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: (id) => dispatch(
    actionCreators.fetchArticle(id),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleEntry);
