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
    const session_name = sessionStorage.getItem("username");
    const session_id = sessionStorage.getItem("sessionid");
    // console.log(session_name);
    if (session_id === null) {
      this.props.history.push.history('/signin');
    }
    else {
      this.props.fetchUser();
      console.log(session_name);
      // const { username, email } = this.props.storedUser;
      // this.state.username = username;
      // console.log(this.props.user.username);
      // const { username } = this.props.storedUser;
      // this.state.username = this.props.storedUser.user;
      // console.log(username);
      // const { username } = this.props.storedUser;
      // this.state.username = username;
      // console.log(username);
      // this.setState({ username: this.props.storedUser.username + 1 });
      // this.setState({ newnickname: this.props.storedUser.nickname + 1 });
      // this.setState({ newemail: this.props.storedUser.email + 1 });
      console.log(this.state.usernaem);
      console.log(this.state.nickname);
      this.state.dataloaded = true;
    }
  }

  // componentDidMount() {
  //   this.props.fetchUser()
  //     .then(response => response.json())
  //     .then(json => {
  //       this.setState({ username: json.usernaem });
  //     });
  // }

  // getInitialState() {
  //   const { username, nickname, email } = this.props.storedUser;
  //   this.setState({ username: username });
  //   this.setState({ newnickname: nickname });
  //   this.setState({ newemail: email });
  // }
  /* eslint-disable */
  render() {
    // const user = this.props.fetchUser();
    // const { username, email } = this.props.storedUser;
    // console.log(username);
    // console.log(email);
    // this.setState({ username: username });
    // this.setState({ newemail: email });

    const ChangeInfoHandler = () => {
      // const { username, nickname, email } = this.props.storedUser;
      const username = this.props.storedUser.username;
      // const nickname = this.props.user.nickname;
      console.log(username);
      // console.log(nickname);
      // console.log(email);
      this.setState({ username: username });
      const newnickname = this.state.newnickname;
      const newemail = this.state.newemail;
      // const username = this.state.username;
      // const username = username;
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
        // console.log(username);
        // console.log(newnickname);
        // console.log(newemail);
        this.props.changeInfo(username, newnickname, newemail, currentPassword, newPassword);
      }
    };

    return (

      <div className='AccountInfo' >
        {
          this.props.fail ?
            <Alert
              variant={'warning'}
            >email or username already exists</Alert> :
            !this.state.validPassword ?
              <Alert
                variant={'warning'}
              >Password should be at least 8 characters</Alert> :
              !this.state.validPasswordConfirm ?
                <Alert
                  variant={'warning'}
                >Password and Password Confirm are different</Alert> :
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
                        value={this.state.email}
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
                      disabled={!this.state.newemail || !this.state.newPassword}
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
}

const mapStateToProps = (state) => ({
  storedUser: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  changeInfo: (username, newnickname, newemail, currentPassword, newPassword) =>
    dispatch(actionCreators.changeInfo(username, newnickname, newemail, currentPassword, newPassword)),
  fetchUser: () =>
    dispatch(actionCreators.fetchUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AccountInformation));