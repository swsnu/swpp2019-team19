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
  return (
    <>
      {(show) ? (
        <div id="sidebar-wrapper">
          <div className="sidebar-heading">
            {/* TODO : account 관련 기능들 */}
            <Row id="sidebar-account">
              {
                sessionStorage.getItem('username') === null
                  ? (
                    <Col>
                      <ButtonGroup id="not-logged-in">
                        <Button
                          onClick={() => redirectAndClose('/signin')}
                        >
                          sign in
                        </Button>
                        <Button
                          onClick={() => redirectAndClose('/signup')}
                        >
                          sign up
                        </Button>
                      </ButtonGroup>
                    </Col>
                  )
                  : (
                    <Col>
                      <ButtonGroup id="logged-in">
                        <Button
                          onClick={() => redirectAndClose('/account')}
                        >
                          account
                        </Button>
                        <Button
                          onClick={() => handleSignout()}
                        >
                          sign out
                        </Button>
                      </ButtonGroup>
                    </Col>
                  )
              }
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
              <Nav.Link
                href="http://localhost:3000/chat"
                className="nav-link-custom list-group-item list-group-item-action bg-light"
              >
                Chat
              </Nav.Link>
              <Nav.Link
                href="http://localhost:3000/boards"
                className="nav-link-custom list-group-item list-group-item-action bg-light"
              >
                Community Main
              </Nav.Link>
              <Nav.Link
                href="http://localhost:3000/boards/all"
                className="nav-link-custom list-group-item list-group-item-action bg-light"
              >
                All Board
              </Nav.Link>
              <Nav.Link
                href="http://localhost:3000/boards/hot"
                className="nav-link-custom list-group-item list-group-item-action bg-light"
              >
                Hot Board
              </Nav.Link>
            </Nav>
          </div>
          <div className="sidebar-footer">
            Footer
          </div>
        </div>
      ) : (null)}
      <Navbar className="custom-navbar" bg="dark" expand="lg">
        <Col xs={1} md={1}>
          <Button
            className="sidebar-show-button float-left"
            variant="secondary"
            onClick={handleShow}
          >
            <FontAwesomeIcon icon={faBars} size="2x" />
          </Button>
        </Col>
        <Col xs={3} md={3} />
        <Col xs={4} md={4}>
          <Navbar.Brand
            href="http://localhost:3000/chat"
          >
            <font color="yellow" size="+3">
              SNUBot
            </font>
          </Navbar.Brand>
        </Col>
        <Col xs={4} md={4} />
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
