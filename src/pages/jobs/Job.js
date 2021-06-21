/* eslint-disable no-unused-vars */
import React from 'react';

function Job({ job, index, children }) {
  const { title, companyName, location } = job;

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{title}</td>
      <td>{companyName}</td>
      <td>{location}</td>
      <td>{children}</td>
    </tr>
  );
}

export default Job;
