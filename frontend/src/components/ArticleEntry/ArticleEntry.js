import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { Card, Col } from 'react-bootstrap';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';
import ArticleDetail from '../ArticleDetail/ArticleDetail';

import * as actionCreators from '../../store/actions';

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

  const tagToText = (textTag) => {
    switch (textTag) {
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
  const [focus, setFocus] = React.useState(false);

  const { article, storedArticle } = props;
  const {
    tag, content, title,
  } = article;
  const author = article.author__nickname;

  const dispatch = useDispatch();
  return (
    <Col className="ArticleEntry">
      <Card
        id="article-entry"
        tag="a"
        onClick={() => {
          dispatch(actionCreators.fetchComment(props.article.id));
          props.fetch(props.article.id);
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
        bg={tagToBg(tag)}
        text={tagToText(tag)}
        style={{
          width: '18rem',
          cursor: 'pointer',
          zoom: focus ? '1.05' : '1',
          transition: 'all 1.5s ease',
        }}
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
    actionCreators.fetchArticle(id),
  ),
  clearArticle: () => dispatch(
    actionCreators.clearArticle(),
  ),
  clearComment: () => dispatch(
    actionCreators.clearComment(),
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
  clearComment: PropTypes.func.isRequired,
};
