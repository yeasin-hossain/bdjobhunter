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
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/jobs/${limit}`, {
        headers: {
          Authorization: `Bearer ${getFromStorage()}`,
        },
      })
      .then((res) => {
        console.log(res);
        setAllJobs(res.data.response);
      });
  }, [limit, setLimit]);
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>NO</th>
            <th>title</th>
            <th>Company Name</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allJobs.map((job, index) => (
            <Job job={job} index={index}>
              <Link className="btn btn-primary" to={`/apply/${job._id}`}>
                View
              </Link>
            </Job>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Jobs;
