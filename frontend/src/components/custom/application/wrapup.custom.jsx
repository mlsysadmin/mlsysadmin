import React, { useState, useMemo } from "react";
import "../../../styles/wrapupdetails.css";
import InputLock from "../../../assets/inputlock.png";
import { Dropdown, Menu } from "antd";
import countryList from "react-select-country-list";
import { Country, State, City } from "country-state-city";
import { DownOutlined } from "@ant-design/icons";

const WrapUpDetails = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [incomeType, setIncomeType] = useState("");
  const [targetValue, setTargetvalue] = useState("");
  // const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const countryOptions = useMemo(() => countryList().getData(), []);

  
  const handleFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastname = (e) => {
    setLastname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleIncomeType = (value) => {
    setIncomeType(value);
  };
  const handleTargetvalue = (value) => {
    setTargetvalue(value);
  };

  const handleCountryChange = (value) => {
    const selectedOption = countryOptions.find(
      (option) => option.value === value
    );
    setSelectedCountry(selectedOption.label);
  
    const states = State.getStatesOfCountry(selectedOption.value);
    const stateOptions = states.map((state) => ({
      value: state.isoCode,
      label: state.name,
    }));
    setStateOptions(stateOptions);
    setSelectedState("");
    setCityOptions([]);
  };
  
  const handleStateChange = async (key) => {
    try {
      const selectedState = stateOptions.find((state) => state.value === key);
      setSelectedState(selectedState.label);
  
      const cities = await City.getCitiesOfState(selectedState.value);
      if (cities.length > 0) {
        const cityOptions = cities.map((city) => ({
          value: city.name,
          label: city.name,
        }));
        setCityOptions(cityOptions);
        setSelectedCity(null);
      } else {
        setCityOptions([{ value: 'no_cities', label: 'No cities available' }]);
        setSelectedCity('no_cities');
      }
    } catch (error) {
      console.error('Error retrieving city options:', error);
      setCityOptions([{ value: 'error', label: 'Error loading city options' }]);
      setSelectedCity('error');
    }
  };
  
  const handleCityChange = (key) => {
    const selectedCity = cityOptions.find((city) => city.value === key);
    setSelectedCity(selectedCity.label);
  };
  
  const sourceOptions = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
  ];
  const incomeTypeOptions = [
    "Salary/Pay/Wage/Commission",
    "Business Income/Self Employment(valid Id & IRT)",
    "Pension for Retiree(valid Id & IRT) ",
    "Regular Remittance Abroad(valid Id & IRT)",
  ];

  return (
    <div className="wrap-up-inf">
      <h3>Wrap Up</h3>
      <span className="protect-tagline">
        Your information is protected by SSL encryption.
      </span>
      <div className="prop-content2-wrap-up">
        <div className="mobile-address-group">
          <span className="label">Mobile Address</span>
          <input type="text" className="wrap-up-input" placeholder="09" />
          <img src={InputLock} alt="Secure" className="input-lock" />
          <span className="secure-text">SECURE</span>
        </div>
        <div className="email-address-group">
          <span className="label">Email Address</span>
          <input
            type="text"
            className="wrap-up-input"
            placeholder="Email Address"
          />
          <img src={InputLock} alt="Secure" className="input-lock" />
          <span className="secure-text">SECURE</span>
        </div>
        <div className="lastname-group">
          <span className="label">Last Name</span>
          <input
            type="text"
            className="wrap-up-input"
            placeholder="Last Name"
          />
          <img src={InputLock} alt="Secure" className="input-lock" />
          <span className="secure-text">SECURE</span>
        </div>
        <div className="firstname-group">
          <span className="label">First Name</span>
          <input
            type="text"
            className="wrap-up-input"
            placeholder="First Name"
          />
          <img src={InputLock} alt="Secure" className="input-lock" />
          <span className="secure-text">SECURE</span>
        </div>
        <div className="country-group">
          <span className="label">Country</span>
          <button className="wrap-up-dropdown-button">
            <Dropdown
              overlay={
                <Menu
                  onClick={(e) => handleCountryChange(e.key)}
                  style={{
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}
                >
                  {countryOptions.map((option) => (
                    <Menu.Item key={option.value}>{option.label}</Menu.Item>
                  ))}
                </Menu>
              }
            >
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                {selectedCountry || "Select Country"}
                <DownOutlined />
              </a>
            </Dropdown>
          </button>
        </div>
        <div className="province-group">
          <span className="label">Province/State</span>
          <button className="wrap-up-dropdown-button">
            <Dropdown
              overlay={
                <Menu
                  onClick={(e) => handleStateChange(e.key)}
                  style={{
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}
                >
                  {stateOptions.map((option) => (
                    <Menu.Item key={option.value}>{option.label}</Menu.Item>
                  ))}
                </Menu>
              }
            >
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                {selectedState || "Select Province/State"} <DownOutlined />
              </a>
            </Dropdown>
          </button>
        </div>
        <div className="city-town-group">
          <span className="label">City/Town</span>
          <button className="wrap-up-dropdown-button">
            <Dropdown
              overlay={
                <Menu
                  onClick={(e) => handleCityChange(e.key)}
                  style={{
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}
                >
                  {cityOptions.map((option) => (
                    <Menu.Item key={option.value}>{option.label}</Menu.Item>
                  ))}
                </Menu>
              }
            >
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                {selectedCity || "Select City/Town"}
                <DownOutlined />
              </a>
            </Dropdown>
          </button>
        </div>
        <div className="zipcode-group">
          <span className="label">Zipcode</span>
          <input
            type="text"
            className="wrap-up-input"
            placeholder="Enter Zipcode"
          />
        </div>
        <div className="housenumber-group">
          <span className="label">House No/Unit/Building Name/Street</span>
          <input
            type="text"
            className="wrap-up-input"
            placeholder="Enter Street"
          />
        </div>
        <div className="source-income-group">
          <span className="label">Source of Income</span>
          <button className="wrap-up-dropdown-button">
            <Dropdown
              overlay={
                <Menu onClick={(e) => handleIncomeType(e.key)}>
                  {incomeTypeOptions.map((option, index) => (
                    <Menu.Item key={option}>{option}</Menu.Item>
                  ))}
                </Menu>
              }
            >
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                {incomeType || "Select Source"} <DownOutlined />
              </a>
            </Dropdown>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WrapUpDetails;
