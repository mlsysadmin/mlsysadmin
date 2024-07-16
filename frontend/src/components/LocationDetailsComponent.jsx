import React, { useState, useEffect } from "react";
import "../styles/listing-form.css";

const LocationDetailsComponent = ({ onComplete }) => {
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [mapLocation, setMapLocation] = useState("");

  const [provinceOptions, setProvinceOptions] = useState([
    { value: "", label: "Select Province/State" },
  ]);
  const [cityOptions, setCityOptions] = useState([
    { value: "", label: "Select City/Town" },
  ]);
  const [zipcodeOptions, setZipcodeOptions] = useState([
    { value: "", label: "Select Zipcode" },
  ]);

  const countryOptions = [
    { value: "", label: "Select Country" },
    { value: "USA", label: "USA" },
    { value: "Canada", label: "Canada" },
    { value: "Mexico", label: "Mexico" },
    { value: "Philippines", label: "Philippines" },
  ];

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);

    if (selectedCountry === "Philippines") {
      setProvinceOptions([
        { value: "Cebu", label: "Cebu" },
        { value: "Davao", label: "Davao" },
        { value: "Negros", label: "Negros" },
      ]);
      setCityOptions([
        { value: "Cebu City", label: "Cebu City" },
        { value: "Davao City", label: "Davao City" },
        { value: "Bacolod", label: "Bacolod" },
      ]);
      setZipcodeOptions([
        { value: "6000", label: "6000" },
        { value: "8000", label: "8000" },
        { value: "6100", label: "6100" },
      ]);
    } else if (selectedCountry === "USA") {
      setProvinceOptions([
        { value: "California", label: "California" },
        { value: "Texas", label: "Texas" },
        { value: "New York", label: "New York" },
      ]);
      setCityOptions([
        { value: "Los Angeles", label: "Los Angeles" },
        { value: "Houston", label: "Houston" },
        { value: "New York City", label: "New York City" },
      ]);
      setZipcodeOptions([
        { value: "90001", label: "90001" },
        { value: "77001", label: "77001" },
        { value: "10001", label: "10001" },
      ]);
    } else {
      setProvinceOptions([{ value: "", label: "Select Province/State" }]);
      setCityOptions([{ value: "", label: "Select City/Town" }]);
      setZipcodeOptions([{ value: "", label: "Select Zipcode" }]);
    }

    // Reset other fields
    setProvince("");
    setCity("");
    setZipcode("");
  };

  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;
    setProvince(selectedProvince);
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);
  };

  const handleZipcodeChange = (event) => {
    const selectedZipcode = event.target.value;
    setZipcode(selectedZipcode);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleMapLocationChange = (event) => {
    setMapLocation(event.target.value);
  };

  useEffect(() => {
    const isComplete = country && province && city && zipcode && address && mapLocation;
    onComplete(isComplete);
  }, [country, province, city, zipcode, address, mapLocation, onComplete]);

  return (
    <div className="location-details">
      <div className="location-label">Location</div>
      <div className="form-group-details">
        <div className="location-form-groups">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <select
            id="country"
            className="location-form-inputs"
            value={country}
            onChange={handleCountryChange}
          >
            {countryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="location-form-groups">
          <label htmlFor="province" className="form-label">
            Province/State
          </label>
          <select
            id="province"
            className="location-form-inputs"
            value={province}
            onChange={handleProvinceChange}
          >
            {provinceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="location-form-groups">
          <label htmlFor="city" className="form-label">
            City/Town
          </label>
          <select
            id="city"
            className="location-form-inputs"
            value={city}
            onChange={handleCityChange}
          >
            {cityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="location-form-groups">
          <label htmlFor="zipcode" className="form-label">
            Zipcode
          </label>
          <select
            id="zipcode"
            className="location-form-inputs"
            value={zipcode}
            onChange={handleZipcodeChange}
          >
            {zipcodeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
          <iframe
            className="google-map"
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15699.578540820406!2d123.89732826117896!3d10.350309394999337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a998dc979e57b3%3A0xac2f6149d71913f5!2sBanilad%2C%20Cebu%20City%2C%206000%20Cebu!5e0!3m2!1sen!2sph!4v1720766750192!5m2!1sen!2sph"
            width="400"
            height="300"
            style={{ border: 0, borderRadius: "30px", marginLeft: "50px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default LocationDetailsComponent;
