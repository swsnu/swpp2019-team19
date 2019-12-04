import React, { useState } from 'react';
import {
  Modal, Tab, Tabs, Form, Button, Alert,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actionCreators from '../../store/actions';

const ArticleCreate = (props) => {
  const {
    id, title, content, show, onHide, postArticle, editArticle,
  } = props;
  const [articleTitle, setTitle] = useState(title);
  const [articleContent, setContent] = useState(content);
  const [key, setKey] = useState('write');

  const requiresLogin = (sessionStorage.getItem('username') === null);
  console.log(show)

  if (show) {
    if (articleTitle === '' && articleTitle !== title) {
      setTitle(title);
    }
    if (articleContent === '' && articleContent !== content) {
      setContent(content);
    }
  }

  return (
    <Modal
      className="ArticleCreate"
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Tabs
        id="write-preview-tab"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >

        <Tab eventKey="write" title="Write">
          <Modal.Header>
            <Modal.Title id="article-write-title">
              <Form.Control
                placeholder="enter title ..."
                aria-label="article-title"
                id="article-title-input"
                value={articleTitle}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body id="article-write-content">
            <Form.Control
              as="textarea"
              rows="10"
              aria-label="article-content"
              id="article-content-input"
              placeholder="enter content ..."
              value={articleContent}
              onChange={(e) => setContent(e.target.value)}
            />
          </Modal.Body>
        </Tab>

        <Tab eventKey="preview" title="Preview">
          <Modal.Header>
            <Modal.Title id="article-preview-title">
              <h4 id="article-title">{articleTitle}</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body id="article-preview-content">
            <p id="article-content">{articleContent}</p>
          </Modal.Body>
        </Tab>

      </Tabs>
      <Modal.Footer>
        {
          requiresLogin
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
        <Button
          id="create-article-button"
          disabled={!articleTitle || !articleContent || requiresLogin}
          onClick={() => {
            if (id === -1) {
              postArticle(articleTitle, articleContent);
            } else {
              editArticle(id, articleTitle, articleContent);
            }
            props.onHide();
            setTitle('');
            setContent('');
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


const mapDispatchToProps = (dispatch) => ({
  postArticle: (title, content) => dispatch(
    actionCreators.postArticle(title, content),
  ),
  editArticle: (id, title, content) => dispatch(
    actionCreators.editArticle(id, title, content),
  ),
});


export default connect(
  null,
  mapDispatchToProps,
)(ArticleCreate);

ArticleCreate.propTypes = {
  postArticle: PropTypes.func.isRequired,
  editArticle: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  id: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
};

ArticleCreate.defaultProps = {
  id: (-1),
  title: '',
  content: '',
};
