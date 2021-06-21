import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { JobContext } from '../../../contenxt';
import { saveInStorage } from '../../../util/localStore';
import Spinner from '../../common/spinner';

function Register() {
  const [isJobsPoster, setIsJobPoster] = useState(false);
  const [useInfo, setUserInfo] = useState({});
  const [spinner, setSpinner] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  const { setCurrentUser, setLoggedIn } = useContext(JobContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post(`${process.env.REACT_APP_API_URL}api/user/register`, {
        ...useInfo,
        role: isJobsPoster ? 'jobPoster' : 'jobSeeker',
      });

      const { token, role } = user.data.response;

      saveInStorage(token);
      setLoggedIn(true);
      setCurrentUser(JSON.parse(atob(user.data.response.token.split('.')[1])));

      if (role === 'jobPoster') {
        history.push('/payment');
      } else {
        history.replace(from);
      }
    } catch (error) {
      console.log(error);
      toast.error('Email Already Exist Or invalid info!');
    } finally {
      setSpinner(false);
    }
  };
  return (
    <>
      {spinner && <Spinner />}
      <div className="d-flex justify-content-center my-5">
        <Card style={{ width: '50%' }}>
          <Card.Header className="d-flex justify-content-between">
            <Card.Title>Join With Us</Card.Title>
            {/* Toggle Account Type */}
            <Button variant="primary" onClick={() => setIsJobPoster((prev) => !prev)}>
              {isJobsPoster ? 'Looking For Job' : 'Looking Talent'}
            </Button>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Jon Doe"
                  name="name"
                  onChange={(e) =>
                    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  required
                  placeholder="name@example.com"
                  name="email"
                  onChange={(e) =>
                    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <br />
                <small className="text-danger">
                  Capital Letter,small,special Character and number also minimum 8
                </small>
                <Form.Control
                  type="password"
                  required
                  placeholder="P@sW0rd - min 8"
                  name="password"
                  onChange={(e) =>
                    setUserInfo((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </Form.Group>
              {isJobsPoster && (
                <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Bd Job Hunter LTD."
                    name="companyName"
                    onChange={(e) =>
                      setUserInfo((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
              )}

              <Button variant="primary" type="submit">
                Sign Up
              </Button>
              <Link className="mx-2 btn btn-warning" to="/login">
                Already Join?
              </Link>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Register;
