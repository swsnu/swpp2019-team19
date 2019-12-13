import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import * as actionCreators from '../../../store/actions/index';

import './Signin.css';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUsername: sessionStorage.getItem('username'),
      username: '',
      password: '',
    };
    const { loginUsername } = this.state;
    if (loginUsername !== null) {
      props.history.goBack();
    }
  }

  render() {
    const { loginUsername, username, password } = this.state;
    const SigninHandler = () => {
      this.setState({ password: '' });
      const { signin } = this.props;
      signin(username, password);
    };
    const { fail, history } = this.props;
    return (
      loginUsername !== null ? <p /> : (
        <div className="Signin">
          {
            fail ? (
              <Alert
                variant="warning"
              >
                Username or Password is wrong
              </Alert>
            ) : <p />
          }
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-xl-9 mx-auto">
                <div className="card card-signin flex-row my-5">
                  <div className="card-img-left d-none d-md-flex" />
                  <div className="card-body">
                    <h5 className="card-title text-center">Sign In</h5>
                    <form className="form-signin">
                      <div className="form-label-group-signin">
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
                      <div className="form-label-group-signin">
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
                        <label htmlFor="inputPassword">Password</label>
                      </div>
                      <br />
                      <br />
                      <hr />
                      <br />
                      <br />

                      <Button
                        id="Signin-button"
                        className="btn btn-lg btn-primary btn-block text-uppercase"
                        type="submit"
                        onClick={() => SigninHandler()}
                        disabled={!username || !password}
                      >
                        Signin
                      </Button>
                      <Button
                        id="direct-to-signup"
                        className="btn btn-lg btn-primary btn-block text-uppercase"
                        type="submit"
                        onClick={() => history.push('/signup')}
                      >
                        Still Not a member of SNUBot?
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
  fail: state.user.signinFail,
});

const mapDispatchToProps = (dispatch) => ({
  signin: (username, password) => dispatch(
    actionCreators.signin(username, password),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Signin));

Signin.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  signin: PropTypes.func.isRequired,
  fail: PropTypes.bool.isRequired,
};
