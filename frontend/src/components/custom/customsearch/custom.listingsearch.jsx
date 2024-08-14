import React, { useState } from "react";
import { Button, Input, Select, Slider, Dropdown } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import "../../../styles/custom.css";
import CertainFeatureMenu from "./certainfeature";

const ListingSearch = () => {
	const { Option } = Select;
	const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
	const [iscertainFeatureOpen, setcertainFeatureOpen] = useState(false);

	const handleAdvancedSearchClick = () => {
		setIsAdvancedSearchOpen(!isAdvancedSearchOpen);
	};

	const handleCertainFeatureClick = () => {
		setcertainFeatureOpen(!iscertainFeatureOpen);
	};

	const [bedValue, setBedValue] = useState(0);
	const [priceRange, setPriceRange] = useState([500, 1000000]);


	const handleSliderChange = (value) => {
		setPriceRange(value);
	};

	const handlebedchange = (event) => {
		setBedValue(Number(event.target.value));
	};

	return (
		<div className="first-content">
			<div className="sub-content1">
				<div className="subcontent-inputs-1">
					<input className="input-field" placeholder="Enter keyword" />
					<select className="select-field" placeholder="Location">
						<option value="option1">Location</option>
					</select>
					<select className="select-field" placeholder="Property Type">
						<option value="residential">Property Type</option>
						<option value="residential">Residential</option>
						<option value="commercial">Commercial</option>
						<option value="land">Land</option>
					</select>
					<select className="select-field" placeholder="Listing Type">
						<option value="residential"> Listing Type</option>
						<option value="for-sale">For Sale</option>
						<option value="for-rent">For Rent</option>
					</select>
					<Button className="right-button">Search</Button>
				</div>
				<div className="advance-searchdropdown">
					<div className="slider-container">
						<div className="advance-search-group1">
							<span>Price Range</span>
							<Slider
								className="searh-custom-slider"
								range
								min={500}
								max={1000000}
								step={100}
								value={priceRange}
								onChange={handleSliderChange}
								defaultValue={[500, 1000000]}
							/>
						</div>
						<div className="range-container">
							<p className="range-border">
								MIN{" "}
								<b style={{ color: "#f60000" }}>
									PHP{priceRange[0].toLocaleString()}
								</b>
							</p>
							<p className="range-border">
								MAX{" "}
								<b style={{ color: "#f60000" }}>
									PHP{priceRange[1].toLocaleString()}
								</b>
							</p>
						</div>
					</div>
					<div className="subcontent-inputs-2">
						<input className="input-field" placeholder="Enter Lot Area" />
						<select className="select-field" placeholder="Bedrooms">
							<option value="residential">Bedrooms</option>
							<option value="commercial">1</option>
							<option value="land">2</option>
						</select>
						<select className="select-field" placeholder="Bathrooms">
							<option value="residential">Bathrooms</option>
							<option value="commercial">1</option>
							<option value="land">2</option>
						</select>
						<select className="select-field" placeholder="Garage/Parking ">
							<option value="residential">Garage/Parking </option>
							<option value="commercial">1</option>
							<option value="land">2</option>
						</select>
						<Dropdown
							overlay={<CertainFeatureMenu />}
							trigger={["click"]}
							visible={iscertainFeatureOpen}
							onVisibleChange={handleCertainFeatureClick}
						>
							<Button
								className="select-field"
								onClick={handleCertainFeatureClick}
							>
								Features <CaretDownOutlined />
							</Button>
						</Dropdown>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListingSearch;
