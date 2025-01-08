import React from "react";
import "../styles/loginComponent.css";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CreateLoginAttempt, FirstAttemptLogin, searchKyc } from "../api/Public/User.api";
import BrokerageLogo from "../assets/BrokerageLogo.png";
import { DatePicker, Select, notification } from "antd";
import PreviewLoadingModal from "./modals/PreviewLoadingModal";
import { SendOtp, ValidateOtpLogin } from "../api/Public/OtpLogin.api";
import { getCookieData } from "../utils/CookieChecker";
import { SortByText } from "../utils/StringFunctions.utils";
import { useLocation } from "react-router-dom";

const { Option } = Select;

const LoginComponent = () => {

	const location = useLocation();

	const [phone, setPhone] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [countryCode, setCountryCode] = useState("+63");
	const [userDetails, setUserDetails] = useState();
	const [isValidPhone, setIsValidPhone] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isContinued, setIsContinued] = useState(false);
	const [isRegistration, setIsRegistration] = useState(false);
	const [isDateNumber, setDateNumber] = useState("1");
	const [selectedMonth, setSelectedMonth] = useState("1");
	const [selectedYear, setSelectedYear] = useState("2024");
	const [otp, setOtp] = useState(Array(6).fill(""));
	const [isOtpValid, setIsOtpValid] = useState(false);
	const [otpError, setOtpError] = useState("");
	const [birthdateError, setBirthdateError] = useState(false);
	const [otpTimer, setotpTimer] = useState(120);
	const [resend, setResend] = useState(true);

	const [showOtpScreen, setShowOtpScreen] = useState(false);
	const [api, contextHolder] = notification.useNotification();
	const [isFirstLogin, setIsFirstLogin] = useState(false);
	const [currentYear, setCurrentYear] = useState();

	useEffect(() => {
		if (otpTimer > 0) {

			const timer = setInterval(() => {
				setotpTimer((prevTime) => prevTime - 1);
			}, 1000);
			// setIsOtpValid(true);

			return () => clearInterval(timer);
		} else {
			setResend(false);
		}
	}, [otpTimer]);

	useEffect(() => {
		const getCurrentYear = new Date().getFullYear();
		setCurrentYear(getCurrentYear);

	}, [])
	// useEffect(() => {
	// 	console.log(userDetails, isContinued);


	// }, [userDetails, isContinued])

	const cleanPhonenumber = (val) => {
		return val.replace(/\D+/g, "");
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

		if (sanitizedNumber.startsWith("0") || sanitizedNumber.startsWith("9")) {
			setPhone(sanitizedNumber.replace(sanitizedNumber, "+63"));
			// setPhone(sanitizedNumber.replace("9", "+63"));
		} else {
			setCountryCode(curCode);
			setPhone(sanitizedNumber.replace("+63", "0"));
		}

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

			const payload = {
				cellphoneNumber: formattedPhone,
			}

			const firstAttemptLogin = await FirstAttemptLogin(payload);

			const kyc = firstAttemptLogin.data.data.data; // data: {tier:{...}}
			const isFirstAttempt = firstAttemptLogin.data.data.isFirstAttempt;

			if (isFirstAttempt && kyc) {
				setIsContinued(true);
				setIsSubmitting(false);
			} else if (!isFirstAttempt && kyc) {
				handleSignIn();
			}
			else {
				console.log(kyc);
				setIsRegistration(true);
				setIsContinued(true);
				setIsSubmitting(false);
			}
			setUserDetails(kyc);
			setIsFirstLogin(isFirstAttempt);

		} catch (error) {
			console.error("Error during continue:", error);
			// openNotificationWithIcon('warning', 'Unable to login', '')
			setIsSubmitting(false);
		}
	};
	const handleBack = () => {
		window.location.href = "/";
	};
	const handleReturn = () => {
		setIsContinued(false);
		setOtp(Array(6).fill(""));
		setotpTimer(120);
		setDateNumber("1");
		setSelectedMonth("1");
		setSelectedYear("2024");
		setBirthdateError(false);
		setUserDetails(null);
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
	const handleSignIn = async () => {
		try {
			setIsSubmitting(true);
			const cleanPhone = cleanPhonenumber(phone);
			const formatPhone = cleanPhone.search(/^\+?63/) != -1 ? cleanPhone.replace(/^\+?63/, "0") : cleanPhone;

			if (!isFirstLogin) {
				await SendOtp(formatPhone);

				setIsSubmitting(false);
				setIsContinued(true);
				setShowOtpScreen(true);
				setOtp(Array(6).fill(""));
			}
			else {

				const userBdate = userDetails.birthDate;

				const paddedDate = isDateNumber.toString().padStart(2, "0");
				const paddedMonth = selectedMonth.toString().padStart(2, "0");

				const selectedBirthdate = `${selectedYear}-${paddedMonth}-${paddedDate}`;

				if (userBdate !== selectedBirthdate) {
					setBirthdateError(true);
					return;
				} else {

					setBirthdateError(false);
					if (isValidPhone) {

						setIsSubmitting(true);

						await SendOtp(formatPhone);

						setIsSubmitting(false);
						setShowOtpScreen(true);
						setOtp(Array(6).fill(""));
						// sendOtpToPhone(phone);
					}
				}
			}


		} catch (error) {
			setBirthdateError(false);
			console.log("handleSignIn", error);
			setIsSubmitting(false);
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
	const handleOtpVerification = async () => {
		try {

			if (otp.includes("")) {
				return;
			} else {
				if (isRegistration) {
					console.log('registering...');

					setIsSubmitting(true);
				} else {

					const otpCode = otp.join("").toString();
					const cleanPhone = cleanPhonenumber(phone);

					const formatPhone = cleanPhone.search(/^\+?63/) != -1 ? cleanPhone.replace(/^\+?63/, "0") : cleanPhone;
					setIsSubmitting(true);
					const validateLogin = await ValidateOtpLogin(formatPhone, otpCode);
					setIsSubmitting(false);

					if (validateLogin.code == "USER_LOGGED_IN") {

						const loginParams = {
							ckycId: userDetails.ckycId,
							tier: userDetails.tier.label
						}

						const userAttempt = await CreateLoginAttempt(loginParams);

						const isSeller = userAttempt.data.data.isSeller;

						console.log(location);
						const searchParams = new URLSearchParams(location.search);
						console.log(searchParams.get('redirect'), location.hash);
						const falsy = [null, "", "null"];
						const redirect = searchParams.get('redirect');
						const hash = location.hash;
						const hasRedirect = !falsy.includes(redirect) && !falsy.includes(hash);

						if (hasRedirect) {
							if (isSeller) {
								window.location.href = `/${redirect}${hash}`;
							} else {
								window.location.href = "/login"
							}
						}
						else {
							window.location.href = '/'
						}
					} else {
						window.location.href = "/login"

					}
				}
			}
		} catch (error) {
			setIsSubmitting(false);

			console.log(error);
			let message;
			let description;
			let notifType = "error";

			if (Object.keys(error).includes('response')) {
				let data = error.response.data.data.error;
				if (data.status == 401) {

					notifType = "warning";
					message = "Invalid OTP";
					description = data.data.message;

				} else {
					if (data.data?.code == "LOGIN_ACCOUNT_NOT_FOUND") {
						message = "Not Found";
						description = "We are unable to log you in using this mobile number. To create an account using this mobile number, please fill out fields to Register";
						// setUserDetails(null);
						// setShowOtpScreen(false);
					}
					else {
						message = "Failed";
						description = data.message;
					}
				}
			} else {
				message = "Failed";
				description = "We're sorry something went wrong on our end. Please try again later.";
			}

			openNotificationWithIcon(
				notifType,
				message,
				description
			);
		}

	};

	const handleResendOtp = async () => {
		console.log(otpTimer);
		const cleanPhone = cleanPhonenumber(phone);
		const formatPhone = cleanPhone.search(/^\+?63/) != -1 ? cleanPhone.replace(/^\+?63/, "0") : cleanPhone;

		if (otpTimer == 0) {
			setResend(true);
			setIsSubmitting(true);
			
			await SendOtp(formatPhone);
			setIsSubmitting(false);
			setotpTimer(120);
		} else {
			return;
		}
	};
	const openNotificationWithIcon = (type, message, description) => {
		api[type]({
			message: message,
			description: description,
			placement: "bottomRight",
			duration: type == "error" ? 4 : 3,
		});
	};

	return (
		<>
			{contextHolder}
			<div className="login-container">
				<div className="login-content-container">
					<div className="login-content">
						<div className="gen-content-login">
							<div className="logo-area" onClick={() => window.location.href = "/"}>
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
													<span
														style={{
															color: `${otpTimer == 0 ? 'var(--red)' : ''}`,
															fontWeight: '500',
															cursor: `${otpTimer == 0 ? 'pointer' : ''}`,
														}}>Resend OTP</span>  {Math.floor(otpTimer / 60)}:
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
												<div className="bdate-with-error">
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
																	{ length: currentYear - 1905 + 1 },
																	(_, i) => 1905 + i
																).sort((y, i) => SortByText(y, y)).map((year) => (
																	<Option key={year} value={year}>
																		{year}
																	</Option>
																))}
															</Select>
														</div>
													</div>
													{birthdateError && (
														<p style={{ color: "red", marginTop: "8px", fontSize: "12px", textAlign: "center" }}>
															Birthdate does not match with the existing
															data.
														</p>
													)}
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
												<DatePicker placeholder="Date of Birth" className="birthdate--picker" popupClassName="birthdate--picker-pop-up" />
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
		</>
	);
};
export default LoginComponent;
