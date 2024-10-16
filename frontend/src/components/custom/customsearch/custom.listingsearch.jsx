import React, { useEffect, useState } from "react";
import { Button, Input, Select, Slider, Dropdown, Tooltip } from "antd";

import { CaretDownOutlined, SettingOutlined } from "@ant-design/icons";
import "../../../styles/custom.css";
import CertainFeatureMenu from "./certainfeature";
import { GetProvince } from "../../../api/Public/Location.api";
import RoundSelect from "../selects/RoundSelect.custom";
import { ListingTypes, PropertyTypes } from "../../../utils/PropertyStaticData.utils";
import { CapitalizeString } from "../../../utils/StringFunctions.utils";
import { useNavigate } from "react-router-dom";

const ListingSearch = ({
	location,
	searchParams,
	setSearchFilters,
}) => {

	const navigate = useNavigate();

	const { Option } = Select;
	const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
	const [iscertainFeatureOpen, setcertainFeatureOpen] = useState(false);
	const [getProvince, setGetProvince] = useState([]);
	const [isCustomRange, setIsCustomRange] = useState(false);
	const [checkFeatures, setCheckFeatures] = useState([]);

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
		// console.log("val", val);


		if (isNum) {
			if (type == "input") {
				return !falsy.includes(val) ? val : ``;
			} else if (type == "select") {
				return !falsy.includes(val) ? val : `${name}`;
			}
		} else {
			if (type == "input") {
				return !falsy.includes(val) ? CapitalizeString(val) : null;
			} else if (type == "select") {
				return !falsy.includes(val) ? CapitalizeString(val) : `Select ${name}`;
			}
		}
	}
	const [newSearchParams, setNewSearchParams] = useState();
	const [keywordSearch, setKeywordSearch] = useState();

	useEffect(() => {

		console.log('newSearchParams', newSearchParams);
		let params = {};
		const keys = Object.keys(searchParams);

		keys.forEach((key, i) => {
			params[key] = searchParams[key]
		})
		setNewSearchParams(params);

	}, [searchParams])

	const HandleFieldChange = (e, name) => {
		// const newArr = [...searchFilters];
		SetParamsAllField(name, e.target.value)
	}

	const handleSearchClick = () => {
		let params = "";

		newSearchParams.forEach((item, key) => {

			if (key == 0) {
				if (item.name === "features") {
					const indoorFeatures = item.value.filter(
						(feature) => feature.name === "indoor"
					);
					const outdoorFeatures = item.value.filter(
						(feature) => feature.name === "outdoor"
					);

					if (indoorFeatures.length > 0) {
						const indoorValues = indoorFeatures
							.map((feature) => feature.value)
							.join(",");
						params += `&indoor=${indoorValues}`;
					}

					if (outdoorFeatures.length > 0) {
						const outdoorValues = outdoorFeatures
							.map((feature) => feature.value)
							.join(",");
						if (params.length > 0) {
							params += `&outdoor=${outdoorValues}`;
						} else {
							params += `&outdoor=${outdoorValues}`;
						}
					}
				} else {
					params += `${item.name}=${item.value}`;
				}
			} else {
				if (item.name === "features") {
					const indoorFeatures = item.value.filter(
						(feature) => feature.name === "indoor"
					);
					const outdoorFeatures = item.value.filter(
						(feature) => feature.name === "outdoor"
					);

					if (indoorFeatures.length > 0) {
						const indoorValues = indoorFeatures
							.map((feature) => feature.value)
							.join(",");
						params += `&indoor=${indoorValues}`;
					}

					if (outdoorFeatures.length > 0) {
						const outdoorValues = outdoorFeatures
							.map((feature) => feature.value)
							.join(",");
						if (params.length > 0) {
							params += `&outdoor=${outdoorValues}`;
						} else {
							params += `&outdoor=${outdoorValues}`;
						}
					}
				} else {
					params += `&${item.name}=${item.value}`;
				}
			}
		});
		console.log("params: ", params);

		navigate(`/search/?${params}`);
		// navigate('/all')
	};

	const onSelectionChange = (value, name) => {
		console.log(value, name);
		
		SetParamsAllField(name, value);
	};

	const SetParamsAllField = (name, value) => {

		setNewSearchParams((prevState) => {
			
			return { ...prevState, [name]: value };
		})
		// setNewSearchParams((prevSearchParams) => {
		// 	console.log("prev", prevSearchParams);

		// 	const existingParamIndex = prevSearchParams.findIndex(
		// 		(param) => param.name === name
		// 	);

		// 	if (existingParamIndex !== -1) {
		// 		if (
		// 			// (name === "keyword" && value === "") ||
		// 			(name === "keyword" && value.includes(null, undefined, "")) ||
		// 			(name === "features" && checkFeatures.length === 0)
		// 		) {
		// 			prevSearchParams.splice(existingParamIndex, 1);
		// 		} else {
		// 			prevSearchParams[existingParamIndex].value = value;
		// 		}
		// 	} else {
		// 		if (
		// 			(name === "keyword" && value === "") ||
		// 			(name === "features" && checkFeatures.length === 0)
		// 		) {
		// 			prevSearchParams.splice(existingParamIndex, 1);
		// 		} else {
		// 			prevSearchParams.push({ name, value });
		// 		}
		// 	}
		// 	console.log("prevSearchParams: ", prevSearchParams);
		// 	return [...prevSearchParams];
		// });
	};

	const onInputChange = (e) => {
		setKeywordSearch(e.target.value);
	};

	const onInputBlur = () => {
		SetParamsAllField("keyword", keywordSearch);
	};

	return (
		<div className="first-content">
			<div className="sub-content1">
				<div className="subcontent-inputs-1">
					<input
						className="input-field"
						placeholder="Enter keyword"
						value={ValueGreaterThanZeroOrNull(newSearchParams['keyword'], "input", "Keyword", false)}
						onChange={(e) => HandleFieldChange(e, "keyword")}
					/>
					<RoundSelect
						options={location}
						classname={'select-field'}
						placeholder={'Location'}
						suffixIcon={<CaretDownOutlined />}
						value={ValueGreaterThanZeroOrNull(newSearchParams['location'], "select", "Location", false)} 
						// value={newSearchParams['location']}
						onSelectionChange={(e) => onSelectionChange(e, 'location')}
					/>
					<RoundSelect
						options={PropertyTypes}
						classname={'select-field'}
						placeholder={'Property Type'}
						suffixIcon={<CaretDownOutlined />}
						value={ValueGreaterThanZeroOrNull(newSearchParams["property_type"], "select", "Property Type", false)} 
						onSelectionChange={(e) => onSelectionChange(e, 'property_type')}/>
					<RoundSelect
						options={ListingTypes}
						classname={'select-field'}
						placeholder={'Listing Type'}
						suffixIcon={<CaretDownOutlined />}
						value={ValueGreaterThanZeroOrNull(newSearchParams["sale_type"], "select", "Listing Type", false)}
						onSelectionChange={(e) => onSelectionChange(e, 'sale_type')} />
					<Button className="right-button" onClick={() => handleSearchClick}>Search</Button>
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
								min={newSearchParams["price_min"]}
								max={newSearchParams["price_max"]}
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
											<span style={{ marginRight: '2px' }}>PHP</span>
											<input
												type="text"
												value={priceRange[0]}
												onChange={handleMinChange}
												className="range-input"
											/>
										</span>
									) : (
										<b style={{ color: "#f60000" }}>
											PHP{' '}{priceRange[0].toLocaleString()}
										</b>
									)}
								</p>
							</div>
							<div className="range-border">
								<p>
									MAX &nbsp;
									{isCustomRange ? (
										<span className="range-prefix">
											<span style={{ marginRight: '2px' }}>PHP</span>
											<input
												type="text"
												value={priceRange[1]}
												onChange={handleMaxChange}
												className="range-input"
											/>
										</span>
									) : (
										<b style={{ color: "#f60000" }}>
											PHP{' '}{priceRange[1].toLocaleString()}
										</b>
									)}
								</p>
							</div>
							<Tooltip title="Custom Price Range" placement="topLeft">
								<SettingOutlined
									className="custom-range-button"
									onClick={handleCustomRangeClick}
								/>
							</Tooltip>
						</div>
					</div>
					<div className="subcontent-inputs-2">
						<input className="input-field" placeholder="Enter Lot Area" value={newSearchParams["lot_area"]} />
						<RoundSelect
							options={SelectNum()}
							classname={'select-field'}
							placeholder={'Bedrooms'}
							suffixIcon={<CaretDownOutlined />}
							value={ValueGreaterThanZeroOrNull(newSearchParams["bedrooms"], "select", "Bedrooms", true)} />
						<RoundSelect
							options={SelectNum()}
							classname={'select-field'}
							placeholder={'Bathrooms'}
							suffixIcon={<CaretDownOutlined />}
							value={ValueGreaterThanZeroOrNull(newSearchParams["bathrooms"], "select", "Bathrooms", true)} />
						<RoundSelect
							options={SelectNum()}
							classname={'select-field'}
							placeholder={'Garage/Parking'}
							suffixIcon={<CaretDownOutlined />}
							value={ValueGreaterThanZeroOrNull(newSearchParams["parking"], "select", "Garage/Parking", true)} />
						<Dropdown
							menu={<CertainFeatureMenu setCheckFeatures={setCheckFeatures} />} // The content of the dropdown
							trigger={["click"]}
							open={iscertainFeatureOpen}
							onOpenChange={handleCertainFeatureClick}
						>
							<div className="select-field-features">
								<span>Features</span>
							</div>
						</Dropdown>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListingSearch;
