import React from 'react';

function Apply({ apply, index, children }) {
  const { email, status, portfolioLink, phone } = apply;
  return (
    <>
      <tr>
        <td data-label="No">{index + 1}</td>
        <td data-label="Company Name">{status}</td>
        <td data-label="Company Name">{portfolioLink}</td>
        <td data-label="Company Name">{phone}</td>
        <td data-label="Location">{email}</td>
        <td data-label="Action">{children}</td>
      </tr>
    </>
  );
}

export default Apply;
