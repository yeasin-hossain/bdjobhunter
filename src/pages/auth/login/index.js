import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { JobContext } from '../../../contenxt';
import { saveInStorage } from '../../../util/localStore';
import Spinner from '../../common/spinner';

function Login() {
  const [useInfo, setUserInfo] = useState({});
  const [spinner, setSpinner] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  const { setCurrentUser, setLoggedIn } = useContext(JobContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post(`${process.env.REACT_APP_API_URL}api/user/login`, useInfo);

      // If successfully login user, token save into localStorage
      const { token } = user.data.response;
      saveInStorage(token);
      setLoggedIn(true);
      setCurrentUser(JSON.parse(atob(token.split('.')[1])));
      // redirect to user
      history.replace(from);
    } catch (error) {
      toast.error('Email Or passWord Not Match!');
      console.log(error);
    } finally {
      setSpinner(false);
    }
  };
  return (
    <div className="d-flex justify-content-center my-5">
      {spinner && <Spinner />}
      <Card style={{ width: '50%' }}>
        <Card.Header className="d-flex justify-content-between">
          <Card.Title>Join With Us</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
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

            <Button variant="primary" type="submit">
              Login
            </Button>
            <Link className="mx-2 btn btn-warning" to="/register">
              Register?
            </Link>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
