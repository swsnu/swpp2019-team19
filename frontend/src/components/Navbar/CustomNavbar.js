import React, { useState } from 'react';
import {
  Navbar, Col, Button, Modal, Nav,
} from 'react-bootstrap';
import './CustomNavbar.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CustomNavbar() {
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <React.Fragment>
      {(show) ? (<div show={show} onHide={handleClose} id="sidebar-wrapper">
        <div className="sidebar-heading">
          <Button className="sidebar-hide-button" variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </div>
        <div className="sidebar-body">
          <Nav id="community-group" className="flex-column list-group list-group-flush">
            <Nav.Link href="http://localhost:3000/chat" class="list-group-item list-group-item-action bg-light">Chat</Nav.Link>
            <Nav.Link href="http://localhost:3000/boards" class="list-group-item list-group-item-action bg-light">Community Main</Nav.Link>
            <Nav.Link href="http://localhost:3000/boards/all" class="list-group-item list-group-item-action bg-light">All Board</Nav.Link>
            <Nav.Link href="http://localhost:3000/boards/hot" class="list-group-item list-group-item-action bg-light">Hot Board</Nav.Link>
          </Nav>
          <Nav id="user-group" className="flex-column list-group list-group-flush">
            <Nav.Link href="http://localhost:3000/signin" class="list-group-item list-group-item-action bg-light">Sign In</Nav.Link>
            <Nav.Link href="http://localhost:3000/signup" class="list-group-item list-group-item-action bg-light">Sign Up</Nav.Link>
          </Nav>
        </div>
        <div className="sidebar-footer">
          Footer
        </div>
      </div>) : (null)}
      <Navbar className="custom-navbar" bg="dark" expand="lg">
        <Col xs={1} md={1}>
          <Button className="sidebar-show-button float-left" variant="secondary" onClick={handleShow}>
            <FontAwesomeIcon icon={faBars} size="2x" />
          </Button>
        </Col>
        <Col xs={3} md={3} />
        <Col xs={4} md={4}>
          <Navbar.Brand href="http://localhost:3000/chat"><font color="yellow" size="+3">SNUBot</font></Navbar.Brand>
        </Col>
        <Col xs={4} md={4} />
      </Navbar>
    </React.Fragment>
  );
}


export default CustomNavbar;
