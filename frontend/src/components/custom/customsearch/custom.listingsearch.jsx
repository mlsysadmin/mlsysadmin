import React, { useState } from "react";
import { PlusOutlined, SearchOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, Input, Select } from 'antd';
import CustomAdvanceSearch from "./custom.advancesearch";
import CertainFeatureMenu from "./certainfeature";
import AdvanceSearch from "../../../asset/icons/advanceSearch.png";
import "../../../styles/custom.css";

const ListingSearch = () => {
    const { Option } = Select;
    const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
    const [isCertainFeatureOpen, setIsCertainFeatureOpen] = useState(false);
    const [isCertainFeatureButtonIcon, setIsCertainFeatureButtonIcon] = useState(<PlusOutlined />);

    const handleAdvancedSearchClick = () => {
        setIsAdvancedSearchOpen(!isAdvancedSearchOpen);
    };

    const toggleCertainFeatureButtonIcon = () => {
        setIsCertainFeatureButtonIcon(isCertainFeatureOpen ? <PlusOutlined /> : <MinusCircleOutlined />);
    };

    const handleCertainFeatureClick = () => {
        setIsCertainFeatureOpen(!isCertainFeatureOpen);
        toggleCertainFeatureButtonIcon();
    };

    return (
        <div className="first-content">
            <div className="sub-content1">
                <div className="subcontent-inputs">
                    <Input
                        className="input-field"
                        placeholder="Enter keyword"
                        style={{ border: 'none', borderBottom: '1px solid rgba(140, 144, 148, 0.52)', outline: 'none' }}
                    />
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
                    <CustomAdvanceSearch />
                )}
            </div>
            <div className="certain-features">
                {isCertainFeatureOpen && (
                    <CertainFeatureMenu />
                )}
            </div>
            <div className="subcontent-buttons">
                <Button className="left-button" onClick={handleCertainFeatureClick}>
                    <span className="button-icon">
                        {isCertainFeatureButtonIcon}
                    </span>
                    Looking for a certain features
                </Button>
                <div className="right-buttons">
                    <Button className="right-button-advanced" onClick={handleAdvancedSearchClick}>
                        <img src={AdvanceSearch} style={{ width: "22px", margin: "0px" }} alt="Advanced Search Icon" />
                        Advanced Search
                    </Button>
                    <Button className="right-button" icon={<SearchOutlined />}>Search</Button>
                </div>
            </div>
        </div>
    );
};

export default ListingSearch;
