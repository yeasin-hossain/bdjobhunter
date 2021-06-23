import React from 'react';

function Apply({ apply, index, children }) {
  const { email, status, portfolioLink, phone } = apply;
  return (
    <>
      <tr>
        <td data-label="No">{index + 1}</td>
        <td data-label="status">{status}</td>
        <td data-label="Portfolio">{portfolioLink}</td>
        <td data-label="Phone">{phone}</td>
        <td data-label="email">{email}</td>
        <td data-label="Action">{children}</td>
      </tr>
    </>
  );
}

export default Apply;
