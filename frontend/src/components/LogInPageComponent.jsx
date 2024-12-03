import React from "react";
import "../styles/loginComponent.css";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { searchKyc } from "../api/Public/User.api";
import BrokerageLogo from "../assets/BrokerageLogo.png";
import { DatePicker, Select } from "antd";
import PreviewLoadingModal from "./modals/PreviewLoadingModal";

const { Option } = Select;

const LoginComponent = () => {
	const [phone, setPhone] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [countryCode, setCountryCode] = useState("+63");
	const [userDetails, setUserDetails] = useState();
	const [isValidPhone, setIsValidPhone] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isContinued, setIsContinued] = useState(false);
	const [isDateNumber, setDateNumber] = useState("1");
	const [selectedMonth, setSelectedMonth] = useState("January");
	const [selectedYear, setSelectedYear] = useState("2024");
	const [otp, setOtp] = useState(Array(6).fill(""));
	const [isOtpValid, setIsOtpValid] = useState(true);
	const [otpError, setOtpError] = useState("");
	const [otpTimer, setotpTimer] = useState(120);
	const [resend, setResend] = useState(true);

	const [showOtpScreen, setShowOtpScreen] = useState(false);

	const cleanPhonenumber = (val) => {
		return val.replace(/\D+/g, "");
	};
	const fetchUserDetails = async (formattedPhone) => {
		try {
			const response = await searchKyc(formattedPhone);
			const respData = response.data.data;
			console.log("respData", respData);
			setUserDetails(respData);
		} catch (error) {
			console.error("Error fetching user details:", error);
		}
	};
	const validatePhoneNumber = (val, dialCode) => {
		const sanitizedNumber = cleanPhonenumber(val);

		const numberWithoutCountryCode = sanitizedNumber.replace(dialCode, "");

		const validLengths = {
			63: 10,
			1: 10,
			44: 10,
		};

		const expectedLength = validLengths[dialCode] || 10;
		const isNumeric = /^\d+$/.test(numberWithoutCountryCode);

		if (!isNumeric || numberWithoutCountryCode.length !== expectedLength) {
			setErrorMessage(`Please enter a valid phone number.`);
			setIsValidPhone(false);
		} else {
			const formattedPhone = sanitizedNumber.replace("63", "0");
			setErrorMessage("");
			setIsValidPhone(true);
			// setPhone(formattedPhone);
		}
	};

	const handlePhoneNumberChange = (val, data) => {
		const curCode = `+${data.dialCode}`;
		const sanitizedNumber = cleanPhonenumber(val);

		setCountryCode(curCode);
		setPhone(sanitizedNumber.replace("+63", "0"));
		// setPhone(curCode + sanitizedNumber.replace(curCode, ""));
		validatePhoneNumber(sanitizedNumber, data.dialCode);
	};

	const handleContinue = async () => {
		setIsSubmitting(true);
		if (!isValidPhone) {
			setErrorMessage("Please provide a valid phone number before continuing.");
			return;
		}
		const formattedPhone = phone.replace("63", "0");
		if (countryCode === "+63") {
			console.log("Formatted phone for submission:", formattedPhone);
			// setPhone(formattedPhone);
		}

		try {
			await fetchUserDetails(formattedPhone);
			setIsContinued(true);
			setIsSubmitting(false);

			console.log("User details fetched:", userDetails);
		} catch (error) {
			console.error("Error during continue:", error);
			setIsSubmitting(false);
		}
	};
	const handleBack = () => {
		window.location.href = "/";
	};
	const handleReturn = () => {
		setIsContinued(false);
	};

	const maskUserDetails = (name) => {
		if (name.length <= 1) {
			return name;
		}
		if (name.length === 2) {
			return name;
		}

		const firstLetter = name.charAt(0);
		const lastLetter = name.charAt(name.length - 1);
		const maskedName = "*".repeat(name.length - 2);
		const maskInfo = firstLetter + maskedName + lastLetter;

		return maskInfo;
	};

	const handleDateNumberChange = (value) => {
		setDateNumber(value);
	};
	const handleMonthChange = (value) => {
		setSelectedMonth(value);
	};
	const handleYearChange = (value) => {
		setSelectedYear(value);
	};
	const handleSignIn = () => {
		if (isValidPhone) {
			setShowOtpScreen(true);
			setOtp(Array(6).fill(""));

			// sendOtpToPhone(phone);
		}
	};

	const handleOtpInput = (e, index) => {
		const value = e.target.value;
		if (!isNaN(value) && value.length <= 1) {
			const updatedOtp = [...otp];
			updatedOtp[index] = value;
			setOtp(updatedOtp);

			if (value && index < otp.length - 1) {
				const nextInput = document.getElementById(`otp-input-${index + 1}`);
				if (nextInput) nextInput.focus();
			}
		}
	};

	const handleKeyDown = (e, index) => {
		if (e.key === "Backspace" && otp[index] === "") {
			if (index > 0) {
				const prevInput = document.getElementById(`otp-input-${index - 1}`);
				if (prevInput) prevInput.focus();
			}
		}
	};
	const handleOtpVerification = () => {
		console.log("Success");
		if (userDetails) {
			if (
				userDetails?.tier?.label !== "BUYER" ||
				userDetails?.tier?.label !== "SEMI-VERIFIED"
			) {
				window.location.href = "/";
			} else {
				// window.location.href = `${loginUrl}?redirect_url=${encodeURIComponent(
				// 	redirectUrl
				// )}`;
			}
		
		} else {
			// window.location.href = `${loginUrl}?redirect_url=${encodeURIComponent(
			// 	redirectUrl
			// )}`;
			window.location.href = "/login";
		}
	};
	useEffect(() => {
		if (otpTimer > 0) {
			const timer = setInterval(() => {
				setotpTimer((prevTime) => prevTime - 1);
			}, 1000);

			return () => clearInterval(timer);
		} else {
			setResend(false);
		}
	}, [otpTimer]);

	const handleResendOtp = () => {
		setotpTimer(120);
		setResend(true);
	};

	return (
		<div className="login-container">
			<div className="login-content-container">
				<div className="login-content">
					<div className="gen-content-login">
						<div className="logo-area">
							<img src={BrokerageLogo} alt="ML Brokerage Logo" />
						</div>
						{isContinued ? (
							showOtpScreen ? (
								<div className="otp-verification-container">
									<p className="otp-header">
										Enter the OTP we’ve sent to your phone.
									</p>
									<div className="otp-input-group">
										{otp?.map((digit, index) => (
											<input
												onChange={(e) => handleOtpInput(e, index)}
												key={index}
												id={`otp-input-${index}`}
												onKeyDown={(e) => handleKeyDown(e, index)}
												type="text"
												maxLength="1"
												value={digit}
											/>
										))}
									</div>
									<div className="otp-and-submit">
										<div className="user-logged-in">
											<button id="back-login-button" onClick={handleReturn}>
												Back
											</button>
											<button
												id="continue-login-button"
												style={{
													backgroundColor: "var(--red)",
													color: "white",
												}}
												onClick={handleOtpVerification}
											>
												Submit
											</button>
										</div>
										<p className="resend-otp">
											<span onClick={handleResendOtp}>
												Resend OTP: {Math.floor(otpTimer / 60)}:
												{(otpTimer % 60).toString().padStart(2, "0")}
											</span>
										</p>
									</div>
								</div>
							) : userDetails ? (
								<div className="success-login-userdetails">
									<div className="userdetails-logged-group">
										<div className="login-input-groups">
											<div className="user-details-wrap">
												<li className="user-details-label">
													Mobile No. : <b>{userDetails.cellphoneNumber}</b>
												</li>
												<li className="user-details-label">
													First Name :{" "}
													<b>{maskUserDetails(userDetails.name.firstName)}</b>
												</li>
												<li className="user-details-label">
													Middle Initial : <b>{userDetails.name.middleName}</b>
												</li>
												<li className="user-details-label">
													Last Name :{" "}
													<b>{maskUserDetails(userDetails.name.lastName)}</b>
												</li>
												<li className="user-details-label">
													Address in:{" "}
													<b>{userDetails.addresses.current.addressL2Name}</b>
												</li>
											</div>
										</div>
									</div>
									<div className="sub-groups-userdetails">
										<span>Is this you? Continue with your date of birth:</span>
										<div className="user-action-group-login">
											<div className="sub-groups-user-bdate">
												<div className="user-bdate-month">
													<Select
														className="month-select-options"
														onChange={handleMonthChange}
														value={selectedMonth}
														style={{ width: "100%" }}
													>
														<Option value="1">JANUARY</Option>
														<Option value="2">FEBRUARY</Option>
														<Option value="3">MARCH</Option>
														<Option value="4">APRIL</Option>
														<Option value="5">MAY</Option>
														<Option value="6">JUNE</Option>
														<Option value="7">JULY</Option>
														<Option value="8">AUGUST</Option>
														<Option value="9">SEPTEMBER</Option>
														<Option value="10">OCTOBER</Option>
														<Option value="11">NOVEMBER</Option>
														<Option value="12">DECEMBER</Option>
													</Select>
												</div>
												<div className="user-bdate-day">
													<Select
														className="date-select-options"
														onChange={handleDateNumberChange}
														value={isDateNumber}
													>
														{Array.from({ length: 31 }, (_, i) => i + 1).map(
															(day) => (
																<Option key={day} value={day}>
																	{day}
																</Option>
															)
														)}
													</Select>
												</div>
												<div className="user-bdate-year">
													<Select
														className="year-select-options"
														onChange={handleYearChange}
														value={selectedYear}
													>
														{Array.from(
															{ length: 2024 - 1905 + 1 },
															(_, i) => 1905 + i
														).map((year) => (
															<Option key={year} value={year}>
																{year}
															</Option>
														))}
													</Select>
												</div>
											</div>
											<div className="user-logged-in">
												<button id="back-login-button" onClick={handleReturn}>
													Back
												</button>
												<button
													id="continue-login-button"
													style={{
														backgroundColor: "var(--red)",
														color: "white",
													}}
													onClick={handleSignIn}
												>
													Continue
												</button>
											</div>
										</div>
									</div>
								</div>
							) : (
								<div className="user-not-found">
									<div className="user-not-found-input-group">
										<input
											className="user-det-input"
											placeholder="First Name"
											type="text"
										/>
										<input
											className="user-det-input"
											placeholder="Middle Name"
											type="text"
										/>
										<input
											className="user-det-input"
											placeholder="Last Name"
											type="text"
										/>
										<div className="user-det-input">
											<DatePicker />
										</div>

										<input
											className="user-det-input"
											placeholder="Email Address"
											type="email"
										/>
									</div>
									<div className="user-logged-in">
										<button id="back-login-button" onClick={handleReturn}>
											Back
										</button>
										<button
											id="continue-login-button"
											style={{
												backgroundColor: "var(--red)",
												color: "white",
											}}
											onClick={handleSignIn}
										>
											Continue
										</button>
									</div>
								</div>
							)
						) : (
							// Initial Login Flow
							<div className="content-login-page">
								<p id="no-account">Let’s start with your mobile number</p>
								<div className="mobile-input-login-group">
									<div className="login-input-groups">
										<PhoneInput
											country={"ph"}
											value={phone}
											onChange={handlePhoneNumberChange}
											enableAreaCodes={true}
											inputProps={{
												name: "phone",
												required: true,
												autoFocus: true,
											}}
										/>
										{errorMessage && (
											<p
												style={{
													color: "red",
													fontSize: "0.9rem",
													marginTop: "5px",
												}}
											>
												{errorMessage}
											</p>
										)}
									</div>
									<div className="login-slider">
										<button id="back-login-button" onClick={handleBack}>
											Back
										</button>
										<button
											id="continue-login-button"
											onClick={handleContinue}
											style={{
												backgroundColor: isValidPhone
													? "var(--red)"
													: "#d9d9d9",
												color: isValidPhone ? "white" : "white",
												cursor: isValidPhone ? "pointer" : "not-allowed",
											}}
										>
											Continue
										</button>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
				{isSubmitting && <PreviewLoadingModal />}
			</div>
		</div>
	);
};
export default LoginComponent;
