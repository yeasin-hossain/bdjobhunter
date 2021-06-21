import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { JobContext } from '../../contenxt';
import Logout from '../auth/logout';

function Header() {
  const { loggedIn, currentUser } = useContext(JobContext);

  const { role, paid } = currentUser;
  console.log(currentUser);
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand>
            <Link
              className="nav-link mx-3"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Profile"
              to="/"
            >
              Home
            </Link>
          </Navbar.Brand>
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
            {role && role === 'jobSeeker' && (
              <Nav.Link>
                <Link
                  className="nav-link mx-3"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Profile"
                  to="/jobs"
                >
                  Jobs
                </Link>
              </Nav.Link>
            )}
            {role && role === 'jobPoster' && (
              <Nav.Link>
                <Link
                  className="nav-link mx-3"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Profile"
                  to="/management/addJob"
                >
                  Job Manage
                </Link>
              </Nav.Link>
            )}
            {role && role === 'jobPoster' && !paid && (
              <Nav.Link>
                <Link
                  className="nav-link mx-3"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Profile"
                  to="/payment"
                >
                  Pay Now
                </Link>
              </Nav.Link>
            )}
            {role && role === 'admin' && (
              <Nav.Link>
                <Link
                  className="nav-link mx-3"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Profile"
                  to="/admin/manageJobsPost"
                >
                  Dashboard
                </Link>
              </Nav.Link>
            )}

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
