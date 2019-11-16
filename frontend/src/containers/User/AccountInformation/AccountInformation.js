/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import * as actionCreators from '../../../store/actions';

import './AccountInformation.css';

class AccountInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      newNickname: '',
      newEmail: '',
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
      validPassword: true,
      validPasswordConfirm: true,
      dataloaded: false,
    };

    const username = sessionStorage.getItem('username');

    const { history, fetchUser, loadingUser } = this.props;

    if (username === null) {
      history.push('/signin');
    } else if (loadingUser) {
      fetchUser();
    } else {
      this.state.dataloaded = true;
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.loadingUser) {
      this.setState({
        username: nextProps.storedUser.username,
        newNickname: nextProps.storedUser.nickname,
        newEmail: nextProps.storedUser.email,
        dataloaded: true,
      });
    }
  }

  render() {
    const ChangeInfoHandler = () => {
      const {
        username, newNickname, newEmail, currentPassword,
        newPassword, newPasswordConfirm,
      } = this.state;

      const { changeInfo, clearUser } = this.props;

      this.setState({
        currentPassword: '', newPassword: '', newPasswordConfirm: '',
      });

      if (newPassword.length < 8) {
        this.setState({ validPassword: false, validPasswordConfirm: true });
      } else if (newPassword !== newPasswordConfirm) {
        this.setState({ validPasswordConfirm: false, validPassword: true });
      } else {
        this.setState({ validPassword: true, validPasswordConfirm: true });
        changeInfo(username, newNickname, newEmail, currentPassword, newPassword);
        clearUser();
        this.setState({ currentPassword: '', newPassword: '', newPasswordConfirm: '' });
      }
    };
    const {
      dataloaded, validPassword, validPasswordConfirm, username, newNickname,
      newEmail, currentPassword, newPassword, newPasswordConfirm,
    } = this.state;
    const { fail } = this.props;

    const errorToAlert = () => {
      if (fail) {
        return (
          <Alert
            variant="warning"
          >
            email already exists
          </Alert>
        );
      }
      if (!validPassword) {
        return (
          <Alert
            variant="warning"
          >
            New Password should be at least 8 characters
          </Alert>
        );
      }
      if (!validPasswordConfirm) {
        return (
          <Alert
            variant="warning"
          >
            New Password and New Password Confirm are different
          </Alert>
        );
      }
      return (<p />);
    };

    return (
      !dataloaded ? <p /> : (
        <div className="AccountInformation">
          {errorToAlert()}
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-xl-9 mx-auto">
                <div className="card card-account flex-row my-5">
                  <div className="card-img-left d-none d-md-flex">
                    Image Here
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-center">Change Your Account</h5>
                    <form className="form-account">
                      <div className="username">
                        <label>{username}</label>
                      </div>
                      <hr />
                      <div className="form-label-group-account">
                        <input
                          id="username-input"
                          type="text"
                          className="form-control"
                          placeholder="username"
                          value={username}
                          onChange={(event) => this.setState({
                            username: event.target.value,
                          })}
                          required
                          autoFocus
                          disabled
                        />
                        <label>username</label>
                      </div>
                      <div className="form-label-group-account">
                        <input
                          id="nickname-input"
                          type="text"
                          className="form-control"
                          placeholder="nickname"
                          value={newNickname}
                          onChange={(event) => this.setState({
                            newNickname: event.target.value,
                          })}
                          required
                        />
                        <label>nickname</label>
                      </div>
                      <div className="form-label-group-account">
                        <input
                          type="text"
                          id="email-input"
                          className="form-control"
                          placeholder="Email address"
                          value={newEmail}
                          onChange={(event) => this.setState({
                            newEmail: event.target.value,
                          })}
                          required
                        />
                        <label>Email address</label>
                      </div>
                      <div className="form-label-group-account">
                        <input
                          type="password"
                          id="current-pw-input"
                          className="form-control"
                          placeholder="Current Password"
                          value={currentPassword}
                          onChange={(event) => this.setState({
                            currentPassword: event.target.value,
                          })}
                          required
                        />
                        <label>Current Password</label>
                      </div>
                      <div className="form-label-group-account">
                        <input
                          type="password"
                          id="new-pw-input"
                          className="form-control"
                          placeholder="New Password"
                          value={newPassword}
                          onChange={(event) => this.setState({
                            newPassword: event.target.value,
                          })}
                          required
                        />
                        <label>New Password</label>
                      </div>
                      <div className="form-label-group-account">
                        <input
                          type="password"
                          id="new-pw-confirm-input"
                          className="form-control"
                          placeholder="Confirm New Password"
                          value={newPasswordConfirm}
                          onChange={(event) => this.setState({
                            newPasswordConfirm: event.target.value,
                          })}
                          required
                        />
                        <label>Confirm New Password</label>
                      </div>
                      <hr />
                      <br />
                      <br />
                      <Button
                        id="changeInfo"
                        className="btn btn-lg btn-primary btn-block text-uppercase"
                        type="submit"
                        onClick={() => ChangeInfoHandler()}
                        disabled={!username || !newEmail || !newPassword}
                      >
                        Submit
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
  storedUser: state.user.user,
  loadingUser: state.user.loadingUser,
  fail: state.user.changeInfoFail,
});

const mapDispatchToProps = (dispatch) => ({
  changeInfo: (username, newnickname, newEmail, currentPassword, newPassword) => dispatch(
    actionCreators.changeInfo(username, newnickname, newEmail, currentPassword, newPassword),
  ),
  fetchUser: () => dispatch(
    actionCreators.fetchUser(),
  ),
  clearUser: () => dispatch(
    actionCreators.clearUser(),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AccountInformation));

AccountInformation.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  storedUser: PropTypes.object.isRequired,
  loadingUser: PropTypes.bool.isRequired,
  fail: PropTypes.bool.isRequired,
  changeInfo: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
};
