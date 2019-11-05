import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actionCreators from '../../../store/actions/index';

class Signin extends Component {
  /* eslint-disable */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  /* eslint-disable */

  render() {
    const SigninHandler = () => {
      const username = this.state.username;
      const password = this.state.password;
      this.setState({ password: '' });
      this.props.signin(username, password);
    };
    return (
      <div className="Signin">
        {
          this.props.fail ?
            <Alert
              variant={'warning'}
            >username or password is wrong</Alert> :
            <p></p>
        }
        <Button
          id="direct-to-signup"
          onClick={() => this.props.history.push('/signup')}>
          go to signup page
        </Button>
        <h1>Need Signin!</h1>
        <label>username</label>
        <input
          id="username-input"
          type="text"
          value={this.state.username}
          onChange={(event) => this.setState({ username: event.target.value })}
        />
        <label>Password</label>
        <input
          id="pw-input"
          type="password"
          value={this.state.password}
          onChange={(event) => this.setState({ password: event.target.value })}
        />
        <Button
          id="Signin-button"
          onClick={() => SigninHandler()}
          disabled={!this.state.username || !this.state.password}
        >
          Signin
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  fail: state.user.signinFail,
});

const mapDispatchToProps = (dispatch) => ({
  signin: (username, password) =>
    dispatch(actionCreators.signin(username, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Signin));
