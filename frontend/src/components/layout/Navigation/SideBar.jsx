import React, { useState } from 'react';
import { Drawer } from 'antd';

const SideBar = ({ openDrawer, onClose }) => {

  return (
    <>
      <Drawer title="Basic Drawer" onClose={onClose} open={openDrawer}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
export default SideBar;