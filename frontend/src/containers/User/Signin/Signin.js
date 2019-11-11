import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Signin.css';
import * as actionCreators from '../../../store/actions/index';

class Signin extends Component {
  /* eslint-disable */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  /* eslint-disable */

  render() {
    const SigninHandler = () => {
      const username = this.state.username;
      const password = this.state.password;
      this.setState({ password: '' });
      this.props.signin(username, password);
    };
    return (
      <div className='Signin'>
        {
          this.props.fail ?
            <Alert
              variant={'warning'}
            >Uername or Password is wrong</Alert> :
            <p></p>
        }
        < div className='container' >
          <div className='row'>
            <div className='col-lg-10 col-xl-9 mx-auto'>
              <div className='card card-signin flex-row my-5'>
                <div className='card-img-left d-none d-md-flex'>
                  Image Here
              </div>
                <div className='card-body'>
                  <h5 className='card-title text-center'>Sign In</h5>
                  <form className='form-signin'>
                    <div className='form-label-group-signin'>
                      <input
                        id='username-input'
                        type='text'
                        className='form-control'
                        placeholder='Username'
                        value={this.state.username}
                        onChange={(event) => this.setState({ username: event.target.value })}
                        required autoFocus
                      />
                      <label>Username</label>
                    </div>
                    <div className='form-label-group-signin'>
                      <input
                        type='password'
                        id='pw-input'
                        className='form-control'
                        placeholder='Password'
                        value={this.state.password}
                        onChange={(event) => this.setState({ password: event.target.value })}
                        required
                      />
                      <label htmlFor='inputPassword'>Password</label>
                    </div>
                    <br />
                    <br />
                    <hr>
                    </hr>
                    <br />
                    <br />

                    <Button
                      id='Signin-button'
                      className='btn btn-lg btn-primary btn-block text-uppercase'
                      type='submit'
                      onClick={() => SigninHandler()}
                      disabled={!this.state.username || !this.state.password}
                    >Signin</Button>
                    <Button
                      id='direct-to-signup'
                      className='btn btn-lg btn-primary btn-block text-uppercase'
                      type='submit'
                      onClick={() => this.props.history.push('/signup')}>
                      Still Not a member of SNUBot?
                  </Button>

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
  fail: state.user.signinFail,
});

const mapDispatchToProps = (dispatch) => ({
  signin: (username, password) =>
    dispatch(actionCreators.signin(username, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Signin));
