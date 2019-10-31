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
      if (this.state.password.length < 8) {
        alert('Password should be at least 8 characters');
      } else if (this.state.password !== this.state.passwordConfirm) {
        alert('Password and Password Confirm are not same');
      } else {
        this.props.Signup(this.state.email, this.state.username, this.state.password);
      }
      this.setState({ password: '', passwordConfirm: '' });
    };
    return (
      <div className="Signup">
        <Button
          id="direct-to-signin"
          onClick={() => this.props.history.push('/signin')}>
          go to signin page
        </Button>
        <h1>want Signup?</h1>
        <label>email</label>
        <input
          id="email-input"
          type="text"
          value={this.state.email}
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
            value={this.state.password}
            onChange={(event) => this.setState({
              password: event.target.value
            })}
          />
          <label>Password Confirm</label>
          <input
            id="pw-confirm-input"
            type="password"
            value={this.state.passwordConfirm}
            onChange={(event) => this.setState({
              passwordConfirm: event.target.value
            })}
          />
        </div>
        <Button
          id="Signup-button"
          onClick={() => SignupHandler()}
          disabled={
            !this.state.username || !this.state.email ||
            !this.state.password || !this.state.passwordConfirm
          }
        >
          Signup
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  Signup: (email, username, password) =>
    dispatch(actionCreators.signup(email, username, password)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(Signup));
