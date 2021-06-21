import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { adminRoutes } from '../../routes';
import AdminRoutes from '../../routes/AdminRoutes';
import Sidebar from './sidebar';

function Admin() {
  return (
    <div>
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          {adminRoutes.map((route) => (
            <AdminRoutes exact key={uuidv4()} path={route.path}>
              <route.component />
            </AdminRoutes>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
