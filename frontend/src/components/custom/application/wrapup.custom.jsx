import React, { useEffect, useState, useMemo } from "react";
import "../../../styles/wrapupdetails.css";
import InputLock from "../../../assets/inputlock.png";
import { Dropdown, Menu } from "antd";
import countryList from "react-select-country-list";
import { State, City } from "country-state-city";
import { DownOutlined } from "@ant-design/icons";
import { GetCountry, GetProvince, GetCities } from "../../../api/Public/Location.api";


const WrapUpDetails = ({ setWrapUpComplete }) => {
	const [email, setEmail] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [incomeType, setIncomeType] = useState("");
	const [targetValue, setTargetvalue] = useState("");
	const [countryOptions, setCountryOptions] = useState([]);
    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

	// const [stateOptions, setStateOptions] = useState([]);
	// const [cityOptions, setCityOptions] = useState([]);
	// const [selectedCountry, setSelectedCountry] = useState(null);
	// const [selectedState, setSelectedState] = useState(null);
	// const [selectedCity, setSelectedCity] = useState(null);

	// const countryOptions = useMemo(() => countryList().getData(), []);

	// Handlers
	const handleFirstname = (e) => setFirstname(e.target.value);
	const handleLastname = (e) => setLastname(e.target.value);
	const handleEmailChange = (e) => setEmail(e.target.value);
	const handleIncomeType = (value) => setIncomeType(value);
	const handleTargetvalue = (value) => setTargetvalue(value);


  // Fetch countries from API
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const countries = await GetCountry();
                setCountryOptions(countries.map(country => ({
                    value: country.name, // Assuming the response has 'id' field
                    label: country.name // Assuming the response has 'name' field
                })));
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };
        fetchCountries();
    }, []);

    // Fetch provinces based on selected country
    useEffect(() => {
        if (selectedCountry) {
            const fetchProvinces = async () => {
                try {
                    const provinces = await GetProvince(selectedCountry); // Assuming you might need to pass selectedCountry
                    setStateOptions(provinces.map(province => ({
                        value: province.name, // Assuming the response has 'id' field
                        label: province.name // Assuming the response has 'name' field
                    })));
					console.log(provinces);
					
                } catch (error) {
                    console.error("Error fetching provinces:", error);
                }
            };
            fetchProvinces();
        }
    }, [selectedCountry]);

    // Fetch cities based on selected province
    useEffect(() => {
        if (selectedState) {
            const fetchCities = async () => {
                try {
                    const cities = await GetCities(selectedState); // Assuming you might need to pass selectedState
                    setCityOptions(cities.map(city => ({
                        value: city.name, // Assuming the response has 'id' field
                        label: city.name // Assuming the response has 'name' field
                    })));
                } catch (error) {
                    console.error("Error fetching cities:", error);
                }
            };
            fetchCities();
        }
    }, [selectedState]);

    // Handlers for dropdown changes
    const handleCountryChange = (value) => {
        setSelectedCountry(value);
        setSelectedState(null); // Reset state and city when country changes
        setSelectedCity(null);
    };

    const handleStateChange = (value) => {
        setSelectedState(value);
        setSelectedCity(null); // Reset city when state changes
    };

    const handleCityChange = (value) => {
        setSelectedCity(value);
    };


	const incomeTypeOptions = [
		"Salary/Pay/Wage/Commission",
		"Business Income/Self Employment(valid Id & IRT)",
		"Pension for Retiree(valid Id & IRT)",
		"Regular Remittance Abroad(valid Id & IRT)",
	];

	// Check if the form is complete
	useEffect(() => {
		const isFormComplete =
			email &&
			firstname &&
			lastname &&
			selectedCountry &&
			selectedState &&
			selectedCity &&
			incomeType &&
			targetValue;

		setWrapUpComplete(isFormComplete);
	}, [
		email,
		firstname,
		lastname,
		selectedCountry,
		selectedState,
		selectedCity,
		incomeType,
		targetValue,
		setWrapUpComplete,
	]);

	// Styling for completed and incomplete state
	const wrapUpClassName = `wrap-up-inf ${
		email &&
		firstname &&
		lastname &&
		selectedCountry &&
		selectedState &&
		selectedCity &&
		incomeType &&
		targetValue
			? "completed"
			: "incomplete"
	}`;

	return (
		<div className={wrapUpClassName}>
			<h3>Wrap Up</h3>
			<span className="protect-tagline">
				Your information is protected by SSL encryption.
			</span>
			<div className="prop-content2-wrap-up">
				<div className="mobile-address-group">
					<span className="label">Mobile Address</span>
					<input
						type="text"
						className="wrap-up-input"
						placeholder="09"
						// Add handler if needed
					/>
					<img src={InputLock} alt="Secure" className="input-lock" />
					<span className="secure-text">SECURE</span>
				</div>
				<div className="email-address-group">
					<span className="label">Email Address</span>
					<input
						type="text"
						className="wrap-up-input"
						placeholder="Email Address"
						value={email}
						onChange={handleEmailChange}
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
						value={lastname}
						onChange={handleLastname}
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
						value={firstname}
						onChange={handleFirstname}
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
                                style={{ maxHeight: "300px", overflowY: "auto" }}
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
                                style={{ maxHeight: "300px", overflowY: "auto" }}
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
                            {selectedState || "Select Province/State"}
                            <DownOutlined />
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
                                style={{ maxHeight: "300px", overflowY: "auto" }}
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
						// Add handler if needed
					/>
				</div>
				<div className="housenumber-group">
					<span className="label">House No/Unit/Building Name/Street</span>
					<input
						type="text"
						className="wrap-up-input"
						placeholder="Enter Street"
						// Add handler if needed
					/>
				</div>
				<div className="source-income-group">
					<span className="label">Source of Income</span>
					<button className="wrap-up-dropdown-button">
						<Dropdown
							overlay={
								<Menu onClick={(e) => handleIncomeType(e.key)}>
									{incomeTypeOptions.map((option) => (
										<Menu.Item key={option}>{option}</Menu.Item>
									))}
								</Menu>
							}
						>
							<a
								className="ant-dropdown-link"
								onClick={(e) => e.preventDefault()}
							>
								{incomeType || "Select Source"}
								<DownOutlined />
							</a>
						</Dropdown>
					</button>
				</div>
			</div>
		</div>
	);
};

export default WrapUpDetails;
