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
      <div className="row">
        <div className="col-md-5 col-lg-3 ">
          <div className="card m-2">
            <div className="card-header">
              <div className="card-title">Name:- {currentUser.name}</div>
              <div className="card-title">Email:- {currentUser.email}</div>
            </div>
          </div>
        </div>
        <div className="col-md-7 col-lg-9">
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
      </div>
    </div>
  );
}

export default User;
