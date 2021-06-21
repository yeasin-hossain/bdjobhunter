import React from 'react';
import { Menu, MenuItem, ProSidebar, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import style from './style.scss';

function Sidebar() {
  return (
    <>
      <ProSidebar className={style.sidebar} style={{ minHeight: '100vh' }}>
        <Menu iconShape="square">
          <MenuItem>Dashboard</MenuItem>
          <SubMenu title="Posts">
            <MenuItem>
              <Link to="/admin/manageJobsPost">Manage Job Post</Link>
            </MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
    </>
  );
}

export default Sidebar;
