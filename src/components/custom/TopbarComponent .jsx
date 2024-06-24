import React from "react";
import mllogo from "../../asset/icons/mllogo.png";
import { Button, Layout, Menu } from 'antd';
import "../../styles/topnavbar.css";

const { Header } = Layout;

const TopbarComponent = () => {
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

  return (
    <Header className="dashboard-navbar">
      <div className="navbar-group">
        <img src={mllogo} alt="mllogo" />
        <Menu className="menu" theme="light" mode="horizontal">
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
      </div>
    </Header>
  );
};

export default TopbarComponent