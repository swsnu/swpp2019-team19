import React, { Component } from 'react';


import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actionCreators from '../../../store/actions/index';

class Signin extends Component {
  state = {
    username: '',
    password: '',
  };

  componentDidMount() {
  }

  SigninHandler = () => {
    const userInfo = {
      username: this.state.username,
      password: this.state.password,
    }
    this.props.Signin(userInfo);
  };

  render() {
    return (
      <div className='Signin'>
        <h1>Need Signin!</h1>
        <label>username</label>
        <input
          id='username-input'
          type='text'
          value={this.state.username}
          onChange={event => this.setState({ username: event.target.value })}
        ></input>
        <label>Password</label>
        <input
          id='pw-input'
          type='password'
          value={this.state.content}
          onChange={event => this.setState({ password: event.target.value })}
        ></input>
        <button id='Signin-button' onClick={() => this.SigninHandler()}>
          Signin
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    Signin: userInfo => dispatch(actionCreators.signin(userInfo))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Signin));
