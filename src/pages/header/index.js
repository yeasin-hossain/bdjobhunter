import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { JobContext } from '../../contenxt';
import Logout from '../auth/logout';

function Header() {
  const { loggedIn } = useContext(JobContext);

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
            {loggedIn ? (
              <Logout />
            ) : (
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
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
