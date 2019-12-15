import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Button, Form, Container, Row, Col, InputGroup,
  ToggleButton, ToggleButtonGroup,
} from 'react-bootstrap';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';
import OutgoingMessage from '../../components/Message/OutgoingMessage';
import IncomingMessage from '../../components/Message/IncomingMessage';

import * as actionCreators from '../../store/actions';
import './Chat.css';
import '../../fonts/BMDOHYEON_ttf.ttf';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      language: 'Eng',
    };
    const { clearChatHistory, fetchCategory } = this.props;
    clearChatHistory();
    fetchCategory();
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
    const {
      chatHistory, history, sendMessage, engCategory, korCategory,
    } = this.props;
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

    const parseCategory = (category) => (
      <p>
        {category[0]}
        :
        {' '}
        {category[1]}
      </p>
    );

    const shortGuide = (categoryList) => categoryList.map(parseCategory);

    return (
      <Container>
        <Row>
          <Col xs={0} md={1} lg={2} />
          <Col xs={12} md={10} lg={8}>
            <div className="chat container">
              <div className="row vertical-center">
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
                              {
                                (language === 'Eng'
                                  ? (
                                    <>
                                      {shortGuide(engCategory)}
                                      <hr />
                                      <p>make sure to write exact words</p>
                                      <p>in wildcards[*], this is in beta</p>
                                      <hr />
                                      <p>If you want to suggest something</p>
                                    </>
                                  ) : (
                                    <>
                                      {shortGuide(korCategory)}
                                      <hr />
                                      <p>와일드카드[*]에 정확한 단어를 입력해주세요</p>
                                      <hr />
                                      <p>제안하고 싶은게 있다면?</p>
                                    </>
                                  ))
                              }
                              <Button
                                id="direct-to-boards"
                                onClick={() => history.push('/boards/')}
                              >
                                Click!
                              </Button>
                            </div>
                          ) : (chatLog)}
                        </div>
                        <div className="type_msg">
                          <div className="input_msg_write">
                            <InputGroup>
                              <ToggleButtonGroup
                                type="radio"
                                name="lang-options"
                                defaultValue={language === 'Kor' ? 1 : 0}
                              >
                                <ToggleButton
                                  id="language-english"
                                  value={0}
                                  onClick={() => this.setState({
                                    language: 'Eng',
                                  })}
                                >
                                  <h5 className="language-button-vcenter">
                                    En
                                  </h5>
                                </ToggleButton>
                                <ToggleButton
                                  id="language-korean"
                                  value={1}
                                  onClick={() => this.setState({
                                    language: 'Kor',
                                  })}
                                >
                                  <h5 className="language-button-vcenter">
                                    한
                                  </h5>
                                </ToggleButton>
                              </ToggleButtonGroup>
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
                                  if (event.key === 'Enter') {
                                    document
                                      .getElementsByClassName('msg_send_btn')[0]
                                      .click();
                                  }
                                }}
                              />
                              <Button
                                variant="link"
                                className="msg_send_btn"
                                // type="button"
                                disabled={userInput === ''}
                                onClick={() => {
                                  sendMessage(userInput, language);
                                  this.setState({ userInput: '' });
                                }}
                              // style={{ borderRadius: '45%' }}
                              >
                                <FontAwesomeIcon
                                  icon={faArrowCircleUp}
                                  size="2x"
                                />
                              </Button>
                            </InputGroup>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={0} md={1} lg={2} />
        </Row>
      </Container>
    );
  }
}


const mapStateToProps = (state) => ({
  chatHistory: state.chat.chatHistory,
  engCategory: state.chat.engCategory,
  korCategory: state.chat.korCategory,
});

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (message, language) => dispatch(
    actionCreators.sendMessage(message, language),
  ),
  clearChatHistory: () => dispatch(
    actionCreators.clearChatHistory(),
  ),
  fetchCategory: () => dispatch(
    actionCreators.fetchCategory(),
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
  engCategory: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  korCategory: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
  clearChatHistory: PropTypes.func.isRequired,
  fetchCategory: PropTypes.func.isRequired,
};
