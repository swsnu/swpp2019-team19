/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Modal, Tab, Tabs, FormControl, Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';

const ArticleCreate = (props) => {
  const [title, setTitle] = React.useState(props.title);
  const [content, setContent] = React.useState(props.content);
  const [key, setKey] = React.useState('write');

  return (
    <Modal
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
            <Modal.Title id="contained-modal-title-vcenter">
              <FormControl
                placeholder="enter title ..."
                aria-label="article-title"
                aria-describedby="article-title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              as="textarea"
              rows="10"
              aria-label="article-content"
              placeholder="enter content ..."
              onChange={(e) => setContent(e.target.value)}
            />
          </Modal.Body>
        </Tab>

        <Tab eventKey="preview" title="Preview">
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              <h4>{title}</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{content}</p>
          </Modal.Body>
        </Tab>

      </Tabs>
      <Modal.Footer>
        <Button
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
