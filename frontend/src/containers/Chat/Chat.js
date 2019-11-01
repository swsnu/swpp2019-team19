/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class Chat extends Component {
  render() {
    return (
      <div>
        <h1 className="chat">Chat</h1>
        <p className="title">Short Guide</p>
        <p>Ask anything you want to know about SNU.</p>
        <p>But... Since I&apos;m not a god,</p>
        <p>I can&apos;t tell you what I don&apos;t know.</p>
        <p>If you want to know later or make me smarter,</p>
        <p>suggest your request at here</p>
        <br />
        <Button id="direct-to-signin" onClick={() => this.props.history.push('/signin/')}>
          Go!
        </Button>
      </div>
    );
  }
}
