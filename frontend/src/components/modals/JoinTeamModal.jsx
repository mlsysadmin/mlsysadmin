import React, { useEffect, useState } from "react";
import "../../styles/jointeam.css";
import {
	GetCountry,
	GetCities,
	GetProvince,
} from "../../api/Public/Location.api";
import OTPModal from "../../components/OTPModal";
import { Select } from "antd";
import { searchKyc } from "../../api/Public/User.api";


const JoinTeam = ({ toggleModal }) => {
	const { Option } = Select;
	const [getCountry, setGetCountry] = useState([]);
	const [getCities, setGetCities] = useState([]);
	const [getProvince, setGetProvince] = useState([]);
	const [formData, setFormData] = useState({
		mobileNumber: "",
		email: "",
		lastName: "",
		firstName: "",
		middleName: "",
		suffix: "",
		country: "",
		province: "",
		city: "",
		address: "",
		brokerQuestion: "",
		brokerYears: "",
	});

	//Search user through number
	const [userDetails, setUserDetails] = useState(null);


	// useEffect(() => {
	// 	console.log("user", userDetails);
	// }, []);

	const [errors, setErrors] = useState({});
	const [showOtpModal, setShowOtpModal] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const allCountries = async () => {
		const datares = await GetCountry();
		setGetCountry(datares);
		console.log("these are countries:", datares);
	};

	const allCities = async () => {
		const datarescities = await GetCities();
		setGetCities(datarescities);
		console.log("these are cities:", datarescities);
	};

	const allProvince = async () => {
		const dataresprovince = await GetProvince();
		setGetProvince(dataresprovince);
		console.log("these are provinces:", dataresprovince);
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

	const handleInputChange = async (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));

		if (name === "mobileNumber" && value.length === 11) {
			try {
				const response = await searchKyc(value);
				const respData = response.data.data;
				setUserDetails(respData)
				console.log("datas:", respData);
				if (respData) {
					setFormData((prevFormData) => ({
						...prevFormData,
						firstName: respData.name?.firstName
							? respData.name.firstName.replace(/.(?=.{2})/g, "*")
							: "",
						lastName: respData.name?.lastName
							? respData.name.lastName.replace(/.(?=.{2})/g, "*")
							: "",
						middleName: respData.name?.middleName
							? respData.name.middleName.replace(/.(?=.{2})/g, "*")
							: "",
						suffix: respData.name?.suffix || "",
						email: respData.email
							? respData.email.replace(/(.{2}).*(?=@)/, "$1****")
							: "",
						country: respData.addresses?.current?.addressL0Name || "",
						province: respData.addresses?.current?.addressL1Name || "",
						city: respData.addresses?.current?.addressL2Name || "",
						address: respData.addresses?.current?.otherAddress || "",
					}));
				} else {
					setIsModalVisible(true);
				}
			} catch (error) {
				console.error("Error fetching user details:", error);
			}
		}
	};

const handleValidation = () => {
	console.log("Validating formData:", formData);
	let formErrors = {};
	let isValid = true;

	
	Object.keys(formData).forEach((key) => {
	
		if (!formData[key] || formData[key].trim() === "") {
			formErrors[key] = "This field is required";
			isValid = false;
		}
	});


	if (!formData.brokerQuestion) {
		formErrors.brokerQuestion = "This field is required";
		isValid = false;
	}

	// Update errors state
	setErrors(formErrors);

	
	console.log("Form errors:", formErrors);

	return isValid;
};

