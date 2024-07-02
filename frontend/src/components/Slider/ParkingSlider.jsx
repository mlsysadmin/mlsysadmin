import React, { useState } from "react";


const ParkingInputSlider = () => {
  const [bedValue, setBedValue] = useState(0);

  return (
    <div>
      <div className="parking-value">
        <input
          id="parking-input"
          className="parking-input"
          type="text"
          value={bedValue}
          readOnly
        />
      </div>

      <div className="parking-slider-container">
        <input
          id="parking-slider"
          className="parking-slider"
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

export default ParkingInputSlider;
