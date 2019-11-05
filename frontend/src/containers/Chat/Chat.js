/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './Chat.css';

export default class Chat extends Component {
  render() {
    return (
      <div className="row vertical-center">
        <div className="col-12 align-self-center">
          <div className="card card-block w-25 mx-auto">
            <h1 className="chat">Chat</h1>
            <p className="title">Short Guide</p>
            <p>Ask anything you want to know about SNU.</p>
            <p>But... Since I&apos;m not a god,</p>
            <p>I can&apos;t tell you what I don&apos;t know.</p>
            <p>If you want to know later or make me smarter,</p>
            <br />
            <Button id="direct-to-signin" onClick={() => this.props.history.push('/signin/')}>
              Go!
            </Button>
          </div>
        </div>

      </div>
    );
  }
}
