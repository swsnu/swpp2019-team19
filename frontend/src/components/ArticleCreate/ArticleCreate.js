import React from 'react';
import {
  Modal, Tab, Tabs, Form, Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actionCreators from '../../store/actions';

const ArticleCreate = (props) => {
  const {
    title, content, show, onHide,
  } = props;
  const [articleTitle, setTitle] = React.useState(title);
  const [articleContent, setContent] = React.useState(content);
  const [key, setKey] = React.useState('write');

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
        <Button
          id="create-article-button"
          disabled={!articleTitle || !articleContent}
          onClick={() => {
            props.postArticle(articleTitle, articleContent);
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
});


export default connect(
  null,
  mapDispatchToProps,
)(ArticleCreate);

ArticleCreate.propTypes = {
  postArticle: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
