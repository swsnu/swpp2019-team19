import React, { Component } from 'react';

import './ChatBot.css';
import { useBooleanKnob } from '@stardust-ui/react-component-event-listener';
import { Icon, Button } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actionCreators from '../../store/actions/index';
class ChatBot extends Component {
  state = {
    short_guide_state: true,
    short_guide: 'How to use SNUbot blabla',
    question: ''
  };
  render() {
    return (
      <React.Fragment>
        <div className='ChatBot'>
          <div className='row' id='chatbox-container'>
            <p>
              {this.state.short_guide_state === true ? (
                <h6 className='chat-from-server'>{this.state.short_guide}</h6>
              ) : null}
            </p>
          </div>
          <div className='row' id='input-area'>
            <input
              id='question-input-area'
              value={this.state.question}
              onChange={event =>
                this.setState({ question: event.target.value })
              }
            ></input>
            <Button
              className='submit-question-button'
              id='question-submit'
              disabled={!(this.state.question !== '')}
              onClick={this.handleShowClick}
            >
              <Icon name='question' />
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ChatBot;
