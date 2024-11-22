import React, { useState } from "react";


const ParkingInputSlider = ({value,onChange}) => {
  return (
		<div className="parking-group">
			<div className="parking-slider-container">
				<input
					id="parking-slider"
					className="parking-slider"
					type="range"
					min="0"
					max="5"
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
			</div>
		</div>
	);
};

export default ParkingInputSlider;
