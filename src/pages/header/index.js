import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { JobContext } from '../../contenxt';
import Logout from '../auth/logout';

function Header() {
  const { loggedIn, currentUser } = useContext(JobContext);

  const { role, paid } = currentUser;
  return (
    <>
      <Navbar bg="light" expand="lg" className="sticky-top">
        <Navbar.Brand href="#home">
          <Link
            className="nav-link "
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Logo"
            to="/"
          >
            BD JOB HUNTER
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
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
              <>
                <Nav.Link>
                  <Link
                    className="nav-link mx-3"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Profile"
                    to="/profile"
                  >
                    profile
                  </Link>
                </Nav.Link>
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
              </>
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
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Header;
