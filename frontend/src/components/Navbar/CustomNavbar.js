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
    <>
      <Navbar className="custom-navbar" expand="lg">
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
      <Modal show={show} onHide={handleClose} id="sidebar-wrapper">
        <Modal.Header className="sidebar-heading">
          <Modal.Title>Logged State</Modal.Title>
          <Button className="sidebar-hide-button" variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body className="sidebar-body">
          <Nav id="community-group" className="flex-column">
            <Nav.Link href="http://localhost:3000/chat">Chat</Nav.Link>
            <Nav.Link href="http://localhost:3000/boards">Community Main</Nav.Link>
            <Nav.Link href="http://localhost:3000/boards/all">All Board</Nav.Link>
            <Nav.Link href="http://localhost:3000/boards/hot">Hot Board</Nav.Link>
          </Nav>
          <Nav id="user-group" className="flex-column">
            <Nav.Link href="http://localhost:3000/signin">Sign In</Nav.Link>
            <Nav.Link href="http://localhost:3000/signup">Sign Up</Nav.Link>
          </Nav>
        </Modal.Body>
        <Modal.Footer className="sidebar-footer">
          Footer
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default CustomNavbar;
