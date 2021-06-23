/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { JobContext } from '../../../contenxt';
import { getFromStorage } from '../../../util/localStore';
import Apply from '../../user/Apply';

function ManageJobsApply() {
  const [allApply, setAllApply] = useState([]);
  const { currentUser } = useContext(JobContext);

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/apply/poster/${currentUser.id}`, {
          headers: {
            Authorization: `Bearer ${getFromStorage()}`,
          },
        })
        .then((res) => setAllApply(res.data.response));
    } catch (error) {
      console.log(error);
    }
  }, [currentUser.id]);

  const updateApply = async (job, data) => {
    try {
      const { _id } = job;
      const updatedApply = await axios.put(
        `${process.env.REACT_APP_API_URL}api/apply/${_id}`,
        { status: data },
        {
          headers: {
            Authorization: `Bearer ${getFromStorage()}`,
          },
        }
      );
      const { response } = updatedApply.data;
      setAllApply((info) =>
        info.map((PId) => {
          if (PId._id === _id) {
            // eslint-disable-next-line no-param-reassign
            PId.status = response.status;
          }
          return PId;
        })
      );
      toast.success('Apply Status Change Successfully');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>NO</th>
            <th>Portfolio</th>
            <th>Tag</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allApply.map((apply, index) => (
            <Apply apply={apply} index={index} key={apply._id}>
              {apply.status === 'pending' ? (
                <button
                  onClick={() => updateApply(apply, 'approved')}
                  type="button"
                  className="btn btn-primary"
                >
                  Approved
                </button>
              ) : (
                <button
                  onClick={() => updateApply(apply, 'pending')}
                  type="button"
                  className="btn btn-info"
                >
                  Pending
                </button>
              )}

              <Link className="btn btn-primary mx-2" to={`/apply/${apply.jobId}`}>
                View
              </Link>
            </Apply>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ManageJobsApply;
