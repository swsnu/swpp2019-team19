import React, { Component } from 'react';
import { Button } from 'reactstrap';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actionCreators from '../../../store/actions/index';

class Signup extends Component {
  /* eslint-disable */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      validPassword: null,
      validPasswordConfirm: null
    };
  }
  /* eslint-disable */

  render() {
    const SignupHandler = () => {
      const email = this.state.email;
      const username = this.state.username;
      const password = this.state.password;
      const passwordConfirm = this.state.passwordConfirm;
      this.setState({ password: '', passwordConfirm: '' });
      if (password.length < 8) {
        this.setState({ validPassword: false, validPasswordConfirm: true });
      } else if (password !== passwordConfirm) {
        this.setState({ validPasswordConfirm: false, validPassword: true })
      } else {
        this.setState({ validPassword: true, validPasswordConfirm: true })
        this.props.signup(email, username, password);
        //this.props.history.push('/signin')
        //signup 이후에 로그인페이지로 넘어갈지 로그인 시킨채로 가려고하는 페이지로 가야할지 결정해야함
      }
    };

    return (
      <div className="Signup" >
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
            onChange={(event) => this.setState({ password: event.target.value })}
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
        {this.state.validPassword === false && <p>Password should be at least 8 characters</p>}
        {this.state.validPasswordConfirm === false && <p>Password and Password Confirm are different</p>}
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
  signup: (email, username, password) =>
    dispatch(actionCreators.signup(email, username, password)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(Signup));
