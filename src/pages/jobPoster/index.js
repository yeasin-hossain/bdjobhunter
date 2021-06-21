import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { managementRoutes } from '../../routes';
import ManagementRoutes from '../../routes/ManagementRoutes';
import Sidebar from './sidebar';

function JobPoster() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          {managementRoutes.map((route) => (
            <ManagementRoutes exact key={uuidv4()} path={route.path}>
              <route.component />
            </ManagementRoutes>
          ))}
          {/* <ManagementRoutes path="/management/addJob">
          <AddJob />
        </ManagementRoutes> */}
        </div>
      </div>
    </div>
  );
}

export default JobPoster;
