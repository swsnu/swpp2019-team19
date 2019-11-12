import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ArticleDetail(props) {
  const ARTICLE_CONTENT_MAX_LEN = 100;
  let background;
  switch (props.article.tag) {
    case 'normal': {
      background = 'light';
      break;
    }
    case 'working': {
      background = 'warning';
      break;
    }
    case 'done': {
      background = 'success';
      break;
    }
    case 'rejected': {
      background = 'secondary';
      break;
    }
    default: break;
  }

  // normal working done rejected
  let font;
  switch (props.article.tag) {
    case 'normal': {
      font = 'dark';
      break;
    }
    default: {
      font = 'light';
      break;
    }
  }
  const content = props.article.content;
  return (
    <Card bg={background} text={font} style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{props.article.title}</Card.Title>
        <Card.Text>
          {
            content.length > 100
              ? content.substr(0, ARTICLE_CONTENT_MAX_LEN).concat('...')
              : content
          }
        </Card.Text>
        <footer className="blockquote-footer">
          <cite title="author">{props.article.author}</cite>
        </footer>
        <div className="upvote">
          <FontAwesomeIcon icon={faThumbsUp} />
          <p>{props.article.vote}</p>
        </div>
        <Button
          variant="light"
          onClick={() => this.props.history}
        >
          ...
        </Button>

      </Card.Body>
    </Card>
  )
}
