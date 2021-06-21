/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { JobContext } from '../../contenxt';
import { getFromStorage } from '../../util/localStore';
import Apply from './Apply';

function User() {
  const [allApply, setAllApply] = useState([]);
  const { currentUser } = useContext(JobContext);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/apply/user/${currentUser.id}`, {
        headers: {
          Authorization: `Bearer ${getFromStorage()}`,
        },
      })
      .then((res) => setAllApply(res.data.response));
  }, [currentUser.id]);
  return (
    <div className="container-fluid">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>NO</th>
            <th>status</th>
            <th>portfolioLink</th>
            <th>phone</th>
            <th>email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allApply.map((apply, index) => (
            <Apply apply={apply} index={index} key={apply._id}>
              <Link className="btn btn-primary" to={`/apply/${apply.jobId}`}>
                View
              </Link>
            </Apply>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default User;
