import React, { useEffect, useState } from "react";
import "../../styles/jointeam.css";
import {
	GetCountry,
	GetCities,
	GetProvince,
} from "../../api/Public/Location.api";
import OTPModal from "../../components/OTPModal";

const JoinTeam = ({ toggleModal }) => {
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
		birthdate: "",
		countryOfBirth: "",
		placeOfBirth: "",
		civilStatus: "",
		nationality: "",
		sourceOfIncome: "",
		idType: "",
		idNo: "",
		brokerQuestion: "",
		brokerYears: "",
	});

	const [errors, setErrors] = useState({});
	const [showOtpModal, setShowOtpModal] = useState(false);

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

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleValidation = () => {
		let formErrors = {};
		let isValid = true;

		Object.keys(formData).forEach((key) => {
			if (!formData[key]) {
				formErrors[key] = "This field is required";
				isValid = false;
			}
		});

		if (!formData.brokerQuestion) {
			formErrors.brokerQuestion = "This field is required";
			isValid = false;
		}

		setErrors(formErrors);
		return isValid;
	};

	const handleSubmit = () => {
		if (handleValidation()) {
			setShowOtpModal(true);
		}
	};

	const IdentifiableInformation = () => {
		const [idCard, setIdCard] = useState(null);
		const [facePhoto, setFacePhoto] = useState(null);

		const handleIdCardUpload = (event) => {
			const file = event.target.files[0];
			if (file) {
				setIdCard(URL.createObjectURL(file));
			}
		};

		const handleFacePhotoUpload = (event) => {
			const file = event.target.files[0];
			if (file) {
				setFacePhoto(URL.createObjectURL(file));
			}
		};

		const handleRedo = (type) => {
			if (type === "idCard") {
				setIdCard(null);
			} else if (type === "facePhoto") {
				setFacePhoto(null);
			}
		};

		const triggerFileInput = (inputId) => {
			document.getElementById(inputId).click();
		};

		return (
			<div className="identifiable-info-container">
				<h3>Identifiable Information</h3>
				<div className="verification-section">
					<div className="card-section">
						<h2>Identification Card</h2>
						<p>
							Ensure your details are clear and unobstructed{" "}
							<span className="required">**</span>
						</p>
						<div className="photo-container">
							{idCard ? (
								<div className="upload-box">
									<img src={idCard} alt="ID Card" className="photo" />
								</div>
							) : (
								<div
									className="upload-box"
									onClick={() => triggerFileInput("idCardInput")}
								>
									<span className="plus-sign">+</span>
									<p>Upload ID Card</p>
								</div>
							)}
							<input
								type="file"
								id="idCardInput"
								style={{ display: "none" }}
								onChange={handleIdCardUpload}
							/>
							<div className="photo-button">
								<button id="redo" onClick={() => handleRedo("idCard")}>
									Redo
								</button>
								<button
									id="take-photo"
									onClick={() => triggerFileInput("idCardInput")}
								>
									Take a Photo
								</button>
							</div>
						</div>
					</div>
					<div className="face-section">
						<h2>Face Identity Photo</h2>
						<p>
							Make sure your entire face is visible{" "}
							<span className="required">**</span>
						</p>
						<div className="photo-container">
							{facePhoto ? (
								<div className="upload-box">
									<img src={facePhoto} alt="ID Card" className="photo" />
								</div>
							) : (
								<div
									className="upload-box"
									onClick={() => triggerFileInput("facePhotoInput")}
								>
									<span className="plus-sign">+</span>
									<p>Upload Face Photo</p>
								</div>
							)}
							<input
								type="file"
								id="facePhotoInput"
								style={{ display: "none" }}
								onChange={handleFacePhotoUpload}
							/>
							<div className="photo-button">
								<button id="redo" onClick={() => handleRedo("facePhoto")}>
									Redo
								</button>
								<button
									id="take-photo"
									onClick={() => triggerFileInput("facePhotoInput")}
								>
									Take a Photo
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="join-modal-container">
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
					<h2 style={{ color: "#000000", fontSize: "24px" }}>
						Join our innovative team at M Lhuillier.
					</h2>
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
								/>
								{errors.lastName && <p className="error">{errors.lastName}</p>}
							</div>
							<div className="join-team-group">
								<span>First Name</span>
								<input
									type="text"
									name="firstName"
									placeholder="First Name"
									value={formData.firstName}
									onChange={handleInputChange}
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
								<select
									name="suffix"
									value={formData.suffix}
									onChange={handleInputChange}
								>
									<option value="">Select Option</option>
									<option value="">None</option>
									<option value="Jr.">Jr.</option>
									<option value="Sr.">Sr.</option>
								</select>
								{errors.suffix && <p className="error">{errors.suffix}</p>}
							</div>
						</div>
						<div className="join-team-column-group">
							<div className="join-team-group">
								<span>Country</span>
								<select
									name="country"
									value={formData.country}
									onChange={handleInputChange}
								>
									<option value="">Select Country</option>
									{getCountry?.map((country, index) => (
										<option key={index} value={country.name}>
											{country.name}
										</option>
									))}
								</select>
								{errors.country && <p className="error">{errors.country}</p>}
							</div>
							<div className="join-team-group">
								<span>Province/State</span>
								<select
									name="province"
									value={formData.province}
									onChange={handleInputChange}
								>
									<option value="">Select Province</option>
									{getProvince?.map((province, index) => (
										<option key={index} value={province.name}>
											{province.name}
										</option>
									))}
								</select>
								{errors.province && <p className="error">{errors.province}</p>}
							</div>
							<div className="join-team-group">
								<span>City/Town</span>
								<select
									name="city"
									value={formData.city}
									onChange={handleInputChange}
								>
									<option value="">Select City</option>
									{getCities?.map((city, index) => (
										<option key={index} value={city.name}>
											{city.name}
										</option>
									))}
								</select>
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
								{errors.address && <p className="error">{errors.address}</p>}
							</div>
						</div>
						<div className="join-team-column-group">
							<div className="join-team-group">
								<span>Birthdate</span>
								<input
									type="text"
									name="birthdate"
									className="calendar-input-field"
									placeholder="mm/dd/yyyy"
									value={formData.birthdate}
									onChange={handleInputChange}
								/>
								{errors.birthdate && (
									<p className="error">{errors.birthdate}</p>
								)}
							</div>

							<div className="join-team-group">
								<span>Country of Birth</span>
								<select
									name="countryOfBirth"
									value={formData.countryOfBirth}
									onChange={handleInputChange}
								>
									<option value="">Select Country</option>
									{getCountry?.map((country, index) => (
										<option key={index} value={country.name}>
											{country.name}
										</option>
									))}
								</select>
								{errors.countryOfBirth && (
									<p className="error">{errors.countryOfBirth}</p>
								)}
							</div>
							<div className="join-team-group">
								<span>Place of Birth</span>
								<select
									name="placeOfBirth"
									value={formData.placeOfBirth}
									onChange={handleInputChange}
								>
									<option value="">Select City</option>
									{getCities?.map((city, index) => (
										<option key={index} value={city.name}>
											{city.name}
										</option>
									))}
								</select>
								{errors.placeOfBirth && (
									<p className="error">{errors.placeOfBirth}</p>
								)}
							</div>
							<div className="join-team-group">
								<span>Civil Status</span>
								<select
									name="civilStatus"
									value={formData.civilStatus}
									onChange={handleInputChange}
								>
									<option value="">Select Civil Status</option>
									<option value="Single">Single</option>
									<option value="Married">Married</option>
									<option value="Separated">Separated</option>
									<option value="Widowed">Widowed</option>
								</select>
								{errors.civilStatus && (
									<p className="error">{errors.civilStatus}</p>
								)}
							</div>
						</div>
						<div className="join-team-column-group">
							<div className="join-team-group">
								<span>Nationality</span>
								<select
									name="nationality"
									value={formData.nationality}
									onChange={handleInputChange}
								>
									<option value="">Select Nationality</option>
									<option value="1">Filipino</option>
								</select>
								{errors.nationality && (
									<p className="error">{errors.nationality}</p>
								)}
							</div>
							<div className="join-team-group">
								<span>Source of Income</span>
								<select
									name="sourceOfIncome"
									value={formData.sourceOfIncome}
									onChange={handleInputChange}
								>
									<option value="">Source of Income</option>
									<option value="BUSINESS INCOME/SELF">
										BUSINESS INCOME/SELF
									</option>
									<option value="Salary/Pay/Wage/Commission">
										Salary/Pay/Wage/Commission
									</option>
									<option value="Pension for Retiree">
										Pension for Retiree
									</option>
									<option value="Regular Remittance Abroad">
										Regular Remittance Abroad
									</option>
								</select>
								{errors.sourceOfIncome && (
									<p className="error">{errors.sourceOfIncome}</p>
								)}
							</div>
							<div className="join-team-group">
								<span>ID Type</span>
								<select
									name="idType"
									value={formData.idType}
									onChange={handleInputChange}
								>
									<option value="">ID Type</option>
									<option value="1">National ID</option>
								</select>
								{errors.idType && <p className="error">{errors.idType}</p>}
							</div>
							<div className="join-team-group">
								<span>ID No</span>
								<input
									type="text"
									name="idNo"
									placeholder="125BXOSER5"
									value={formData.idNo}
									onChange={handleInputChange}
								/>
								{errors.idNo && <p className="error">{errors.idNo}</p>}
							</div>
						</div>
					</div>
					<IdentifiableInformation />
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
							By proceeding, I agree and review that all information is correct.
						</span>
					</div>
					<button onClick={handleSubmit} className="submit-button">
						Submit Application
					</button>
				</div>
			</div>
			<OTPModal visible={showOtpModal} onClose={() => setShowOtpModal(false)} />
		</div>
	);
};

export default JoinTeam;
