import React from "react";
import { useState } from "react";
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select } from 'antd';
import "../../../styles/customLoggedin.css";
import CustomAdvanceSearchLoggedin from "./AdvanceSearchLoggedin";
import CustomAdvanceSearch from "../customsearch/custom.advancesearch";

const ListingSearchLoggedin = () => {
    const { Option } = Select;
    const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
    const [isAdvancedSearchOpenLoggedin, setAdvancedSearchOpenLoggedin] = useState(false);

    const handleAdvancedSearchClick = () => {
        setIsAdvancedSearchOpen(!isAdvancedSearchOpen);
    };
    const handleAdvancedSearchCertainClick = () => {
        setAdvancedSearchOpenLoggedin(!isAdvancedSearchOpenLoggedin);
    };
    return (
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
                    <Button className="right-button-advanced" onClick={handleAdvancedSearchClick}>Advanced Search</Button>
                    <Button className="right-button" icon={<SearchOutlined />}>Search</Button>
                </div>
                {isAdvancedSearchOpen && (
                    <CustomAdvanceSearch />
                )}
                 {isAdvancedSearchOpenLoggedin && (
                    <CustomAdvanceSearchLoggedin/>
                )}
                <div className="buttons">
                <Button className="left-button" onClick={handleAdvancedSearchCertainClick}>
                   - Looking for a certain features
                </Button>
            </div>
            </div>
            

        </div>
    );

}
export default ListingSearchLoggedin