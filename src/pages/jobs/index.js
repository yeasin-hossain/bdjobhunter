/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getFromStorage } from '../../util/localStore';
import Job from './Job';

function Jobs() {
  const [allJobs, setAllJobs] = useState([]);
  const [limit, setLimit] = useState(20);
  const [filter, setFilter] = useState('backend');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/jobs/tag/${filter}/${limit}`, {
        headers: {
          Authorization: `Bearer ${getFromStorage()}`,
        },
      })
      .then((res) => {
        const publishedJob = res.data.response.filter((job) => job.status === 'publish');
        setAllJobs(publishedJob);
      });
  }, [filter, limit]);

  return (
    <div className=" d-flex justify-content-center flex-column p-5">
      <div className="py-3">
        <p>Filter by your choice</p>
        <select
          className="form-select form control"
          onClick={(e) => setFilter(e.target.value)}
          aria-label="Default select example"
        >
          <option value="backend">backend</option>
          <option value="frontend">frontend</option>
          <option value="fullStack">fullStack</option>
        </select>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>NO</th>
            <th>title</th>
            <th>Company Name</th>
            <th>Location</th>
            <th>Tag</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allJobs.map((job, index) => (
            <Job job={job} index={index} key={job._id}>
              <Link className="btn btn-primary" to={`/apply/${job._id}`}>
                View
              </Link>
            </Job>
          ))}
        </tbody>
      </Table>
      <div>
        {allJobs.length >= limit && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setLimit((prev) => prev + 20)}
          >
            Lead More
          </button>
        )}
      </div>
    </div>
  );
}

export default Jobs;
