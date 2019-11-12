/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Card } from 'react-bootstrap';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ArticleDetail from '../ArticleDetail/ArticleDetail';

export default function ArticleEntry(props) {
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

  return (
    <div id="article-card" className="w-25 h-25 p-3">
      <Card
        tag="a"
        onClick={() => setModalShow(true)}
        bg={tagToBg(tag)}
        text={tagToText(tag)}
        style={{ width: '18rem' }}
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
      <ArticleDetail
        article={props.article}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
