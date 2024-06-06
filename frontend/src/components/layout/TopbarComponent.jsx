import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Drawer } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useMediaQuery } from "react-responsive";
import mllogo from "../../asset/icons/mllogo.png";
import "../../styles/topnavbar.css";

const { Header } = Layout;

const TopbarComponent = () => {
  const [visible, setVisible] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    setVisible(isMobile);
  }, [isMobile]);

  const menuItems = [
    'Sell',
    'New',
    'Rent',
    'Buy',
    'Home Loan',
    'Home Insurance',
    'Other Services',
    'Contact',
    'Login / Register',
    {
      label: 'List Your Property',
      buttonStyle: { backgroundColor: '#FF0000', border: 'none' },
    },
  ];

  const toggleDrawer = () => {
    setVisible(!visible);
  };

  return (
    <Header className="dashboard-navbar">
      <div className="navbar-group">
        <img src={mllogo} alt="mllogo" />
        {isMobile ? (
          <>
            <div className="drawer-icon" onClick={toggleDrawer}>
            {visible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <Drawer
              title="Menu"
              placement="right"c
              onClose={toggleDrawer}
              visible={visible}
              className="menu-drawer"
            >
              <Menu theme="light" mode="vertical">
                {menuItems.map((item, index) => (
                  <Menu.Item key={index} style={typeof item === 'object' ? item.buttonStyle : {}}>
                    {typeof item === 'object' ? (
                      <Button type="primary" style={item.buttonStyle}>
                        {item.label}
                      </Button>
                    ) : (
                      <span>{item}</span>
                    )}
                  </Menu.Item>
                ))}
              </Menu>
            </Drawer>
          </>
        ) : (
          <Menu theme="light" mode="horizontal">
            {menuItems.map((item, index) => (
              <Menu.Item key={index} style={typeof item === 'object' ? item.buttonStyle : {}}>
                {typeof item === 'object' ? (
                  <Button type="primary" style={item.buttonStyle}>
                    {item.label}
                  </Button>
                ) : (
                  <span>{item}</span>
                )}
              </Menu.Item>
            ))}
          </Menu>
        )}
      </div>
    </Header>
  );
};

export default TopbarComponent