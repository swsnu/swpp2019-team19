import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Button, Form, Container, Row, Col,
} from 'react-bootstrap';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';
import OutgoingMessage from '../../components/Message/OutgoingMessage';
import IncomingMessage from '../../components/Message/IncomingMessage';

import * as actionCreators from '../../store/actions';
import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      language: 'Eng',
    };
    const { clearChatHistory } = this.props;
    clearChatHistory();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const boxHeight = this.msg_history.scrollHeight;
    const height = this.msg_history.clientHeight;
    const maxScrollTop = boxHeight - height;
    this.msg_history.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
    const { chatHistory, history, sendMessage } = this.props;
    const { userInput, language } = this.state;

    let counter = 0;
    const chatLog = chatHistory.map((message) => {
      counter += 1;
      if (message.from === 'user') {
        return (
          <OutgoingMessage
            key={counter}
            message={message.message}
          />
        );
      }
      return (
        <IncomingMessage
          key={counter}
          message={message.message}
        />
      );
    });

    return (
      <Container>
        <Row>
          <Col xs={0} md={2} lg={3} />
          <Col xs={12} md={8} lg={6} >
            <div className="chat container">
              <div className="row vertical-center">
                <Button
                  className="toggle-button"
                  onClick={() => (
                    (language === 'Eng')
                      ? this.setState({ language: 'Kor' })
                      : this.setState({ language: 'Eng' })
                  )}
                >
                  {language}
                </Button>
                <div className="col-12 align-self-center">
                  <div className="chat">
                    <div className="inbox_msg">
                      <div className="mesgs">
                        <div
                          className="msg_history"
                          ref={(div) => {
                            this.msg_history = div;
                          }}
                        >
                          {(chatLog.length < 1) ? (
                            <div className="short-guide">
                              <p className="title">Short Guide</p>
                              <p>Ask anything you want to know about SNU.</p>
                              <p>But... Since I&apos;m not a god,</p>
                              <p>I can&apos;t tell you what I don&apos;t know.</p>
                              <p>If you want to know later or make me smarter,</p>
                              <br />
                              <Button
                                id="direct-to-boards"
                                onClick={() => history.push('/boards/')}
                              >
                                Go!
                              </Button>
                            </div>
                          ) : (chatLog)}
                        </div>
                        <div className="type_msg">
                          <div className="input_msg_write">
                            <Form.Control
                              className="write_msg"
                              id="input-chat"
                              aria-describedby="input-chat"
                              placeholder="ask me anything..."
                              value={userInput}
                              onChange={(event) => this.setState({
                                userInput: event.target.value,
                              })}
                              onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                  document.getElementsByClassName('msg_send_btn')[0].click();
                                }
                              }}
                            />
                            <Button
                              variant="outline-dark"
                              className="msg_send_btn"
                              type="button"
                              onClick={() => {
                                sendMessage(userInput, language);
                                this.setState({ userInput: '' });
                              }}
                            >
                              <FontAwesomeIcon icon={faPaperPlane} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={0} md={2} lg={3} />
        </Row>
      </Container>
    );
  }
}


const mapStateToProps = (state) => ({
  chatHistory: state.chat.chatHistory,
});

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (message, language) => dispatch(
    actionCreators.sendMessage(message, 'default', language),
  ),
  clearChatHistory: () => dispatch(
    actionCreators.clearChatHistory(),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);

Chat.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  chatHistory: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
  clearChatHistory: PropTypes.func.isRequired,
};
