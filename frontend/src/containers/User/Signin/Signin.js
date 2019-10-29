import React, { Component } from 'react';


import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actionCreators from '../../../store/actions/index';

class Signin extends Component {
  /* eslint-disable */
  state = {
    username: '',
    password: '',
  };
  /* eslint-disable */

  SigninHandler = () => {
    this.props.Signin(this.state.username, this.state.password);
  };

  render() {
    return (
      <div className="Signin">
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
          value={this.state.content}
          onChange={(event) => this.setState({ password: event.target.value })}
        />
        <button id="Signin-button" onClick={() => this.SigninHandler()}>
          Signin
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  Signin: (username, password) => dispatch(actionCreators.signin(username, password)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(Signin));
