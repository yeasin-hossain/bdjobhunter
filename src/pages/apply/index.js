/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import parse from 'html-react-parser';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { JobContext } from '../../contenxt';
import { getFromStorage } from '../../util/localStore';

function Apply() {
  const { jobId } = useParams();
  const [job, setJob] = useState({});
  const { currentUser } = useContext(JobContext);
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/jobs/single/${jobId}`, {
          headers: {
            Authorization: `Bearer ${getFromStorage()}`,
          },
        })
        .then((res) => {
          setJob(res.data.response);
        });
    } catch (error) {
      console.log(error);
    }
  }, [jobId]);

  const { id, email, name, role } = currentUser;

  const applyJob = async (e) => {
    e.preventDefault();

    const { phone, portfolioLink } = userInfo;
    const applyInfo = {
      applicantId: id,
      jobId: job._id,
      email,
      name,
      portfolioLink,
      phone,
    };
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}api/apply`, applyInfo, {
        headers: {
          Authorization: `Bearer ${getFromStorage()}`,
        },
      });
      toast.success('Hurry successfully applied !');
      setUserInfo({});
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex justify-content-center my-2">
      <Card style={{ width: '80%' }} className="p-3">
        <Card.Header>
          <Card.Title>{job.title}</Card.Title>
          <Card.Text>Company Name:- {job.companyName}</Card.Text>
        </Card.Header>
        <Card.Body>
          <Card.Text>Location:- {job.location}</Card.Text>
          <Card.Text>deadline:- {job.deadline}</Card.Text>
          <Card.Text>tag:- {job.tag}</Card.Text>
          <Card.Text> {job.description && parse(job?.description)}</Card.Text>
        </Card.Body>
        {role === 'jobSeeker' && (
          <Card.Footer>
            <Button onClick={() => setShowModal(true)} variant="primary">
              Apply
            </Button>
          </Card.Footer>
        )}
      </Card>

      {/* for applying jobs */}
      <Modal show={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>Wish your Good Luck</Modal.Title>
        </Modal.Header>
        <Form onSubmit={applyJob}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="018199999"
                name="phone"
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>portfolio Link</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="example.com"
                name="portfolioLink"
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Done
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default Apply;
