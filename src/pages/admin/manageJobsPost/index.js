/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getFromStorage } from '../../../util/localStore';
import Job from '../../jobs/Job';

function ManageJobsPost() {
  const [allJobs, setAllJobs] = useState([]);
  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/jobs/20`, {
          headers: {
            Authorization: `Bearer ${getFromStorage()}`,
          },
        })
        .then((res) => setAllJobs(res.data.response));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateJob = async (job, data) => {
    try {
      const { _id } = job;
      const updatedJob = await axios.put(
        `${process.env.REACT_APP_API_URL}api/jobs/${_id}`,
        { status: data },
        {
          headers: {
            Authorization: `Bearer ${getFromStorage()}`,
          },
        }
      );
      console.log(updatedJob);
      const { response } = updatedJob.data;
      setAllJobs((info) =>
        info.map((PId) => {
          if (PId._id === _id) {
            // eslint-disable-next-line no-param-reassign
            PId.status = response.status;
          }
          return PId;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>NO</th>
            <th>title</th>
            <th>Company Name</th>
            <th>Location</th>
            <th>status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allJobs.map((job, index) => (
            <Job job={job} index={index} key={job._id}>
              {job.status === 'pending' ? (
                <button
                  onClick={() => updateJob(job, 'publish')}
                  type="button"
                  className="btn btn-primary"
                >
                  Publish
                </button>
              ) : (
                <button
                  onClick={() => updateJob(job, 'pending')}
                  type="button"
                  className="btn btn-primary"
                >
                  Pending
                </button>
              )}

              <Link className=" mx-2 btn btn-primary" to={`/apply/${job._id}`}>
                view
              </Link>
            </Job>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ManageJobsPost;
