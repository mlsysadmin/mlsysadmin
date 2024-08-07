import React, { useState } from "react";
import "../../../styles/custom.css";

const CertainFeatureMenu = () => {
	const indoorFeatures = [
		"Alarm System",
		"Air Condition",
		"Attic",
		"Balcony",
		"Basement",
		"Broadband Internet",
		"Built-in wardrobes",
		"CCTV",
		"Central Air Conditioning",
		"Deducted Coding",
		"Deducted Vacuum",
		"Driver Room",
		"Ensuite",
		"Entertainment Room",
		"Fire Alarm",
		"Fireplace",
		"Floorboards",
		"Gym",
		"Jacuzzi",
		"Laundry Room",
		"Library",
		"Lounge",
		"Maid Room",
		"Pay TV Access",
		"Powder Room",
		"Sauna",
		"Service Area",
		"Service Kitchen",
		"Smoke Detector",
		"Split System Heating",
		"Storage Room",
		"Study Room",
		"Terrace",
		"Wifi",
	];

	const outdoorFeatures = [
		"Badminton Court",
		"Balcony",
		"Basketball Court",
		"Carport",
		"Clubhouse",
		"Courtyard",
		"Fully Fenced",
		"Function Area",
		"Garage",
		"Garden",
		"Gazebos",
		"Jacuzzi",
		"Jogging Path",
		"Lanai",
		"Landscaped Garden",
		"Multi-purpose Lawn",
		"Open Car Spaces",
		"Parks",
		"Parking Lot",
		"Playground",
		"Remote Garage",
		"Secure Parking",
		"Shower Rooms",
		"Sports Facilities",
		"Swimming Pool",
		"Tennis Court",
		"24/7 Security",
	];

	const [indoorCheckedState, setIndoorCheckedState] = useState(
		new Array(indoorFeatures.length).fill(false)
	);
	const [outdoorCheckedState, setOutdoorCheckedState] = useState(
		new Array(outdoorFeatures.length).fill(false)
	);
	const [isAllChecked, setIsAllChecked] = useState(false);

	const handleCheckboxChange = (index, setCheckedState, checkedState) => {
		const updatedCheckedState = checkedState.map((item, pos) =>
			pos === index ? !item : item
		);
		setCheckedState(updatedCheckedState);
	};

	const handleShowAllChange = () => {
		const newState = !isAllChecked;
		setIsAllChecked(newState);
		setIndoorCheckedState(new Array(indoorFeatures.length).fill(newState));
		setOutdoorCheckedState(new Array(outdoorFeatures.length).fill(newState));
	};

	const renderFeatures = (features, checkedState, setCheckedState) => {
		const numColumns = 3;
		const numRows = Math.ceil(features.length / numColumns);
		const columns = Array.from({ length: numColumns }, (_, columnIndex) =>
			features
				.slice(columnIndex * numRows, (columnIndex + 1) * numRows)
				.map((feature, index) => (
					<div className="feature-item-content" key={index}>
						<input
							type="checkbox"
							checked={checkedState[columnIndex * numRows + index]}
							onChange={() =>
								handleCheckboxChange(
									columnIndex * numRows + index,
									setCheckedState,
									checkedState
								)
							}
						/>
						<span>{feature}</span>
					</div>
				))
		);

		return (
			<div className="features-list">
				{columns.map((column, columnIndex) => (
					<div className="features-column" key={columnIndex}>
						{column}
					</div>
				))}
			</div>
		);
	};

	return (
		<div className="certain-feature-menu-container">
			<div className="show-all-container">
				<input
					type="checkbox"
					className="styled-checkbox"
					checked={isAllChecked}
					onChange={handleShowAllChange}
				/>
				<span>Show all</span>
			</div>

			<div className="features-section">
				<span className="features-header">INDOOR FEATURES</span>
				{renderFeatures(
					indoorFeatures,
					indoorCheckedState,
					setIndoorCheckedState
				)}
			</div>

			<div className="features-section">
				<span className="features-header">OUTDOOR FEATURES</span>
				{renderFeatures(
					outdoorFeatures,
					outdoorCheckedState,
					setOutdoorCheckedState
				)}
			</div>
		</div>
	);
};

export default CertainFeatureMenu;
