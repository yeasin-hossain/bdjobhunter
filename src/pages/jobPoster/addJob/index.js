import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import CKEditors from 'react-ckeditor-component';
import { toast } from 'react-toastify';
import { JobContext } from '../../../contenxt';
import { getFromStorage, saveInStorage } from '../../../util/localStore';
import Spinner from '../../common/spinner';

function AddJob() {
  const [jobInfo, setJobInfo] = useState({ tag: 'frontend' });
  const [spinner, setSpinner] = useState(false);

  const { currentUser, setCurrentUser } = useContext(JobContext);
  const { id, companyName, postLimit } = currentUser;

  const saveJob = async (e) => {
    e.preventDefault();
    try {
      setSpinner(true);
      await axios.post(
        `${process.env.REACT_APP_API_URL}api/jobs`,
        { ...jobInfo, jobPosterId: id, companyName },
        {
          headers: {
            Authorization: `Bearer ${getFromStorage()}`,
          },
        }
      );
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}api/user/${id}`,
        { postLimit: postLimit - 1 },
        {
          headers: {
            Authorization: `Bearer ${getFromStorage()}`,
          },
        }
      );
      setJobInfo({});
      saveInStorage(response.data.response.token);
      setCurrentUser(JSON.parse(atob(response.data.response.token.split('.')[1])));
      toast.success('job post Successfully, please wait for admin approval');
    } catch (error) {
      console.log(error);
      toast.error('Something want wrong please try again later');
    } finally {
      setSpinner(false);
    }
  };
  return (
    <div>
      {spinner && <Spinner />}
      <Form onSubmit={saveJob}>
        <Form.Group className="mb-3">
          <Form.Label>job title</Form.Label>
          <Form.Control
            name="title"
            value={jobInfo.title || ''}
            onChange={(e) => setJobInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
            type="text"
            placeholder="Full-stack developer"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>job Category</Form.Label>
          <select
            name="tag"
            onClick={(e) => setJobInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
            className="form-select form-control"
            aria-label="Default select example"
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullStack">FullStack</option>
          </select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>job location</Form.Label>
          <Form.Control
            name="location"
            value={jobInfo.location || ''}
            onChange={(e) => setJobInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
            type="text"
            placeholder="Full-stack developer"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>job deadline</Form.Label>
          <Form.Control
            name="deadline"
            value={jobInfo.deadline || ''}
            onChange={(e) => setJobInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
            type="date"
            placeholder="Full-stack developer"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Job description</Form.Label>
          <CKEditors
            activeclassName="p10"
            content={jobInfo.description || ''}
            events={{
              change: (data) =>
                setJobInfo((Prev) => ({ ...Prev, description: data.editor.getData() })),
            }}
          />
        </Form.Group>
        {postLimit > 0 ? <Button type="submit">Save</Button> : <Button>Pay</Button>}
        <p>reaming post {postLimit}</p>
      </Form>
    </div>
  );
}

export default AddJob;
