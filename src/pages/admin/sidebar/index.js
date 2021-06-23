import React from 'react';
import { Menu, MenuItem, ProSidebar, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <>
      <ProSidebar className="bg-primary">
        <Menu iconShape="square">
          <MenuItem>Dashboard</MenuItem>
          <SubMenu title="Posts">
            <MenuItem>
              <Link to="/admin/manageJobsPost">Manage Job Post</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/admin/manageJobsApply">Manage Apply</Link>
            </MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
    </>
  );
}

export default Sidebar;
