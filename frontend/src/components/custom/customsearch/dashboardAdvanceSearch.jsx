import React, { useState } from "react";
import { Slider, Button } from "antd";
import "../../../styles/dashboardAdvanceSearch.css";
import CheckboxGroup from "../customAdvanceSearchLoggedin/Checkbox";

const DashboardAdvanceSearch = () => {
  const [bedValue, setBedValue] = useState(0);
  const [isAdvancedSearchOpenLoggedin, setAdvancedSearchOpenLoggedin] =
    useState(false);
  const [priceRange, setPriceRange] = useState([500, 1000000]);

  const handleSliderChange = (value) => {
    setPriceRange(value);
  };
  const bedoptions = [
    { label: 0, value: 0 },
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
    { label: 5, value: 5 },
    { label: 6, value: 6 },
    { label: 7, value: 7 },
    { label: 8, value: 8 },
    { label: 9, value: 9 },
  ];
  const handlebedchange = (event) => {
    setBedValue(event.target.value);
  };

  const handleAdvancedSearchCertainClick = () => {
    setAdvancedSearchOpenLoggedin(!isAdvancedSearchOpenLoggedin);
  };

  return (
    <div className="">
      <div
        className="dashboard-advance-search-group1"
        style={{ display: "flex", alignItems: "center" }}
      >
        <span>Price Range</span>
        <Slider
          className="dashboard-searh-custom-slider"
          range
          min={500}
          max={1000000}
          step={100}
          value={priceRange}
          onChange={handleSliderChange}
          style={{
            width: "65%",
            margin: "0 20px",
            color: "red",
            height: "10px",
          }}
          trackStyle={{ backgroundColor: 'red', height: '10px' }}
        
          railStyle={{ backgroundColor: 'pink', height: '10px',borderRadius:"30px" }}
        />
        <div
          className="slider-numbers"
          style={{ marginLeft: "20px", gap: "10px",marginTop:"15px",fontWeight:"20px" }}
        >
          <div className="from-slider">
            From:
            <span style={{ color: "red", gap: "10px" }}>
              PHP{priceRange[0]}
            </span>
          </div>
          <div className="from-slider">
            To:{" "}
            <span style={{ color: "red", gap: "10px" }}>
              PHP{priceRange[1]}
            </span>
          </div>
        </div>
      </div>
      <div className="dashboard-sub-options-search">
        <div className="dashboard-sub-options-search-beds">
          <div className="dashboard-num-of-beds-search">
            <span>Number of Beds </span>
            <select className="dashboard-bed-select" id="">
              {bedoptions.map((option) => (
                <option value={option.value} style={{ margin: "20px" }}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="dashboard-bath-num">
            <span>Number of Bath </span>
            <select className="dashboard-bed-select" id="">
              {bedoptions.map((option) => (
                <option value={option.value} style={{ margin: "20px" }}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="dashboard-garage-group">
          <span>Number of Garage</span>
          <select name="" id="">
            <option value="">1</option>
          </select>
        </div>
        <div className="dashboard-sub-options-search-bath">
          <input type="text" placeholder="Floor Area" />

          <input type="text" placeholder="Lot Area" />
          <div className="buttons"></div>
        </div>
      </div>
      {isAdvancedSearchOpenLoggedin && <CheckboxGroup />}
      <Button
        className="dashboard-left-button"
        onClick={handleAdvancedSearchCertainClick}
      >
        - Looking for a certain features
      </Button>
    </div>
  );
};
export default DashboardAdvanceSearch;
