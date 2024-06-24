import React from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button} from "antd";

function SearchComponent() {
  return (
    <div>
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

export default SearchComponent;
