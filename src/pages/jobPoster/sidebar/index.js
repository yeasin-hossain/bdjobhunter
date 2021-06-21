import React from 'react';
import { Menu, MenuItem, ProSidebar, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div>
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem>Dashboard</MenuItem>
          <SubMenu title="Jobs">
            <MenuItem>
              <Link to="/management/addJob">add job</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/management/postedJobs">posted job</Link>
            </MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
    </div>
  );
}

export default Sidebar;
