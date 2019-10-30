import React, { Component } from 'react';
import { Button } from 'reactstrap';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actionCreators from '../../../store/actions/index';

class Signup extends Component {
  /* eslint-disable */
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };
  }
  /* eslint-disable */


  render() {
    const SignupHandler = () => {
      if (this.state.username !== '' &&
        this.state.email !== '' &&
        this.state.password !== '' &&
        this.state.username !== null &&
        this.state.email !== null &&
        this.state.password !== null &&
        (this.state.password.length >= 8) &&
        this.state.password === this.state.passwordConfirm) {
        this.props.Signup(this.state.email, this.state.username, this.state.password);
      } else {
        alert('username, email and password can not be a blank.\npassword should be more than 8 characters ');
      }
    };
    return (
      <div className="Signup">
        <Button id="direct-to-signin" onClick={() => this.props.history.push('/signin')}>
          go to signin page
        </Button>
        <h1>want Signup?</h1>
        <label>email</label>
        <input
          id="email-input"
          type="text"
          value={this.state.content}
          onChange={(event) => this.setState({ email: event.target.value })}
        />
        <label>username</label>
        <input
          id="username-input"
          type="text"
          value={this.state.username}
          onChange={(event) => this.setState({ username: event.target.value })}
        />
        <div>
          <label>Password</label>
          <input
            id="pw-input"
            type="password"
            value={this.state.content}
            onChange={(event) => this.setState({ password: event.target.value })}
          />
          <label>Password Confirm</label>
          <input
            id="pw-confirm-input"
            type="password"
            value={this.state.content}
            onChange={(event) => this.setState({ passwordConfirm: event.target.value })}
          />
        </div>
        <Button id="Signup-button" onClick={() => SignupHandler()}>
          Signup
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  Signup: (email, username, password) => dispatch(actionCreators.signup(email, username, password)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(Signup));
