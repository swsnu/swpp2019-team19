/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actionCreators from '../../../store/actions';

import './AccountInformation.css';

class AccountInformation extends Component {
  /* eslint-disable */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      newnickname: '',
      newemail: '',
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
      validPassword: true,
      validPasswordConfirm: true,
      dataloaded: false,
    };

    const session_id = sessionStorage.getItem("sessionid");

    if (session_id === null) {
      this.props.history.push('/signin');
    }
    else if (this.props.loadingUser) {
      this.props.fetchUser();
    }
    else {
      this.state.dataloaded = true;
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.loadingUser) {
      this.setState({
        username: nextProps.storedUser.username,
        newnickname: nextProps.storedUser.nickname,
        newemail: nextProps.storedUser.email,
        dataloaded: true,
      });
    }
  }

  /* eslint-disable */
  render() {
    const ChangeInfoHandler = () => {
      const username = this.state.username;
      const newnickname = this.state.newnickname;
      const newemail = this.state.newemail;
      const currentPassword = this.state.currentPassword;
      const newPassword = this.state.newPassword;

      const newPasswordConfirm = this.state.newPasswordConfirm;
      this.setState({ currentPassword: '', newPassword: '', newPasswordConfirm: '' });

      if (newPassword.length < 8) {
        this.setState({ validPassword: false, validPasswordConfirm: true });
      } else if (newPassword !== newPasswordConfirm) {
        this.setState({ validPasswordConfirm: false, validPassword: true })
      } else {
        this.setState({ validPassword: true, validPasswordConfirm: true })
        this.props.changeInfo(username, newnickname, newemail, currentPassword, newPassword);
        this.props.clearUser();
        this.setState({ currentPassword: '', newPassword: '', newPasswordConfirm: '' });

      }
    };

    if (this.state.dataloaded) {
      return (
        <div className='AccountInformation' >
          {
            this.props.fail ?
              <Alert
                variant={'warning'}
              >email already exists</Alert> :
              !this.state.validPassword ?
                <Alert
                  variant={'warning'}
                >New Password should be at least 8 characters</Alert> :
                !this.state.validPasswordConfirm ?
                  <Alert
                    variant={'warning'}
                  >New Password and New Password Confirm are different</Alert> :
                  <p></p>
          }
          < div className='container' >
            <div className='row'>
              <div className='col-lg-10 col-xl-9 mx-auto'>
                <div className='card card-account flex-row my-5'>
                  <div className='card-img-left d-none d-md-flex'>
                    Image Here
                </div>
                  <div className='card-body'>
                    <h5 className='card-title text-center'>Change Your Account</h5>
                    <form className='form-account'>
                      <div className='username'>
                        <label>{this.state.username}</label>
                      </div>
                      <hr></hr>
                      <div className='form-label-group-account'>
                        <input
                          id='username-input'
                          type='text'
                          className='form-control'
                          placeholder='username'
                          value={this.state.username}
                          onChange={(event) => this.setState({ username: event.target.value })}
                          required autoFocus
                          disabled
                        />
                        <label>username</label>
                      </div>
                      <div className='form-label-group-account'>
                        <input
                          id='nickname-input'
                          type='text'
                          className='form-control'
                          placeholder='nickname'
                          value={this.state.newnickname}
                          onChange={(event) => this.setState({ newnickname: event.target.value })}
                          required
                        />
                        <label>nickname</label>
                      </div>
                      <div className='form-label-group-account'>
                        <input
                          type='text'
                          id='email-input'
                          className='form-control'
                          placeholder='Email address'
                          value={this.state.newemail}
                          onChange={(event) => this.setState({ newemail: event.target.value })}
                          required />
                        <label>Email address</label>
                      </div>
                      <div className='form-label-group-account'>
                        <input
                          type='password'
                          id='current-pw-input'
                          className='form-control'
                          placeholder='Current Password'
                          value={this.state.currentPassword}
                          onChange={(event) => this.setState({ currentPassword: event.target.value })}
                          required
                        />
                        <label>Current Password</label>
                      </div>
                      <div className='form-label-group-account'>
                        <input
                          type='password'
                          id='new-pw-input'
                          className='form-control'
                          placeholder='New Password'
                          value={this.state.newPassword}
                          onChange={(event) => this.setState({ newPassword: event.target.value })}
                          required
                        />
                        <label>New Password</label>
                      </div>
                      <div className='form-label-group-account'>
                        <input
                          type='password'
                          id='new-pw-confirm-input'
                          className='form-control'
                          placeholder='Confirm New Password'
                          value={this.state.newPasswordConfirm}
                          onChange={(event) => this.setState({ newPasswordConfirm: event.target.value })}
                          required
                        />
                        <label>Confirm New Password</label>
                      </div>
                      <hr>
                      </hr>
                      <br />
                      <br />
                      <Button
                        id='changeInfo'
                        className='btn btn-lg btn-primary btn-block text-uppercase'
                        type='submit'
                        onClick={() => ChangeInfoHandler()}
                        disabled={!this.state.username || !this.state.newemail || !this.state.newPassword}
                      >Submit</Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div >
        </div>
      );
    }
    else
      return <p></p>
  }
}

const mapStateToProps = (state) => ({
  storedUser: state.user.user,
  loadingUser: state.user.loadingUser,
  fail: state.user.changeInfoFail,
});

const mapDispatchToProps = (dispatch) => ({
  changeInfo: (username, newnickname, newemail, currentPassword, newPassword) =>
    dispatch(actionCreators.changeInfo(username, newnickname, newemail, currentPassword, newPassword)),
  fetchUser: () =>
    dispatch(actionCreators.fetchUser()),
  clearUser: () =>
    dispatch(actionCreators.clearUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AccountInformation));
