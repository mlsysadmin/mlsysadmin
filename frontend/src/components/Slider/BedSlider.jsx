import React, { useState } from "react";


const BedInputSlider = () => {
  const [bedValue, setBedValue] = useState(0);

  return (
    <div>
      <div className="beds-value">
        <input
          id="beds-input"
          className="beds-input"
          type="text"
          value={bedValue}
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
          value={bedValue}
          onChange={(e) => setBedValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default BedInputSlider;
