import React, { useState } from "react";
import { Slider } from 'antd';
import "../../../styles/custom.css";

const CustomAdvanceSearch = () => {
    const [bedValue, setBedValue] = useState(0);
    const [sliderValue, setSliderValue] = useState([500, 1000000]);

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

    const handleSliderChange = (value) => {
        setSliderValue(value);
    };

    return (
        <div className="advance-searchdropdown">
            <div className="slider-container" >
                <span style={{ marginRight: '10px' ,fontWeight:'bold'}}>Price Range</span>
                <Slider
                    range
                    min={500}
                    max={1000000}
                    defaultValue={[500, 1000000]}
                    value={sliderValue}
                    onChange={handleSliderChange}
                    style={{ flex: 1 }}
                />
                <div className="slider-labels" >
                    <p style={{color:'black'}}>From
                    <span style={{ color: 'red' }}> {sliderValue[0]}</span></p>
                    <p style={{color:'black'}}>To
                    <span style={{ color: 'red' }}> {sliderValue[1]}</span></p>
                </div>
            </div>

            <div className="sub-options-search">
                <div className="sub-options-search-beds">
                    <div className="num-of-beds-search">
                        <span>Number of Beds </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <select className="bed-select" id="" style={{
                            width: '200px',
                            height: '30px',
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            border: 'none',
                            borderBottom: '1px solid rgba(140, 144, 148, 0.52)',
                            outline: 'none',
                            fontSize: '13px',
                            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z' fill='%23ff0000'/%3E%3C/svg%3E") no-repeat right center`,
                            paddingRight: '30px',
                        }}>
                            {
                                bedoptions.map(option => (
                                    <option key={option.value} value={option.value} style={{ margin: '20px' }}>{option.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="garage-group">
                        <span>Number of Garage</span>
                        <input type="text" placeholder="Floor Area" />
                    </div>
                </div>

                <div className="sub-options-search-bath">
                    <div className="bath-num">
                        <span>Number of Bath </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <select className="bed-select" id="" style={{
                            width: '200px',
                            height: '30px',
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            border: 'none',
                            borderBottom: '1px solid rgba(140, 144, 148, 0.52)',
                            outline: 'none',
                            fontSize: '13px',
                            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z' fill='%23ff0000'/%3E%3C/svg%3E") no-repeat right center`,
                            paddingRight: '30px',
                        }}>
                            {
                                bedoptions.map(option => (
                                    <option key={option.value} value={option.value} style={{ margin: '20px' }}>{option.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="garage-group">
                        <input type="text" placeholder="Lot Area" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomAdvanceSearch;
