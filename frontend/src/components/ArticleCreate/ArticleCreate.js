/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Modal, Tab, Tabs, Form, Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';

const ArticleCreate = (props) => {
  const [title, setTitle] = React.useState(props.title);
  const [content, setContent] = React.useState(props.content);
  const [key, setKey] = React.useState('write');

  return (
    <Modal
      className="ArticleCreate"
      show={props.show}
      onHide={props.onHide}
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
              <h4 id="article-title">{title}</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body id="article-preview-content">
            <p id="article-content">{content}</p>
          </Modal.Body>
        </Tab>

      </Tabs>
      <Modal.Footer>
        <Button
          id="create-article-button"
          disabled={!title || !content}
          onClick={() => {
            props.postArticle(title, content);
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
