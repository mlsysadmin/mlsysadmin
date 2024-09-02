import React, { useState } from "react";


const BedInputSlider = ({value, onChange}) => {
  

  return (
    <div>
      <div className="beds-value">
        <input
          id="beds-input"
          className="beds-input"
          type="text"
          value={value}
          readOnly
        />
      </div>

      <div className="beds-slider-container">
        <input
          id="beds-slider"
          className="beds-slider"
          type="range"
          min="0"
          max="20"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default BedInputSlider;
