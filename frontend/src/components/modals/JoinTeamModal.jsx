import React, { useEffect, useState } from "react";
import "../../styles/jointeam.css";
import {
	GetCountry,
	GetCities,
	GetProvince,
} from "../../api/Public/Location.api";
import OTPModal from "../../components/OTPModal";
import { DatePicker, Select } from "antd";
import {
	AddAgent,
	GetControlLastNumber,
	GetAgentByContactNumber,
} from "../../api/Public/Agent.api";
import { notification } from "antd";
import { useAuth } from "../../Context/AuthContext";
import PreviewLoadingModal from "./PreviewLoadingModal";
import dayjs from "dayjs";
import AgentExistModalMessage from "./AgentExistModalMessage";

const JoinTeam = ({ toggleModal }) => {
	const { isAuthenticated, logout } = useAuth();
	const { Option } = Select;
	const [getCountry, setGetCountry] = useState([]);
	const [getProvince, setGetProvince] = useState([]);
	const [selectedProvince, setSelectedProvince] = useState("");
	const [filteredCities, setFilteredCities] = useState([]);
	const [showAgentExistModalMessage, setShowAgentExistModalMessage] =
		useState(false);
	const [agentRecordStatus, setAgentRecordStatus] = useState("");
	const [getCities, setGetCities] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [api, contextHolder] = notification.useNotification();

	const dateFormat = "YYYY/MM/DD";

	const [formData, setFormData] = useState({
		mobileNumber: "",
		email: "",
		lastName: "",
		firstName: "",
		middleName: "",
		suffix: "",
		country: "Philippines",
		province: "",
		city: "",
		address: "",
		brokerQuestion: "Agent",
		brokerYears: "",
	});

	//Search user through number
	const [userDetails, setUserDetails] = useState(null);

	// useEffect(() => {
	// 	console.log("user", userDetails);
	// }, []);
	const openNotificationWithIcon = (type, message, description) => {
		api[type]({
			message: message,
			description: description,
			placement: "bottomRight",
			duration: type == "error" ? 4 : 3,
		});
	};
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
	const handleShowAgentExistModalMessage = () => {
		setShowAgentExistModalMessage(true);
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
	const [othersInputValue, setOthersInputValue] = useState("");
	const handleInputOthers = async (e) => {
		setOthersInputValue(e.target.value);
	};
	const handleInputChange = async (e) => {
		const { name, value } = e.target;
		console.log("name; ", name);

		switch (name) {
			case "country":
				// setFormData(value);
				setFormData((prevFormData) => ({
					...prevFormData,
					country: value,
				}));
				break;
			case "province":
				// setSelectedProvince(value);
				setFormData((prevFormData) => ({
					...prevFormData,
					province: value,
				}));
				break;
			case "city":
				// setSelectedCity(value);
				setFormData((prevFormData) => ({
					...prevFormData,
					city: value,
				}));
				break;
			default:
				break;
		}
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
		console.log("othersInputValue: ", othersInputValue);

		// if (name === "mobileNumber" && value.length === 11) {
		//   try {
		//     const response = await searchKyc(value);
		//     const respData = response.data.data;
		//     setUserDetails(respData);
		//     console.log("datas:", respData);
		//     if (respData) {
		//       setFormData((prevFormData) => ({
		//         ...prevFormData,
		//         firstName: respData.name?.firstName
		//           ? respData.name.firstName.replace(/.(?=.{2})/g, "*")
		//           : "",
		//         lastName: respData.name?.lastName
		//           ? respData.name.lastName.replace(/.(?=.{2})/g, "*")
		//           : "",
		//         middleName: respData.name?.middleName
		//           ? respData.name.middleName.replace(/.(?=.{2})/g, "*")
		//           : "",
		//         suffix: respData.name?.suffix || "",
		//         email: respData.email
		//           ? respData.email.replace(/(.{2}).*(?=@)/, "$1****")
		//           : "",
		//         country: respData.addresses?.current?.addressL0Name || "",
		//         province: respData.addresses?.current?.addressL1Name || "",
		//         city: respData.addresses?.current?.addressL2Name || "",
		//         address: respData.addresses?.current?.otherAddress || "",
		//       }));
		//     } else {
		//       setIsModalVisible(true);
		//     }
		//   } catch (error) {
		//     console.error("Error fetching user details:", error);
		//   }
		// }
	};

	const handleValidation = () => {
		// let formErrors = {};
		let isValid = true;

		Object.keys(formData).forEach((key) => {
			if (
				key !== "middleName" &&
				typeof formData[key] === "string" &&
				(!formData[key] || formData[key].trim() === "")
			) {
				isValid = false;
			}
		});
		if (formData.mobileNumber) {
			const cleanMobileNumber = formData.mobileNumber.replace(/[^0-9]/g, "");
			if (cleanMobileNumber !== formData.mobileNumber) {
				// mobileNumber contained letters
				isValid = false;
			}
		}
		const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
		const trimmedValue = formData.email.trim();
		if (!emailPattern.test(trimmedValue)) {
			// setFormData((prevFormData) => ({
			//   ...prevFormData,
			//   email: value,
			// }));
			openNotificationWithIcon(
				"warning",
				`Unable to proceed`,
				"Please provide a valid Email Address."
			);
			isValid = false;
		}
		if (!formData.brokerQuestion) {
			isValid = false;
		}
		return isValid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			// const existingAgent = await GetAgentByContactNumber(
			// 	formData.mobileNumber
			// );
			// console.log("number:", formData.mobileNumber);

			// console.log("existingAgent: ", existingAgent);

			// if (existingAgent !== null && Object.keys(existingAgent).length > 0) {
			// 	if (existingAgent.RecordStatus !== "rejected") {
			// 		console.log("Agent already exists: ", existingAgent);

			// 		setAgentRecordStatus(existingAgent.RecordStatus);
			// 		setIsSubmitting(false);
			// 		setShowAgentExistModalMessage(true);
			// 	} else if (existingAgent.RecordStatus === "rejected") {
			// 		const isValid = handleValidation();
			// 		const getControlLastNumber = await GetControlLastNumber("AgentId");
			// 		const today = new Date();
			// 		const yyyyMMdd =
			// 			today.getFullYear() +
			// 			"-" +
			// 			(today.getMonth() + 1) +
			// 			"-" +
			// 			today.getDate();
			// 		console.log("getControlLastNumber: ", getControlLastNumber);
			// 		if (
			// 			getControlLastNumber &&
			// 			isValid &&
			// 			getControlLastNumber.data !== ""
			// 		) {
			// 			const reqBody = {
			// 				AgentId: getControlLastNumber.data,
			// 				AgentName: `${formData.lastName}, ${formData.firstName} ${
			// 					formData.middleName
			// 				} ${formData.suffix === "None" ? "" : formData.suffix}`,
			// 				Address: `${formData.address}, ${formData.city}, ${formData.province}, ${formData.country}`,
			// 				ContactNo: formData.mobileNumber,
			// 				Email: formData.email,
			// 				FacebookLink: "-",
			// 				Designation:
			// 					formData.brokerQuestion === "others"
			// 						? othersInputValue
			// 						: formData.brokerQuestion,
			// 				TeamId: "-",
			// 				TeamName: "-",
			// 				Affiliated: formData.brokerYears,
			// 				TIN: "-",
			// 				BirthDate: yyyyMMdd,
			// 				Sex: "-",
			// 				HasPanel: "-",
			// 				IsFeatured: "-",
			// 				Description: "-",
			// 				RecordStatus: "pending",
			// 				PRCID: "-",
			// 				PRCExpiryDate: yyyyMMdd,
			// 				ReferredById: "-",
			// 				ReferredByName: "-",
			// 				BankName: "-",
			// 				BankAccountNo: "-",
			// 			};
			// 			const addAgent = await AddAgent(reqBody);
			// 			console.log("addAgent: ", addAgent);
			// 			setIsSubmitting(false);

			// 			if (addAgent) {
			// 				openNotificationWithIcon(
			// 					"success",
			// 					`Successfully submitted`,
			// 					"Thank you for joining our team! We're excited to review it and will be in touch soon with the next steps."
			// 				);
			// 			} else {
			// 				openNotificationWithIcon(
			// 					"warning",
			// 					`Unable to proceed`,
			// 					"Unable to Submit your Application, Please retry later!."
			// 				);
			// 			}
			// 			console.log("formData: ", formData);
			// 		} else {
			// 			setIsSubmitting(false);
			// 			openNotificationWithIcon(
			// 				"warning",
			// 				`Invalid Value`,
			// 				"Please provide the required fields!."
			// 			);
			// 		}
			// 	}
			// 	else{
			// 		setIsSubmitting(false);
			// 		console.log("error occured!");

			// 	}
			// } else {
			const isValid = handleValidation();
			const getControlLastNumber = await GetControlLastNumber("AgentId");
			const today = new Date();
			const yyyyMMdd =
				today.getFullYear() +
				"-" +
				(today.getMonth() + 1) +
				"-" +
				today.getDate();
			console.log("getControlLastNumber: ", getControlLastNumber);
			if (getControlLastNumber && isValid && getControlLastNumber.data !== "") {
				const reqBody = {
					AgentId: getControlLastNumber.data,
					AgentName: `${formData.lastName}, ${formData.firstName} ${
						formData.middleName
					} ${formData.suffix === "None" ? "" : formData.suffix}`,
					Address: `${formData.address}, ${formData.city}, ${formData.province}, ${formData.country}`,
					ContactNo: formData.mobileNumber,
					Email: formData.email,
					FacebookLink: "-",
					Designation:
						formData.brokerQuestion === "others"
							? othersInputValue
							: formData.brokerQuestion,
					TeamId: "-",
					TeamName: "-",
					Affiliated: formData.brokerYears,
					TIN: "-",
					BirthDate: yyyyMMdd,
					Sex: "-",
					HasPanel: "-",
					IsFeatured: "-",
					Description: "-",
					RecordStatus: "pending",
					PRCID: "-",
					PRCExpiryDate: yyyyMMdd,
					ReferredById: "-",
					ReferredByName: "-",
					BankName: "-",
					BankAccountNo: "-",
				};
				const addAgent = await AddAgent(reqBody);
				console.log("addAgent: ", addAgent);
				setIsSubmitting(false);
				resetForm();

				if (addAgent) {
					openNotificationWithIcon(
						"success",
						`Successfully submitted`,
						"Thank you for joining our team! We're excited to review it and will be in touch soon with the next steps."
					);
					resetForm();
				} else {
					openNotificationWithIcon(
						"warning",
						`Unable to proceed`,
						"Unable to Submit your Application, Please retry later!."
					);
				}
				console.log("formData: ", formData);
				resetForm();
			} else {
				setIsSubmitting(false);
				openNotificationWithIcon(
					"warning",
					`Invalid Value`,
					"Please provide the required fields!."
				);
			}

			//   const addAgent = await AddAgent();
		} catch (error) {
			console.log("me: ", error);
			if (error.response.status === 404) {
				const responsestat = error.response.data.status;
				if (responsestat === "active" || responsestat === "pending") {
					setIsSubmitting(false);
					setAgentRecordStatus(responsestat);
					setShowAgentExistModalMessage(true);
				}
			} else {
				setIsSubmitting(false);
				openNotificationWithIcon(
					"error",
					"Message Failed",
					"We're sorry, but your application couldn't be submitted. We're already working on resolving the issue. Thank you for your patience!"
				);
			}
		}

		// const isValid = handleValidation();

		// if (isValid) {
		//   setShowOtpModal(true);
		// } else {
		//   console.log("Form is invalid, not showing OTP modal");
		// }
	};

	const resetForm = () => {
		setFormData({
			mobileNumber: "",
			email: "",
			lastName: "",
			firstName: "",
			middleName: "",
			suffix: "",
			country: "Philippines",
			province: "",
			city: "",
			address: "",
			brokerQuestion: "",
			brokerYears: "",
		});
	};
	const pascalTextFormatter = (text) => {
		return text
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(" ");
	};
	const handleCloseModal = () => {
		setIsModalVisible(false);
		resetForm();
	};
	const handleProvinceChange = (provinceName) => {
		setSelectedProvince(provinceName);

		const normalizedProvince = provinceName.toLowerCase(); // Now it's a string

		const provinceData = getProvince.find(
			(p) => p.name.toLowerCase() === normalizedProvince
		);
		if (provinceData) {
			const provinceId = provinceData.addressL1Id;
			const filtered = getCities.filter((city) => {
				return city.addressL1Id === provinceId; // Filter cities based on the addressL1Id
			});
			setFilteredCities(filtered);
		} else {
			setFilteredCities([]);
		}
	};
	useEffect(() => {
		setFormData((prevFormData) => ({
			...prevFormData,
			province: selectedProvince,
		}));
	}, [selectedProvince]);

	const handleKeyDownForLettersAndSymbolsOnly = (e) => {
		const validInputPattern =
			/^[A-Za-z\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
		if (
			!validInputPattern.test(e.key) &&
			e.key !== "Backspace" &&
			e.key !== "Tab"
		) {
			e.preventDefault();
		}
	};
	const handleKeyDownForNumbers = (e) => {
		const validInputPatternWrapUp = /^\d*$/;
		const currentLength = formData.mobileNumber.length;
		if (e.key === "Backspace" || e.key === "Delete") {
			return;
		}
		if (!/\d/.test(e.key)) {
			e.preventDefault();
		}
		if (currentLength === 0 && e.key !== "0") {
			e.preventDefault();
		}
		if (currentLength === 1 && e.key !== "9") {
			e.preventDefault();
		}
		if (
			!validInputPatternWrapUp.test(e.key) &&
			e.key !== "Backspace" &&
			e.key !== "Tab"
		) {
			e.preventDefault();
		}
	};
	const Modal = ({ isVisible, onClose }) => {
		if (!isVisible) return null;
	};

	if (!isAuthenticated) {
		return (
			<div className="join-modal-container">
				{contextHolder}
				<Modal isVisible={isModalVisible} onClose={handleCloseModal} />
				{showOtpModal && (
					<OTPModal
						visible={showOtpModal}
						onClose={() => {
							setShowOtpModal(false);
							resetForm();
						}}
					/>
				)}
				{!showOtpModal && !isModalVisible && (
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
								height: "80vh",
								display: "flex",
								padding: "20px 30px 10px 30px",
								flexDirection: "column",
								margin: "0px 0px",
								overflowY: "auto",
							}}
						>
							<div className="modal-header">
								<h2 style={{ color: "#000000" }}>
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
							<p style={{ color: "#000000" }}>
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
											onKeyDown={handleKeyDownForNumbers}
											pattern="[0-9]*"
											maxLength={11}
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
											pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
											onKeyDown={handleKeyDownForLettersAndSymbolsOnly}
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
											onKeyDown={handleKeyDownForLettersAndSymbolsOnly}
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
											onKeyDown={handleKeyDownForLettersAndSymbolsOnly}
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
											id="suffix"
											className="join-our-team-selector"
											value={formData.suffix}
											onChange={
												(e) =>
													handleInputChange({
														target: { name: "suffix", value: e },
													}) // Corrected here
											}
											name="suffix"
											// onChange={handleAddressChange}
										>
											<Select.Option value="" disabled selected hidden>
												Select option
											</Select.Option>
											<Select.Option value="None">None</Select.Option>
											<Select.Option value="jr">Jr.</Select.Option>
											<Select.Option value="sr">Sr.</Select.Option>
											<Select.Option value="I">I</Select.Option>
											<Select.Option value="II">II</Select.Option>
											<Select.Option value="III">III</Select.Option>
											<Select.Option value="IV">IV</Select.Option>
										</Select>

										{/* <Select
                    name="suffix"
                    value={formData.suffix}
                    onChange={(value) =>
                      handleInputChange({ target: { name: "suffix", value } })
                    }
                  >
                    <option value="">Select option</option>
                    <option value="None">None</option>
                    <option value="Jr.">Jr.</option>
                    <option value="Sr.">Sr.</option>
                  </Select> */}
										{errors.suffix && <p className="error">{errors.suffix}</p>}
									</div>
								</div>
								<div className="join-team-column-group">
									<div className="join-team-group">
										<span>Country</span>
										<input
											type="text"
											name="country"
											value="Philippines"
											onChange={(value) =>
												handleInputChange({
													target: { name: "country", value },
												})
											}
											disabled
										/>
										{/* <Select
                    name="country"
                    value="Philippines"
                    onChange={(value) =>
                      handleInputChange({
                        target: { name: "country", value },
                      })
                    }
                    disabled
                  >
                    <Option value="Philippines">Philippines</Option>
                  </Select> */}
										{errors.country && (
											<p className="error">{errors.country}</p>
										)}
									</div>
									<div className="join-team-group">
										<span>Province/State</span>
										{/* <Select
                    name="province"
                    value={formData.province}
                    onChange={(value) => handleProvinceChange(value)}
                  >
                    <Option value="">Select Province</Option>
                    {getProvince?.map((province, index) => (
                      <Option
                        key={index}
                        value={
                          province.name.charAt(0).toUpperCase() +
                          province.name.slice(1).toLowerCase()
                        }
                      >
                        {province.name.charAt(0).toUpperCase() +
                          province.name.slice(1).toLowerCase()}
                      </Option>
                    ))}
                  </Select> */}
										<Select
											id="province"
											className="join-our-team-selector"
											value={formData.province}
											onChange={(value) => handleProvinceChange(value)}
											name="province"

											// onChange={handleAddressChange}
										>
											<Select.Option value="" disabled selected hidden>
												Select Province
											</Select.Option>
											{getProvince?.map((province, index) => (
												<Select.Option
													key={index}
													style={{ maxHeight: "20px", overflowY: "auto" }}
													value={pascalTextFormatter(province.name)}
												>
													{pascalTextFormatter(province.name)}
												</Select.Option>
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
											id="city"
											className="join-our-team-selector"
											value={formData.city}
											onChange={(e) =>
												handleInputChange({
													target: { name: "city", value: e },
												})
											}
										>
											<Select.Option value="" disabled selected hidden>
												Select City
											</Select.Option>
											{filteredCities.map((city, index) => (
												<Select.Option
													key={index}
													value={pascalTextFormatter(city.name)}
												>
													{pascalTextFormatter(city.name)}
												</Select.Option>
											))}

											{/* {filteredCities?.map((city, index) => (
                      <Option key={index} value={formatCityLabel(city.name)}>
                        {formatCityLabel(city.name)}
                      </Option>
                    ))} */}
										</Select>

										{errors.city && <p className="error">{errors.city}</p>}
									</div>
									<div className="join-team-group">
										<span className="brgy-label">House No/St/Sitio/Barangay</span>
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
									<span>Are you a Real Estate:</span>
									<div className="radio-button-broker-question">
										<label>
											<input
												type="radio"
												name="brokerQuestion"
												value="Agent"
												checked={formData.brokerQuestion === "Agent"}
												onChange={handleInputChange}
											/>
											Agent
										</label>
										<label>
											<input
												type="radio"
												name="brokerQuestion"
												value="Broker"
												checked={formData.brokerQuestion === "Broker"}
												onChange={handleInputChange}
											/>
											Broker
										</label>
										<label className="other-status">
											<input
												type="radio"
												name="brokerQuestion"
												value="others"
												checked={formData.brokerQuestion === "others"}
												onChange={handleInputChange}
											/>
											Others
											{formData.brokerQuestion === "others" && (
												<div className="join-team-group">
													<input
														type="text"
														name="otherBrokerQuestion"
														id="othersBrokerQuestion"
														placeholder="Please specify"
														value={othersInputValue}
														onChange={handleInputOthers}
														onKeyDown={handleKeyDownForLettersAndSymbolsOnly}
													/>
												</div>
											)}
											{errors.otherBrokerQuestion && (
												<p className="error">{errors.otherBrokerQuestion}</p>
											)}
										</label>
										{errors.brokerQuestion && (
											<p className="error">{errors.brokerQuestion}</p>
										)}
									</div>
								</div>
								<div className="broker-number-of-years">
									<span>
										When did you start your affiliation as{" "}
										{formData.brokerQuestion === "others"
											? ["a", "e", "i", "o", "u"].includes(
													othersInputValue.charAt(0).toLowerCase()
											  )
												? "an"
												: "a"
											: ["a", "e", "i", "o", "u"].includes(
													formData.brokerQuestion.charAt(0).toLowerCase()
											  )
											? "an"
											: "a"}{" "}
										{formData.brokerQuestion === "others"
											? othersInputValue
												? othersInputValue
												: "_"
											: formData.brokerQuestion}
										?
									</span>
									<DatePicker
										name="brokerYears"
										placeholder="Select Date"
										value={
											formData.brokerYears
												? dayjs(formData.brokerYears, dateFormat)
												: null
										}
										onChange={(date) => {
											const formattedDate = date
												? dayjs(date).format(dateFormat)
												: null;
											handleInputChange({
												target: { name: "brokerYears", value: formattedDate },
											});
										}}
									/>
									{/* <input
										type="date"
										name="brokerYears"
										placeholder="Enter Number"
										value={formData.brokerYears}
										onChange={handleInputChange}
									/> */}
									{errors.brokerYears && (
										<p className="error">{errors.brokerYears}</p>
									)}
								</div>
								<span>
									By proceeding, I agree and review that all information is
									correct.
								</span>
							</div>
							<div className="button-container-join-team">
								<button
									onClick={handleSubmit}
									className="join-team-submit-button"
								>
									Submit Application
								</button>
							</div>
						</div>
					</div>
				)}
				{isSubmitting && <PreviewLoadingModal />}
				{showAgentExistModalMessage && (
					<AgentExistModalMessage
						setShowLoginMessage={setShowAgentExistModalMessage}
						agentRecordStatus={agentRecordStatus}
						resetForm={resetForm}
					/>
				)}
			</div>
		);
	}

	return (
		<div className="join-page-container">
			{contextHolder}
			<Modal isVisible={isModalVisible} onClose={handleCloseModal} />
			{showOtpModal && (
				<OTPModal
					visible={showOtpModal}
					onClose={() => {
						setShowOtpModal(false);
						resetForm();
					}}
				/>
			)}
			{!showOtpModal && !isModalVisible && (
				<div className="page-content-jointeam">
					<div className="page-content-jointeam-header">
						<h2>Join our innovative team at M Lhuillier.</h2>
					</div>
					<p className="sub-header-joinpage" style={{ color: "#000000" }}>
						Your expertise and passion are exactly what we need.
					</p>
					<div className="join-team-page-columns">
						<div className="join-team-page-column-group">
							<div className="join-team-page-group">
								<span>Mobile Number</span>
								<input
									type="text"
									name="mobileNumber"
									placeholder="09"
									value={formData.mobileNumber}
									onChange={handleInputChange}
									onKeyDown={handleKeyDownForNumbers}
									pattern="[0-9]*"
									maxLength={11}
								/>
								{errors.mobileNumber && (
									<p className="error">{errors.mobileNumber}</p>
								)}
							</div>
							<div className="join-team-page-group">
								<span>Email Address</span>
								<input
									type="email"
									name="email"
									placeholder="Email Address"
									value={formData.email}
									pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
									onChange={handleInputChange}
								/>
								{errors.email && <p className="error">{errors.email}</p>}
							</div>
						</div>
						<div className="join-team-page-column-group">
							<div className="join-team-page-group">
								<span>Last Name</span>
								<input
									type="text"
									name="lastName"
									placeholder="Last Name"
									value={formData.lastName}
									onChange={handleInputChange}
									onKeyDown={handleKeyDownForLettersAndSymbolsOnly}
									disabled={!!userDetails}
								/>
								{errors.lastName && <p className="error">{errors.lastName}</p>}
							</div>
							<div className="join-team-page-group">
								<span>First Name</span>
								<input
									type="text"
									name="firstName"
									placeholder="First Name"
									value={formData.firstName}
									onChange={handleInputChange}
									onKeyDown={handleKeyDownForLettersAndSymbolsOnly}
									disabled={!!userDetails}
								/>
								{errors.firstName && (
									<p className="error">{errors.firstName}</p>
								)}
							</div>
							<div className="join-team-page-group">
								<span>Middle Name</span>
								<input
									type="text"
									name="middleName"
									placeholder="Middle Name"
									onKeyDown={handleKeyDownForLettersAndSymbolsOnly}
									value={formData.middleName}
									onChange={handleInputChange}
								/>
								{errors.middleName && (
									<p className="error">{errors.middleName}</p>
								)}
							</div>
							<div className="join-team-page-group">
								<span>Suffix</span>

								<Select
									id="suffix"
									className="join-our-team-selector"
									value={formData.suffix}
									onChange={
										(e) =>
											handleInputChange({
												target: { name: "suffix", value: e },
											}) // Corrected here
									}
									name="suffix"
									// onChange={handleAddressChange}
								>
									<Select.Option value="" disabled selected hidden>
										Select option
									</Select.Option>
									<Select.Option value="None">None</Select.Option>
									<Select.Option value="jr">Jr.</Select.Option>
									<Select.Option value="sr">Sr.</Select.Option>
									<Select.Option value="I">I</Select.Option>
									<Select.Option value="II">II</Select.Option>
									<Select.Option value="III">III</Select.Option>
									<Select.Option value="IV">IV</Select.Option>
								</Select>

								{/* <Select
                    name="suffix"
                    value={formData.suffix}
                    onChange={(value) =>
                      handleInputChange({ target: { name: "suffix", value } })
                    }
                  >
                    <option value="">Select option</option>
                    <option value="None">None</option>
                    <option value="Jr.">Jr.</option>
                    <option value="Sr.">Sr.</option>
                  </Select> */}
								{errors.suffix && <p className="error">{errors.suffix}</p>}
							</div>
						</div>
						<div className="join-team-page-column-group">
							<div className="join-team-page-group">
								<span>Country</span>
								<input
									type="text"
									name="country"
									value="Philippines"
									onChange={(value) =>
										handleInputChange({
											target: { name: "country", value },
										})
									}
									disabled
								/>
								{/* <Select
                    name="country"
                    value="Philippines"
                    onChange={(value) =>
                      handleInputChange({
                        target: { name: "country", value },
                      })
                    }
                    disabled
                  >
                    <Option value="Philippines">Philippines</Option>
                  </Select> */}
								{errors.country && <p className="error">{errors.country}</p>}
							</div>
							<div className="join-team-page-group">
								<span>Province/State</span>
								{/* <Select
                    name="province"
                    value={formData.province}
                    onChange={(value) => handleProvinceChange(value)}
                  >
                    <Option value="">Select Province</Option>
                    {getProvince?.map((province, index) => (
                      <Option
                        key={index}
                        value={
                          province.name.charAt(0).toUpperCase() +
                          province.name.slice(1).toLowerCase()
                        }
                      >
                        {province.name.charAt(0).toUpperCase() +
                          province.name.slice(1).toLowerCase()}
                      </Option>
                    ))}
                  </Select> */}
								<Select
									id="province"
									className="join-our-team-selector"
									value={formData.province}
									onChange={(value) => handleProvinceChange(value)}
									name="province"

									// onChange={handleAddressChange}
								>
									<Select.Option value="" disabled selected hidden>
										Select Province
									</Select.Option>
									{getProvince?.map((province, index) => (
										<Select.Option
											key={index}
											style={{ maxHeight: "20px", overflowY: "auto" }}
											value={pascalTextFormatter(province.name)}
										>
											{pascalTextFormatter(province.name)}
										</Select.Option>
									))}
								</Select>
								{errors.province && <p className="error">{errors.province}</p>}
							</div>
							<div className="join-team-page-group">
								<span>City/Town</span>
								<Select
									name="city"
									id="city"
									className="join-our-team-selector"
									value={formData.city}
									onChange={(e) =>
										handleInputChange({
											target: { name: "city", value: e },
										})
									}
								>
									<Select.Option value="" disabled selected hidden>
										Select City
									</Select.Option>
									{filteredCities.map((city, index) => (
										<Select.Option
											key={index}
											value={pascalTextFormatter(city.name)}
										>
											{pascalTextFormatter(city.name)}
										</Select.Option>
									))}

									{/* {filteredCities?.map((city, index) => (
                      <Option key={index} value={formatCityLabel(city.name)}>
                        {formatCityLabel(city.name)}
                      </Option>
                    ))} */}
								</Select>

								{errors.city && <p className="error">{errors.city}</p>}
							</div>
							<div className="join-team-page-group">
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
					</div>
					{/* <IdentifiableInformation /> */}
					<div className="broker-questions-jointeam">
						<div className="broker-questions-review">
							<span>Are you a Real Estate:</span>
							<div className="radio-button-broker-question">
								<label>
									<input
										type="radio"
										name="brokerQuestion"
										value="Agent"
										checked={formData.brokerQuestion === "Agent"}
										onChange={handleInputChange}
									/>
									Agent
								</label>
								<label>
									<input
										type="radio"
										name="brokerQuestion"
										value="Broker"
										checked={formData.brokerQuestion === "Broker"}
										onChange={handleInputChange}
									/>
									Broker
								</label>
								<label className="other-status">
									<input
										type="radio"
										name="brokerQuestion"
										value="others"
										checked={formData.brokerQuestion === "others"}
										onChange={handleInputChange}
									/>
									Others
									{formData.brokerQuestion === "others" && (
										<div className="join-team-group">
											<input
												type="text"
												name="otherBrokerQuestion"
												id="othersBrokerQuestion"
												placeholder="Please specify"
												value={othersInputValue}
												onChange={handleInputOthers}
												onKeyDown={handleKeyDownForLettersAndSymbolsOnly}
											/>
										</div>
									)}
									{errors.otherBrokerQuestion && (
										<p className="error">{errors.otherBrokerQuestion}</p>
									)}
								</label>
								{errors.brokerQuestion && (
									<p className="error">{errors.brokerQuestion}</p>
								)}
							</div>
						</div>
						<div className="broker-number-of-years">
							<span>
								When did you start your affiliation as{" "}
								{formData.brokerQuestion === "others"
									? ["a", "e", "i", "o", "u"].includes(
											othersInputValue.charAt(0).toLowerCase()
									  )
										? "an"
										: "a"
									: ["a", "e", "i", "o", "u"].includes(
											formData.brokerQuestion.charAt(0).toLowerCase()
									  )
									? "an"
									: "a"}{" "}
								{formData.brokerQuestion === "others"
									? othersInputValue
										? othersInputValue
										: "_"
									: formData.brokerQuestion}
								?
							</span>
							<DatePicker
								name="brokerYears"
								placeholder="Select Date"
								value={
									formData.brokerYears
										? dayjs(formData.brokerYears, dateFormat)
										: null
								}
								onChange={(date) => {
									const formattedDate = date
										? dayjs(date).format(dateFormat)
										: null;
									handleInputChange({
										target: { name: "brokerYears", value: formattedDate },
									});
								}}
							/>
							{errors.brokerYears && (
								<p className="error">{errors.brokerYears}</p>
							)}
						</div>
						<span>
							By proceeding, I agree and review that all information is correct.
						</span>
					</div>
					<div className="join__submit-btn--wrapper">
						<button
							onClick={handleSubmit}
							className="join-team-page-submit-button"
						>
							Submit Application
						</button>
					</div>
					{showAgentExistModalMessage && (
						<AgentExistModalMessage
							setShowLoginMessage={setShowAgentExistModalMessage}
							agentRecordStatus={agentRecordStatus}
							resetForm={resetForm}
						/>
					)}
				</div>
			)}
			{isSubmitting && <PreviewLoadingModal />}
		</div>
	);
};

export default JoinTeam;
