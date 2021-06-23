/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { JobContext } from '../../../contenxt';
import { deleteJob } from '../../../util/deleteJob';
import { getFromStorage } from '../../../util/localStore';
import Job from '../../jobs/Job';

function AllJobs() {
  const { currentUser } = useContext(JobContext);
  const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/jobs/byUser/${currentUser.id}`, {
          headers: {
            Authorization: `Bearer ${getFromStorage()}`,
          },
        })
        .then((res) => setAllJobs(res.data.response));
    } catch (error) {
      console.log(error);
    }
  }, [currentUser.id]);

  const jobDelete = async (jobId) => {
    const deletedJob = await deleteJob(jobId);
    if (deletedJob.status === 200) {
      setAllJobs((prev) => prev.filter((job) => job._id !== jobId));
      toast.success('job Deleted Successfully');
    } else {
      toast.error('Something Want Wrong!');
    }
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>NO</th>
            <th>title</th>
            <th>Company Name</th>
            <th>Location</th>
            <th>tag</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allJobs.map((job, index) => (
            <Job job={job} index={index}>
              <Link className="btn btn-primary" to={`/apply/${job._id}`}>
                View
              </Link>
              <button
                onClick={() => jobDelete(job._id)}
                type="button"
                className="btn btn-warning mx-2"
              >
                Delete
              </button>
            </Job>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default AllJobs;
