import React, { useState } from 'react';
import { Drawer } from 'antd';
import SidebarMenu from './Menu/SidebarMenu';

const SideBar = ({ openDrawer, onClose }) => {

  return (
    <>
      <Drawer title="M Lhuillier Brokerage" onClose={onClose} open={openDrawer} className='side-bar--drawer'>
        <SidebarMenu/>
      </Drawer>
    </>
  );
};
export default SideBar;