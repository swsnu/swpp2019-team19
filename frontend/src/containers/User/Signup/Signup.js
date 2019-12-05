import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../../../store/actions/index';

import './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUsername: sessionStorage.getItem('username'),
      username: '',
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      validPassword: true,
      validPasswordConfirm: true,
    };
    const { loginUsername } = this.state;
    if (loginUsername !== null) {
      props.history.goBack();
    }
  }

  render() {
    const {
      username, nickname, email, password, passwordConfirm,
      validPassword, validPasswordConfirm,
      loginUsername,
    } = this.state;
    const {
      createFail, submitFail, history, signup,
    } = this.props;
    // SignupHandler에 nickname, username 등에 대한 Validation이 더 들어가야 할 것 같습니다.
    // 예를 들어 nickname이 공백인 경우 400을 반환하는게 아니라, 공백인 닉네임을 가진 유저가 생성되어서
    // length같은 기준을 정해야 할 것 같습니다.
    const SignupHandler = () => {
      this.setState({ password: '', passwordConfirm: '' });
      if (password.length < 8) {
        this.setState({ validPassword: false, validPasswordConfirm: true });
      } else if (password !== passwordConfirm) {
        this.setState({ validPasswordConfirm: false, validPassword: true });
      } else {
        this.setState({ validPassword: true, validPasswordConfirm: true });
        signup(email, username, nickname, password);
        if (!createFail && !submitFail) {
          history.push('/signin');
        }
      }
    };
    const errorToAlert = () => {
      let message = null;
      if (!validPassword) {
        message = 'Password should be at least 8 characters';
      } else if (!validPasswordConfirm) {
        message = 'Password and Password Confirm are different';
      } else if (createFail) {
        message = 'email, username or nickname already exists';
      } else if (submitFail) {
        message = 'all field must be filled';
      }
      if (message === null) {
        return (<p />);
      }
      return (
        <Alert variant="warning">{message}</Alert>
      );
    };

    return (
      loginUsername !== null ? <p /> : (
        <div className="Signup">
          {errorToAlert()}
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-xl-9 mx-auto">
                <div className="card card-signup flex-row my-5">
                  <div className="card-img-left d-none d-md-flex">
                    Image Here
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      Create Your Account!
                    </h5>
                    <form className="form-signup">
                      <div className="form-label-group-signup">
                        <input
                          id="username-input"
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          value={username}
                          onChange={(event) => this.setState({
                            username: event.target.value,
                          })}
                          required
                          // eslint-disable-next-line jsx-a11y/no-autofocus
                          autoFocus
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label>Username</label>
                      </div>
                      <hr />
                      <div className="form-label-group-signup">
                        <input
                          id="nickname-input"
                          type="text"
                          className="form-control"
                          placeholder="Nickname"
                          value={nickname}
                          onChange={(event) => this.setState({
                            nickname: event.target.value,
                          })}
                          required
                          // eslint-disable-next-line jsx-a11y/no-autofocus
                          autoFocus
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label>Nickname</label>
                      </div>
                      <hr />
                      <div className="form-label-group-signup">
                        <input
                          type="text"
                          id="email-input"
                          className="form-control"
                          placeholder="Email address"
                          value={email}
                          onChange={(event) => this.setState({
                            email: event.target.value,
                          })}
                          required
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label>Email address</label>
                      </div>
                      <hr />
                      <div className="form-label-group-signup">
                        <input
                          type="password"
                          id="pw-input"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={(event) => this.setState({
                            password: event.target.value,
                          })}
                          required
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label>Password</label>
                      </div>
                      <div className="form-label-group-signup">
                        <input
                          type="password"
                          id="pw-confirm-input"
                          className="form-control"
                          placeholder="Password"
                          value={passwordConfirm}
                          onChange={(event) => this.setState({
                            passwordConfirm: event.target.value,
                          })}
                          required
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label>Confirm password</label>
                      </div>
                      <hr />
                      <br />
                      <br />
                      <Button
                        id="Signup-button"
                        className="btn btn-lg btn-primary btn-block text-uppercase"
                        type="submit"
                        onClick={() => SignupHandler()}
                        disabled={!username || !password}
                      >
                        Signup
                      </Button>
                      <Button
                        id="direct-to-signin"
                        className="btn btn-lg btn-primary btn-block text-uppercase"
                        type="submit"
                        onClick={() => history.push('/signin')}
                      >
                        Already member of SNUBot?
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  createFail: state.user.signupCreateFail,
  submitFail: state.user.signupSubmitFail,
});

const mapDispatchToProps = (dispatch) => ({
  signup: (email, username, nickname, password) => dispatch(
    actionCreators.signup(email, username, nickname, password),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);

Signup.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  signup: PropTypes.func.isRequired,
  createFail: PropTypes.bool.isRequired,
  submitFail: PropTypes.bool.isRequired,
};
