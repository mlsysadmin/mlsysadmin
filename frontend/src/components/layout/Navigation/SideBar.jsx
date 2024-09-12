import React, { useState } from 'react';
import { Drawer } from 'antd';
import SidebarMenu from './Menu/SidebarMenu';

const SideBar = ({ openDrawer, onClose, setOpenDrawer }) => {

  return (
    <>
      <Drawer 
      title="M Lhuillier Brokerage" 
      onClose={onClose} 
      open={openDrawer} 
      className='side-bar--drawer'
      
      >
        <SidebarMenu setOpenDrawer={setOpenDrawer}/>
      </Drawer>
    </>
  );
};
export default SideBar;