import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Navbar, Row, Col, Button, Nav, ButtonGroup,
} from 'react-bootstrap';
import { faBars, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';
import './CustomNavbar.css';

import * as actionCreators from '../../store/actions/user';

function CustomNavbar(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSignout = () => {
    props.signout();
    setShow(false);
  };
  const redirectAndClose = (url) => {
    props.history.push(url);
    setShow(false);
  };

  const makeNavLink = (url, display) => (
    <Nav.Link
      onClick={() => redirectAndClose(`/${url}`)}
      className="nav-link-custom list-group-item list-group-item-action bg-light"
    >
      {display}
    </Nav.Link>
  );
  return (
    <>
      {(show) ? (
        <div id="sidebar-wrapper">
          <div className="sidebar-heading">
            <Row id="sidebar-account">
              <Col>
                {
                  sessionStorage.getItem('username') === null
                    ? (
                      <ButtonGroup id="not-logged-in">
                        <Button
                          id="signin-button"
                          onClick={() => redirectAndClose('/signin')}
                        >
                          sign in
                        </Button>
                        <Button
                          id="signup-button"
                          onClick={() => redirectAndClose('/signup')}
                        >
                          sign up
                        </Button>
                      </ButtonGroup>
                    )
                    : (
                      <ButtonGroup id="logged-in">
                        <Button
                          id="account-button"
                          onClick={() => redirectAndClose('/account')}
                        >
                          account
                        </Button>
                        <Button
                          id="signout-button"
                          onClick={() => handleSignout()}
                        >
                          sign out
                        </Button>
                      </ButtonGroup>
                    )
                }
              </Col>
              <Button
                className="sidebar-hide-button"
                variant="link"
                onClick={handleClose}
              >
                <FontAwesomeIcon icon={faWindowClose} size="2x" />
              </Button>
            </Row>
          </div>
          <div className="sidebar-body">
            <Nav
              id="community-group"
              className="flex-column list-group list-group-flush"
            >
              {makeNavLink('chat', 'Chat')}
              {makeNavLink('boards', 'Community Main')}
              {makeNavLink('boards/hot', 'Hot Board')}
              {makeNavLink('boards/all', 'All Board')}
            </Nav>
          </div>
        </div>
      ) : (null)}
      <Navbar className="custom-navbar" bg="dark" expand="lg">
        <Col>
          <Button
            className="sidebar-show-button float-left"
            variant="link"
            onClick={handleShow}
          >
            <FontAwesomeIcon icon={faBars} size="2x" />
          </Button>
        </Col>
        <Col xs={4} sm={6} md={8} lg={10} xl={10}>
          <Navbar.Brand
            onClick={() => redirectAndClose('/chat')}
            style={{
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <font color="yellow" size="+3">
              SNUBot
            </font>
          </Navbar.Brand>
        </Col>
        <Col />
      </Navbar>
    </>
  );
}


const mapDispatchToProps = (dispatch) => ({
  signout: () => dispatch(
    actionCreators.signout(),
  ),
});

export default connect(
  null,
  mapDispatchToProps,
)(CustomNavbar);

CustomNavbar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  signout: PropTypes.func.isRequired,
};
