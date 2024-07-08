import React, { useState } from "react";


const NoOfFloorsInputSlider = () => {
  const [bedValue, setBedValue] = useState(0);

  return (
    <div>
      <div className="no-of-floors-value">
        <input
          id="no-of-floors-input"
          className="no-of-floors-input"
          type="text"
          value={bedValue}
          readOnly
        />
      </div>

      <div className="no-of-floors-slider-container">
        <input
          id="no-of-floors-slider"
          className="no-of-floors-slider"
          type="range"
          min="0"
          max="5"
          value={bedValue}
          onChange={(e) => setBedValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default NoOfFloorsInputSlider;
