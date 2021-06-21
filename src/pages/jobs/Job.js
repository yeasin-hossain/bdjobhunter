/* eslint-disable no-unused-vars */
import React from 'react';

function Job({ job, index, children }) {
  const { title, companyName, location, description, status, tag } = job;

  return (
    <tr>
      <td data-label="No">{index + 1}</td>
      <td data-label="Title">{title}</td>
      <td data-label="Company Name">{companyName}</td>
      <td data-label="Location">{location}</td>
      <td data-label="Status">{tag}</td>
      <td data-label="Status">{status}</td>
      <td data-label="Action">{children}</td>
    </tr>
  );
}

export default Job;
