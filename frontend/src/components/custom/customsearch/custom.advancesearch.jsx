import React from "react";
import {Slider } from 'antd';
import "../../../styles/customadvancesearch.css";

const CustomAdvanceSearch = () => {
    return(
    <div className="advance-searchdropdown">
        <div className="advance-search-group1">
            <span>Price Range</span>
            <Slider
                className="searh-custom-slider"
                min={500}
                max={1000000}
                step={100}
                style={{ width: '900px' }}
            />
            <p>From <b>PHP500</b> To <b>PHP1,000,000,000</b> </p>
        </div>

        <div className="sub-options-search">
            <div className="sub-options-search-beds">
                <div className="num-of-beds-search">
                    <span>Number of Beds </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* <input type="number" style={{ border: 'none', borderBottom: '1px solid rgba(140, 144, 148, 0.52)', outline: 'none', width:'20%' }} /> */}
                    <div style={{ position: 'relative', display: 'inline-block', width: '20%' }}>
                        <input
                            type="text"
                            style={{
                                border: 'none',
                                borderBottom: '1px solid rgba(140, 144, 148, 0.52)',
                                outline: 'none',
                                // width: '100%',
                                paddingRight: '20px',
                                appearance: 'none',
                                WebkitAppearance: 'none',
                                MozAppearance: 'none',
                                fontSize: '13px'
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '180px',
                            transform: 'translateY(-50%)',
                            width: '0',
                            height: '0',
                            borderLeft: '5px solid transparent',
                            borderRight: '5px solid transparent',
                            borderTop: '5px solid #ff0000',
                        }}>

                        </div>
                    </div>
                </div>
                <div className="garage-group">
                    <span>Number of Garage</span>
                    <input type="text" placeholder="Floor Area"
                        style={{
                            border: 'none',
                            borderBottom: '1px solid rgba(140, 144, 148, 0.52)',
                            outline: 'none',
                            paddingRight: '20px',
                            margin: '0px 0px 0px 60px',
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            fontSize: '13px'
                        }} />
                </div>

            </div>

            <div className="sub-options-search-bath">
                <div className="bath-num">
                    <span>Number of Bath </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div style={{ position: 'relative', display: 'inline-block', width: '20%' }}>
                        <input
                            type="text"
                            style={{
                                border: 'none',
                                borderBottom: '1px solid rgba(140, 144, 148, 0.52)',
                                outline: 'none',
                                // width: '100%',
                                paddingRight: '20px',
                                appearance: 'none',
                                WebkitAppearance: 'none',
                                MozAppearance: 'none',
                                fontSize: '13px'
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '180px',
                            transform: 'translateY(-50%)',
                            width: '0',
                            height: '0',
                            borderLeft: '5px solid transparent',
                            borderRight: '5px solid transparent',
                            borderTop: '5px solid #ff0000',
                            // Red arrow color
                        }}>
                        </div>

                    </div>
                </div>
                <div className="garage-group">
                    <input type="text" placeholder="Lot Area"
                        style={{
                            border: 'none',
                            borderBottom: '1px solid rgba(140, 144, 148, 0.52)',
                            outline: 'none',
                            paddingRight: '20px',
                            margin: '0px 0px 0px 60px', // Add some padding to make space for the arrow
                            appearance: 'none', // Removes default dropdown arrow
                            WebkitAppearance: 'none', // For Safari compatibility
                            MozAppearance: 'none',
                            fontSize: '13px'  // For Firefox compatibility
                        }} />
                </div>
            </div>
        </div>
    </div>
    );
}
export default CustomAdvanceSearch