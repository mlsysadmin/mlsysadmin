import React, { useEffect, useState } from "react";
import { Button, Input, Select, Slider, Dropdown } from "antd";

import { CaretDownOutlined, SettingOutlined } from "@ant-design/icons";
import "../../../styles/custom.css";
import CertainFeatureMenu from "./certainfeature";
import { GetProvince } from "../../../api/Public/Location.api";
import RoundSelect from "../selects/RoundSelect.custom";
import { ListingTypes, PropertyTypes } from "../../../utils/PropertyStaticData.utils";

const ListingSearch = ({
	location,
	searchParams,
	setSearchFilters,
}) => {
	const { Option } = Select;
	const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
	const [iscertainFeatureOpen, setcertainFeatureOpen] = useState(false);
	const [getProvince, setGetProvince] = useState([]);
	const [isCustomRange, setIsCustomRange] = useState(false);

	const handleAdvancedSearchClick = () => {
		setIsAdvancedSearchOpen(!isAdvancedSearchOpen);
	};

	const handleCertainFeatureClick = () => {
		setcertainFeatureOpen(!iscertainFeatureOpen);
	};
	const handleCustomRangeClick = () => {
		setIsCustomRange(!isCustomRange);
	};

	const handleMinChange = (e) => {
		const value = e.target.value === "" ? "" : parseInt(e.target.value, 10);
		setPriceRange([value, priceRange[1]]);
	};

	const handleMaxChange = (e) => {
		const value = e.target.value === "" ? "" : parseInt(e.target.value, 10);
		setPriceRange([priceRange[0], value]);
	};

	const allProvince = async () => {
		const dataProvince = await GetProvince();
		setGetProvince(dataProvince);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				await allProvince();
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	const [bedValue, setBedValue] = useState(0);
	const [priceRange, setPriceRange] = useState([0, 100000000]);

	const handleSliderChange = (value) => {
		setPriceRange(value);
	};

	const handlebedchange = (event) => {
		setBedValue(Number(event.target.value));
	};

	const handleSearch = () => {
		setSearchFilters()
	}
	const SelectNum = () => {

		const arr = new Array(20).fill("");

		const newArr = arr.map((_, i) => {
			return {
				label: i + 1,
				value: i + 1
			}
		})

		return newArr;
	}

	const ValueGreaterThanZeroOrNull = (val, type, name, isNum) => {
		const falsy = ["", undefined, null, 0];

		if (isNum) {
			if (type == "input") {
				return !falsy.includes(val) ? val : `Enter ${name}`;
			}else if(type == "select"){
				return !falsy.includes(val) ? val : `${name}`;
			}
		}else{
			if (type == "input") {
				return !falsy.includes(val) ? val : `Enter ${name}`;
			}else if(type == "select"){
				return !falsy.includes(val) ? val : `Select ${name}`;
			}
		}
	}

	return (
		<div className="first-content">
			<div className="sub-content1">
				<div className="subcontent-inputs-1">
					<input className="input-field" placeholder="Enter keyword" value={ValueGreaterThanZeroOrNull(searchParams.keyword, "input", "Keyword", false)}/>
					{/* <select className="select-field" placeholder="Location">
						<option value="">Location</option>
						{location?.map((province, index) => (
							<option key={index} value={province.value}>
								{province.label}
							</option>
						))}
					</select> */}
					<RoundSelect
						options={location}
						classname={'select-field'}
						placeholder={'Location'}
						suffixIcon={<CaretDownOutlined />}
						value={ValueGreaterThanZeroOrNull(searchParams.location, "select", "Location", false)} />
					{/* <select className="select-field" placeholder="Property Type">
						<option value="">Property Type</option>
						<option value="residential">Residential</option>
						<option value="commercial">Commercial</option>
						<option value="land">Land</option>
					</select> */}
					<RoundSelect
						options={PropertyTypes}
						classname={'select-field'}
						placeholder={'Property Type'}
						suffixIcon={<CaretDownOutlined />}
						value={ValueGreaterThanZeroOrNull(searchParams.property_type, "select", "Property Type", false)} />
					{/* <select className="select-field" placeholder="Listing Type">
						<option value="" >
							 Listing Type
						</option>
						<option value="for-sale">For Sale</option>
						<option value="for-rent">For Rent</option>
					</select> */}
					<RoundSelect
						options={ListingTypes}
						classname={'select-field'}
						placeholder={'Listing Type'}
						suffixIcon={<CaretDownOutlined />}
						value={ValueGreaterThanZeroOrNull(searchParams.sale_type, "select", "Listing Type", false)} />
					<Button className="right-button" onClick={() => handleSearch()}>Search</Button>
				</div>
				<div className="advance-searchdropdown">
					<div className="slider-container">
						<div className="advance-search-group1">
							<span>Price Range</span>
							<Slider
								className="searh-custom-slider"
								range
								// min={0}
								// max={100000000}
								min={searchParams.price_min}
								max={searchParams.price_max}
								step={10000}
								value={priceRange}
								onChange={handleSliderChange}
								defaultValue={[0, 100000000]}
							/>
						</div>
						<div className="range-container">
							<div className="range-border">
								<p>
									MIN &nbsp;
									{isCustomRange ? (
										<span className="range-prefix">
											PHP
											<input
												type="text"
												value={priceRange[0]}
												onChange={handleMinChange}
												className="range-input"
											/>
										</span>
									) : (
										<b style={{ color: "#f60000" }}>
											PHP{priceRange[0].toLocaleString()}
										</b>
									)}
								</p>
							</div>
							<div className="range-border">
								<p>
									MAX &nbsp;
									{isCustomRange ? (
										<span className="range-prefix">
											PHP
											<input
												type="text"
												value={priceRange[1]}
												onChange={handleMaxChange}
												className="range-input"
											/>
										</span>
									) : (
										<b style={{ color: "#f60000" }}>
											PHP{priceRange[1].toLocaleString()}
										</b>
									)}
								</p>
							</div>
							<SettingOutlined
								className="custom-range-button"
								onClick={handleCustomRangeClick}
							/>
						</div>
					</div>
					<div className="subcontent-inputs-2">
						<input className="input-field" placeholder="Enter Lot Area"value={searchParams.lot_area} />
						{/* <select className="select-field" placeholder="Bedrooms">
							<option value="">Bedrooms</option>
							<option value="commercial">1</option>
							<option value="land">2</option>
						</select> */}
						<RoundSelect
							options={SelectNum()}
							classname={'select-field'}
							placeholder={'Bedrooms'}
							suffixIcon={<CaretDownOutlined />}
							value={ValueGreaterThanZeroOrNull(searchParams.bedrooms, "select", "Bedrooms", true)} />
						<RoundSelect
							options={SelectNum()}
							classname={'select-field'}
							placeholder={'Bathrooms'}
							suffixIcon={<CaretDownOutlined />}
							value={ValueGreaterThanZeroOrNull(searchParams.bathrooms, "select", "Bathrooms", true)} />
						<RoundSelect
							options={SelectNum()}
							classname={'select-field'}
							placeholder={'Garage/Parking'}
							suffixIcon={<CaretDownOutlined />}
							value={ValueGreaterThanZeroOrNull(searchParams.parking, "select", "Garage/Parking", true)} />
						{/* <select className="select-field" placeholder="Bathrooms">
							<option value="">Bathrooms</option>
							<option value="commercial">1</option>
							<option value="land">2</option>
						</select>
						<select className="select-field" placeholder="Garage/Parking ">
							<option value="">Garage/Parking </option>
							<option value="commercial">1</option>
							<option value="land">2</option>
						</select> */}
						<Dropdown
							overlay={<CertainFeatureMenu />} // The content of the dropdown
							trigger={["click"]}
							visible={iscertainFeatureOpen}
							onVisibleChange={handleCertainFeatureClick}
						>
							<div className="select-field-features">
								<span style={{ margin: "5px 0px 0px 0px" }}>Features</span>
							</div>
						</Dropdown>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListingSearch;
