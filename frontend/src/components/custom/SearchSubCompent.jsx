import React from "react";
import SearchComponent from "./SearchComponent";
import "../../styles/search.css";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select, Option } from "antd";

function SearchSubCompent() {
  const { Option } = Select;
  return (
    <div className="first-content">
      <div className="sub-content1">
        <div className="subcontent-inputs">
          <Input className="input-field" placeholder="Enter keyword" />
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
      </div>
      <div className="subcontent-buttons">
        <Button className="left-button">
          <span className="button-icon">
            <PlusOutlined />
          </span>
          Looking for a certain features
        </Button>
        <div className="right-buttons">
          <Button className="right-button-advanced">Advanced Search</Button>
          <Button className="right-button" icon={<SearchOutlined />}>
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchSubCompent;