const handleSubmit = (e) => {
	e.preventDefault(); 

	const isValid = handleValidation();
	console.log("Validation result:", isValid);

	if (isValid) {
		setShowOtpModal(true);
	} else {
		console.log("Form is invalid, not showing OTP modal");
	}
};


	const resetForm = () => {
		setFormData({
			mobileNumber: "",
			email: "",
			lastName: "",
			firstName: "",
			middleName: "",
			suffix: "",
			country: "",
			province: "",
			city: "",
			address: "",
			// birthdate: "",
			// countryOfBirth: "",
			// placeOfBirth: "",
			// civilStatus: "",
			// nationality: "",
			// sourceOfIncome: "",
			// idType: "",
			// idNo: "",
			brokerQuestion: "",
			brokerYears: "",
		});
	};

	const handleCloseModal = () => {
		setIsModalVisible(false);
		resetForm();
	};

	const Modal = ({ isVisible, onClose }) => {
		if (!isVisible) return null;

		return (
			<div className="modal-notice" onClick={handleCloseModal}>
				<div className="modal-notice-content">
					<h2>Important Notice</h2>
					<p>
						To join our team, you need to create an ML Wallet account. Follow
						these three easy steps:
					</p>
					<ol>
						<li>
							Download and install the ML Wallet application from Google Play or
							the App Store.
						</li>
						<li>Sign up for an ML Wallet account.</li>
						<li>
							Once successfully registered, return here and fill out this form
							to become an M Lhuillier broker/agent.
						</li>
					</ol>
				</div>
			</div>
		);
	};

	return (
		<div className="join-modal-container">
			<Modal isVisible={isModalVisible} onClose={handleCloseModal} />
			{showOtpModal &&
				(
					<OTPModal
						visible={showOtpModal}
						onClose={() => {
							setShowOtpModal(false);
							resetForm();
						}}
					/>
				)}
			{!showOtpModal &&
				!isModalVisible &&(
					<div
						className="modal-overlay-jointeam"
						role="dialog"
						aria-modal="true"
						style={{
							position: "fixed",
							top: "0px",
							left: "50%",
							transform: "translateX(-50%)",
							backgroundColor: "rgba(0, 0, 0, 0.5)",
							width: "100%",
							height: "100vh",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							zIndex: 100,
							padding: "0px 0px 0px 0px",
						}}
					>
						<div
							className="modal-content-jointeam"
							style={{
								backgroundColor: "white",
								borderRadius: "20px",
								width: "auto",
								maxHeight: "90vh",
								display: "flex",
								padding: "20px 30px",
								flexDirection: "column",
								margin: "20px 0px",
								overflowY: "auto",
							}}
						>
							<div className="modal-header">
								<h2 style={{ color: "#000000", fontSize: "24px" }}>
									Join our innovative team at M Lhuillier.
								</h2>
								<span
									className="close-modal"
									onClick={toggleModal}
									style={{ color: "#666", fontWeight: "lighter" }}
								>
									&times;
								</span>
							</div>
							<p style={{ fontSize: "16px", color: "#000000" }}>
								Your expertise and passion are exactly what we need.
							</p>
							<div className="join-team-columns">
								<div className="join-team-column-group">
									<div className="join-team-group">
										<span>Mobile Number</span>
										<input
											type="text"
											name="mobileNumber"
											placeholder="09"
											value={formData.mobileNumber}
											onChange={handleInputChange}
										/>
										{errors.mobileNumber && (
											<p className="error">{errors.mobileNumber}</p>
										)}
									</div>
									<div className="join-team-group">
										<span>Email Address</span>
										<input
											type="email"
											name="email"
											placeholder="Email Address"
											value={formData.email}
											onChange={handleInputChange}
											disabled={!!userDetails}
										/>
										{errors.email && <p className="error">{errors.email}</p>}
									</div>
								</div>
								<div className="join-team-column-group">
									<div className="join-team-group">
										<span>Last Name</span>
										<input
											type="text"
											name="lastName"
											placeholder="Last Name"
											value={formData.lastName}
											onChange={handleInputChange}
											disabled={!!userDetails}
										/>
										{errors.lastName && (
											<p className="error">{errors.lastName}</p>
										)}
									</div>
									<div className="join-team-group">
										<span>First Name</span>
										<input
											type="text"
											name="firstName"
											placeholder="First Name"
											value={formData.firstName}
											onChange={handleInputChange}
											disabled={!!userDetails}
										/>
										{errors.firstName && (
											<p className="error">{errors.firstName}</p>
										)}
									</div>
									<div className="join-team-group">
										<span>Middle Name</span>
										<input
											type="text"
											name="middleName"
											placeholder="Middle Name"
											value={formData.middleName}
											onChange={handleInputChange}
										/>
										{errors.middleName && (
											<p className="error">{errors.middleName}</p>
										)}
									</div>
									<div className="join-team-group">
										<span>Suffix</span>
										<Select
											name="suffix"
											value={formData.suffix}
											onChange={(value) =>
												handleInputChange({ target: { name: "suffix", value } })
											}
										>
											<Option value="">Select Option</Option>
											<Option value="None">None</Option>
											<Option value="Jr.">Jr.</Option>
											<Option value="Sr.">Sr.</Option>
										</Select>
										{errors.suffix && <p className="error">{errors.suffix}</p>}
									</div>
								</div>
								<div className="join-team-column-group">
									<div className="join-team-group">
										<span>Country</span>
										<Select
											name="country"
											value={formData.country}
											onChange={(value) =>
												handleInputChange({
													target: { name: "country", value },
												})
											}
											disabled={!!userDetails}
										>
											<Option value="">Select Country</Option>
											{getCountry?.map((country, index) => (
												<Option key={index} value={country.name}>
													{country.name}
												</Option>
											))}
										</Select>
										{errors.country && (
											<p className="error">{errors.country}</p>
										)}
									</div>
									<div className="join-team-group">
										<span>Province/State</span>
										<Select
											name="province"
											value={formData.province}
											onChange={(value) =>
												handleInputChange({
													target: { name: "province", value },
												})
											}
											disabled={!!userDetails}
										>
											<Option value="">Select Province</Option>
											{getProvince?.map((province, index) => (
												<Option key={index} value={province.name}>
													{province.name}
												</Option>
											))}
										</Select>
										{errors.province && (
											<p className="error">{errors.province}</p>
										)}
									</div>
									<div className="join-team-group">
										<span>City/Town</span>
										<Select
											name="city"
											value={formData.city}
											onChange={(value) =>
												handleInputChange({ target: { name: "city", value } })
											}
											disabled={!!userDetails}
										>
											<Option value="">Select City</Option>
											{getCities?.map((city, index) => (
												<Option key={index} value={city.name}>
													{city.name}
												</Option>
											))}
										</Select>
										{errors.city && <p className="error">{errors.city}</p>}
									</div>
									<div className="join-team-group">
										<span>House No/St/Sitio/Barangay</span>
										<input
											type="text"
											name="address"
											placeholder="House No/St/Sitio/Barangay"
											value={formData.address}
											onChange={handleInputChange}
										/>
										{errors.address && (
											<p className="error">{errors.address}</p>
										)}
									</div>
								</div>
							</div>
							{/* <IdentifiableInformation /> */}
							<div className="broker-questions-jointeam">
								<div className="broker-questions-review">
									<span>Are you a licensed Real Estate Broker?</span>
									<div className="radio-button-broker-question">
										<label>
											<input
												type="radio"
												name="brokerQuestion"
												value="yes"
												checked={formData.brokerQuestion === "yes"}
												onChange={handleInputChange}
											/>
											Yes
										</label>
										<label>
											<input
												type="radio"
												name="brokerQuestion"
												value="no"
												checked={formData.brokerQuestion === "no"}
												onChange={handleInputChange}
											/>
											No
										</label>
										<label>
											<input
												type="radio"
												name="brokerQuestion"
												value="agent"
												checked={formData.brokerQuestion === "agent"}
												onChange={handleInputChange}
											/>
											Agent
										</label>
										{errors.brokerQuestion && (
											<p className="error">{errors.brokerQuestion}</p>
										)}
									</div>
								</div>
								<div className="broker-number-of-years">
									<span>Number of Years as Real Estate Broker</span>
									<input
										type="text"
										name="brokerYears"
										placeholder="Enter Number"
										value={formData.brokerYears}
										onChange={handleInputChange}
									/>
									{errors.brokerYears && (
										<p className="error">{errors.brokerYears}</p>
									)}
								</div>
								<span>
									By proceeding, I agree and review that all information is
									correct.
								</span>
							</div>
							<button onClick={handleSubmit} className="submit-button">
								Submit Application
							</button>
						</div>
					</div>
				)}
		</div>
	);
};

export default JoinTeam;
