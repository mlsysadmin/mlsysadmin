import React, { useState } from "react";


const BathroomInputSlider = () => {
  const [bedValue, setBedValue] = useState(0);

  return (
    <div>
      <div className="bathroom-value">
        <input
          id="bathroom-input"
          className="bathroom-input"
          type="text"
          value={bedValue}
          readOnly
        />
      </div>

      <div className="bathroom-slider-container">
        <input
          id="bathroom-slider"
          className="bathroom-slider"
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

export default BathroomInputSlider;
