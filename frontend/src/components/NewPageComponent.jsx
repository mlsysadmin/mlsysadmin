import React from "react";
import "../styles/newpage.css";
import { useState } from "react";
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Slider } from 'antd';
import { FooterComponent, CustomMlFooter } from "../components";
import { PropertiesForRent } from "../components";
import { MainLayout, CustomAdvanceSearch } from '../components';



export const NewPageComponent = () => {
  const { Option } = Select;
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

  const handleAdvancedSearchClick = () => {
    setIsAdvancedSearchOpen(!isAdvancedSearchOpen);
  };
  return (
    <div className="newpage">
      <MainLayout />
      <div className="newpage-container">
        <div className="newpage-contents">
          <div className="first-content">
            <div className="sub-content1">
              <div className="subcontent-inputs">
                <Input className="input-field" placeholder="Enter keyword" style={{ border: 'none', borderBottom: '1px solid rgba(140, 144, 148, 0.52)', outline: 'none' }} />
                <Input className="input-field" placeholder="Location" />
                <Select className="select-field" placeholder="Property Type">
                  <Option value="residential">Residential</Option>
                  <Option value="commercial">Commercial</Option>
                  <Option value="land">Land</Option>
                </Select>
                <Select className="select-field" placeholder="Listing Type">
                  <Option value="for-sale">For Sale</Option>
                  <Option value="for-rent">For Rent</Option>
                </Select>
              </div>
              {isAdvancedSearchOpen && (
                <CustomAdvanceSearch/>
              )}
            </div>
            <div className="certain-features">
              
            </div>
            <div className="subcontent-buttons">
              <Button className="left-button">
                <span className="button-icon">
                  <PlusOutlined />
                </span>
                Looking for a certain features
              </Button>
              <div className="right-buttons">
                <Button className="right-button-advanced" onClick={handleAdvancedSearchClick}>Advanced Search</Button>
                <Button className="right-button" icon={<SearchOutlined />}>Search</Button>
              </div>
            </div>
            
          </div>
          <div className="second-content">
            <h1>New Properties for Sale/Rent</h1>
            <PropertiesForRent />        
          </div>
          <CustomMlFooter />
          <FooterComponent />
        </div>
      </div>
    </div>
  );
};
export default NewPageComponent;