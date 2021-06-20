import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              <Link
                className="nav-link mx-3"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Profile"
                to="/"
              >
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                className="nav-link mx-3"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Profile"
                to="/login"
              >
                login
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                className="nav-link mx-3"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Profile"
                to="/register"
              >
                register
              </Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
