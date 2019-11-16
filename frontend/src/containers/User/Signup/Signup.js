/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import * as actionCreators from '../../../store/actions/index';

import './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUsername: sessionStorage.getItem('username'),
      username: '',
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
    const SignupHandler = () => {
      const {
        email, username, password, passwordConfirm,
      } = this.state;
      const { signup, history } = this.props;
      this.setState({ password: '', passwordConfirm: '' });
      if (password.length < 8) {
        this.setState({ validPassword: false, validPasswordConfirm: true });
      } else if (password !== passwordConfirm) {
        this.setState({ validPasswordConfirm: false, validPassword: true });
      } else {
        this.setState({ validPassword: true, validPasswordConfirm: true });
        signup(email, username, password);
        history.push('/signin');
      }
    };


    const {
      username, email, password, passwordConfirm,
      validPassword, validPasswordConfirm,
      loginUsername,
    } = this.state;
    const { fail, history } = this.props;

    const errorToAlert = () => {
      if (fail) {
        return (
          <Alert
            variant="warning"
          >
            email or username already exists
          </Alert>
        );
      }
      if (!validPassword) {
        return (
          <Alert
            variant="warning"
          >
            Password should be at least 8 characters
          </Alert>
        );
      }
      if (!validPasswordConfirm) {
        return (
          <Alert
            variant="warning"
          >
            Password and Password Confirm are different
          </Alert>
        );
      }
      return (<p />);
    };

    return (
      loginUsername === null ? <p /> : (
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
                    <h5 className="card-title text-center">Create Your Account!</h5>
                    <form className="form-signup">
                      <div className="form-label-group-signup">
                        <input
                          id="username-input"
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          value={username}
                          onChange={(event) => this.setState({ username: event.target.value })}
                          required
                          autoFocus
                        />
                        <label>Username</label>
                      </div>
                      <hr />
                      <div className="form-label-group-signup">
                        <input
                          type="text"
                          id="email-input"
                          className="form-control"
                          placeholder="Email address"
                          value={email}
                          onChange={(event) => this.setState({ email: event.target.value })}
                          required
                        />
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
                          onChange={(event) => this.setState({ password: event.target.value })}
                          required
                        />
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
  fail: state.user.signupFail,
});

const mapDispatchToProps = (dispatch) => ({
  signup: (email, username, password) => dispatch(
    actionCreators.signup(email, username, password),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Signup));

Signup.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  signup: PropTypes.func.isRequired,
  fail: PropTypes.bool.isRequired,
};
