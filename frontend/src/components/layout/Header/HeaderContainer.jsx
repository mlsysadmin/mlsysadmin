import React, { useState } from 'react';

import "../../../styles/header.css"
import { Breadcrumb, Button, Col, Layout, Menu, Row, theme } from 'antd';

const { Header } = Layout;
// const items = new Array(5).fill(null).map((_, index) => ({
//   key: index + 1,
//   label: `nav ${index + 1}`,
// }));
const MenuItems = [
    { name: "Sell",  }, { name: "New", }, { name: "Rent" }, { name: "Buy" }, { name: "Home Loan" }, { name: "Home Insurance" }, { name: "Other Services" }, { name: "Contact" },
]
const items = MenuItems.map((item, index) => ({
    key: item.name,
    label: item.name,
    
  }));


const HeaderContainer = () => {
    const [currentMenu, setCurrent] = useState('');
    
    const handleMenuOnClick = (menu) => {
        console.log(menu);        
        setCurrent(menu.key)
    }
  return (
    <Header
        style={{ background: "white" }}
        className='header'
      >
        <div className="demo-logo" style={{ display:"flex" }}>
            <img 
                src="https://anima-uploads.s3.amazonaws.com/projects/64e41d552340cba66b90f01a/releases/64e41e67e1c2a81b98b3c871/img/logo@2x.png" 
                alt="logo"
                width={200}
            />
        </div>
        <Menu
          mode="horizontal"
          items={items}
          selectedKeys={[currentMenu]}
          onClick={handleMenuOnClick}
          style={{
            flex: 1,
            justifyContent:"end",
            borderBottom: "none",
          }}
          className='header--menu'
        ></Menu>
        <Row align={"middle"}>
            <Button style={{ color:"#D90000" }} type='text'>Login</Button>
            <div style={{ color:"#D90000" }}>/</div>
            <Button style={{ color:"#D90000" }} type='text'>Register</Button>
        </Row>
        <Row>
            <Button type='primary' shape='round'
                style={{ background: "#D90000" }}
            >List your Property</Button>
        </Row>
      </Header>
  )
}

export default HeaderContainer