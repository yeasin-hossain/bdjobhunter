import React from 'react';
import Sidebar from './sidebar';

function Admin() {
  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default Admin;
