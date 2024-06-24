import React, { useState } from 'react';
import { Button, Layout, Menu, Row } from 'antd';
import { MenuOutlined } from "@ant-design/icons";

import "../../../styles/header.css"

import HeaderMenu from './Menu/HeaderMenu';

const { Header } = Layout;
// const items = new Array(5).fill(null).map((_, index) => ({
//   key: index + 1,
//   label: `nav ${index + 1}`,
// }));


const HeaderContainer = ({ showDrawer, screenSize }) => {

  console.log(screenSize);
  const _swidth = screenSize;

  return (
    <Header
      style={{ background: "white" }}
      className='header'
    >
      <div className="ml-logo" style={{ display: "flex" }}>
      <a href="/">
        <img
          src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/logo@2x.png"
          alt="logo"
          width={200}
        />
        </a>
      </div>
      {
        _swidth < 1098 ?
        (
          <Button type="text" onClick={showDrawer}>
            <MenuOutlined style={{ fontSize: '20px', color: '#8C9094' }} />
          </Button>
        )
        :
        <HeaderMenu/>
      
      }
    </Header>
  )
}

export default HeaderContainer