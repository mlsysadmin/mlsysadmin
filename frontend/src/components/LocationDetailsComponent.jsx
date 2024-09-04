import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/listing-form.css";
import { GetCities, GetProvince, GetCountry } from "../api/Public/Location.api";
import  "../styles/ViewListing.module.css";

const LocationDetailsComponent = ({ onComplete, setPropertyFields }) => {
	const [getCountry, setGetCountry] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(""); // New state for selected country
	const [getProvince, setGetProvince] = useState([]);
	const [selectedProvince, setSelectedProvince] = useState(""); // New state for selected province
	const [getCities, setGetCities] = useState([]);
	const [selectedCity, setSelectedCity] = useState(""); // New state for selected city
	const [subdivision, setSubdivision] = useState("");
	const [zipcode, setZipcode] = useState("");
	const [address, setAddress] = useState("");
	const [mapLocation, setMapLocation] = useState("");
	const [position, setPosition] = useState([10.3414, 123.9125]); // Default position for Banilad

	const allCountries = async () => {
		const datares = await GetCountry();
		setGetCountry(datares);
		console.log("These are countries:", datares);
	};

	const allCities = async () => {
		const datarescities = await GetCities();
		setGetCities(datarescities);
		console.log("These are cities:", datarescities);
	};

	const allProvince = async () => {
		const dataresprovince = await GetProvince();
		setGetProvince(dataresprovince);
		console.log("These are provinces:", dataresprovince);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				await Promise.all([allCountries(), allCities(), allProvince()]);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const handleAddressChange = (e) => {
		const { name, value } = e.target;
		switch (name) {
			case "country":
				setSelectedCountry(value); // Store the selected country name
				break;
			case "province":
				setSelectedProvince(value); // Store the selected province name
				break;
			case "city":
				setSelectedCity(value); // Store the selected city name
				break;
			case "zipcode":
				setZipcode(value);
				break;
			case "address":
				setAddress(value);
				break;
			default:
				break;
		}
	};

	const handleMapLocationChange = async (event) => {
		const location = event.target.value;
		setMapLocation(location);

		// Geocode the address to get coordinates
		const response = await fetch(
			`https://nominatim.openstreetmap.org/search?format=json&q=${location}`
		);
		const data = await response.json();

		if (data && data.length > 0) {
			const { lat, lon } = data[0];
			setPosition([parseFloat(lat), parseFloat(lon)]);
		}
	};

	useEffect(() => {
		const isComplete =
			selectedCountry &&
			selectedProvince &&
			selectedCity &&
			zipcode &&
			address &&
			mapLocation;
		onComplete(isComplete);

		if (isComplete) {
			setPropertyFields({
				location: {
					subdivision,
					city: selectedCity,
					province: selectedProvince,
					other: selectedCountry,
					zipcode: zipcode,
					map_location: mapLocation,
				},
			});
		}
	}, [
		selectedCountry,
		selectedProvince,
		selectedCity,
		zipcode,
		address,
		mapLocation,
		subdivision,
		onComplete,
	]);

	return (
		<div className="location-details">
			<div className="location-label">Location</div>
			<div className="form-group-details">
				<div className="location-form-groups">
					<label htmlFor="country" className="form-label">
						Country
					</label>
					<select
						name="country"
						id="country"
						placeholder="Select Country"
						className="location-form-inputs"
						value={selectedCountry}
						onChange={handleAddressChange}
					>
						<option value="">Select Country</option>
						{getCountry.map((country, index) => (
							<option key={index} value={country.name}>
								{country.name}
							</option>
						))}
					</select>
				</div>
				<div className="location-form-groups">
					<label htmlFor="province" className="form-label">
						Province/State
					</label>
					<select
						name="province"
						id="province"
						className="location-form-inputs"
						value={selectedProvince}
						onChange={handleAddressChange}
					>
						<option value="">Select Province</option>
						{getProvince.map((province, index) => (
							<option key={index} value={province.name}>
								{province.name}
							</option>
						))}
					</select>
				</div>
				<div className="location-form-groups">
					<label htmlFor="city" className="form-label">
						City/Town
					</label>
					<select
						name="city"
						id="city"
						className="location-form-inputs"
						value={selectedCity}
						onChange={handleAddressChange}
					>
						<option value="">Select City</option>
						{getCities.map((city, index) => (
							<option key={index} value={city.name}>
								{city.name}
							</option>
						))}
					</select>
				</div>
				<div className="location-form-groups">
					<label htmlFor="zipcode" className="form-label">
						Zipcode
					</label>
					<input
						type="text"
						name="zipcode"
						id="zipcode"
						className="location-form-inputs"
						value={zipcode}
						onChange={handleAddressChange}
					/>
				</div>
			</div>
			<div className="below-div">
				<div className="end-form-group">
					<label htmlFor="address" className="second-form-label">
						House No/Unit/Building Name/Street
					</label>
					<input
						type="text"
						id="address"
						name="address"
						className="form-input"
						placeholder="Enter House No/Unit/Building Name/Street"
						value={address}
						onChange={handleAddressChange}
					/>
				</div>
				<div className="end-form-group">
					<label htmlFor="map-location" className="second-form-labels">
						Map Location
					</label>
					<input
						type="text"
						id="map-location"
						className="form-input"
						placeholder="Enter Map Location"
						value={mapLocation}
						onChange={handleMapLocationChange}
					/>
				</div>
				<div className="embedd-map">
					<MapContainer
						center={position}
						zoom={13}
						
					>
						<TileLayer
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						/>
						<Circle center={position} radius={500} />
					</MapContainer>
				</div>
			</div>
		</div>
	);
};


export default LocationDetailsComponent;
