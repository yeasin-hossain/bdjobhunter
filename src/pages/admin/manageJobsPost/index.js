/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getFromStorage } from '../../../util/localStore';
import Spinner from '../../common/spinner';
import Job from '../../jobs/Job';

function ManageJobsPost() {
  const [allJobs, setAllJobs] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/jobs/limit/${limit}`, {
          headers: {
            Authorization: `Bearer ${getFromStorage()}`,
          },
        })
        .then((res) => setAllJobs(res.data.response));
    } catch (error) {
      console.log(error);
    }
  }, [limit]);

  const updateJob = async (job, data) => {
    try {
      setSpinner(true);
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
    } finally {
      setSpinner(false);
    }
  };
  return (
    <>
      {spinner && <Spinner />}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>NO</th>
            <th>title</th>
            <th>Company Name</th>
            <th>Location</th>
            <th>Tag</th>
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
      {allJobs.length === limit && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setLimit((prev) => prev + 20)}
        >
          Lead More
        </button>
      )}
    </>
  );
}

export default ManageJobsPost;
