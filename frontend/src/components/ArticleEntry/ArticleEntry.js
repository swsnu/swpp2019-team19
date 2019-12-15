import React from 'react';
import { connect } from 'react-redux';
import { Card, Col, Badge } from 'react-bootstrap';
import { faVoteYea } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';
import ArticleDetail from '../ArticleDetail/ArticleDetail';

import * as articleAction from '../../store/actions/article';
import * as commentAction from '../../store/actions/comment';

import './ArticleEntry.css';

const ArticleEntry = (props) => {
  const ARTICLE_CONTENT_MAX_LEN = 100;
  const tagToBg = (backGroundTag) => {
    switch (backGroundTag) {
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
  const [modalShow, setModalShow] = React.useState(false);
  const [focus, setFocus] = React.useState(false);

  const {
    article,
    storedArticle,
    fetchComment,
    fetch,
  } = props;
  const {
    tag, content, title, id,
  } = article;
  const author = article.author__nickname;

  return (
    <Col className="ArticleEntry">
      <Card
        id="article-entry"
        tag="a"
        onClick={() => {
          // dispatch(fetchComment(props.article.id));
          fetchComment(id);
          fetch(id);
          setModalShow(true);
        }}
        onMouseOver={() => {
          setFocus(true);
        }}
        onMouseOut={() => {
          setFocus(false);
        }}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        text="dark"
        style={{
          width: '18rem',
          cursor: 'pointer',
          zoom: focus ? '1.05' : '1',
          transition: 'all 1.5s ease',
        }}
        className="p-3 card"
      >
        <Card.Body>
          <Badge pill variant={tagToBg(tag)}>{tag}</Badge>
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
            <FontAwesomeIcon icon={faVoteYea} />
            {' '}
            {article.vote_diff}
          </div>
        </Card.Body>
      </Card>
      {/* article modal happens here */}
      <ArticleDetail
        article={storedArticle}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          props.clearArticle();
          props.clearComment();
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
    articleAction.fetchArticle(id),
  ),
  clearArticle: () => dispatch(
    articleAction.clearArticle(),
  ),
  fetchComment: (id) => dispatch(
    commentAction.fetchComment(id),
  ),
  clearComment: () => dispatch(
    commentAction.clearComment(),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleEntry);

ArticleEntry.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  article: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  storedArticle: PropTypes.object.isRequired,
  fetch: PropTypes.func.isRequired,
  clearArticle: PropTypes.func.isRequired,
  fetchComment: PropTypes.func.isRequired,
  clearComment: PropTypes.func.isRequired,
};
