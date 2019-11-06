/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Chat.css';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import OutgoingMessage from '../../components/Message/OutgoingMessage';
import IncomingMessage from '../../components/Message/IncomingMessage';
import getUUID from '../../components/UUID/getUUID';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
    };
  }

  render() {
    const sendMessage = (message) => {
      this.props.sendMessage(message);
    };
    const chatLog = this.props.chatHistory.map((message) => {
      if (message.from === 'user') {
        return (
          <OutgoingMessage
            key={getUUID()}
            message={message.message}
          />
        );
      }
      return (
        <IncomingMessage
          key={getUUID()}
          message={message.message}
        />
      );
    });
    return (
      <div className="chat container">
        <div className="row vertical-center">
          <div className="col-12 align-self-center">
            <div className="messaging">
              <div className="inbox_msg">
                <div className="mesgs">
                  <div className="msg_history">
                    {(chatLog.length < 1) ? (
                      <div className="short-guide">
                        <p className="title">Short Guide</p>
                        <p>Ask anything you want to know about SNU.</p>
                        <p>But... Since I&apos;m not a god,</p>
                        <p>I can&apos;t tell you what I don&apos;t know.</p>
                        <p>If you want to know later or make me smarter,</p>
                        <br />
                        <Button id="direct-to-boards" onClick={() => this.props.history.push('/boards/')}>
                          Go!
                        </Button>
                      </div>
                    ) : (chatLog)}
                  </div>
                  <div className="type_msg">
                    <div className="input_msg_write">
                      <FormControl
                        className="write_msg"
                        id="input-chat"
                        aria-describedby="input-chat"
                        placeholder="ask me anything..."
                        value={this.state.userInput}
                        onChange={(event) => this.setState({
                          userInput: event.target.value,
                        })}
                      />
                      <Button variant="outline-dark" className="msg_send_btn" type="button" onClick={() => sendMessage(this.state.userInput)}><FontAwesomeIcon icon={faPaperPlane} /></Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  chatHistory: state.chat.chatHistory,
});

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (message) => dispatch(
    actionCreators.sendMessage(message, 'default'),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
