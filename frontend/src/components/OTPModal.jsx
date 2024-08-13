import React, { useState, useRef, useEffect } from "react";
import "../styles/OTPModal.css";
import { Button, message } from "antd";
import SuccessModalComponent from "../components/SuccessModalComponent";

const OTPModal = ({ visible, onClose }) => {
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const [resendDisabled, setResendDisabled] = useState(false);
	const [timer, setTimer] = useState(30);
	const otpRefs = useRef([]);

	const [showSuccessModalComponent, setShowSuccessModalComponent] =
		useState(false);

	useEffect(() => {
		if (!visible) {
			setOtp(["", "", "", "", "", ""]);
		}
	}, [visible]);

	const handleChange = (e, index) => {
		const value = e.target.value;
		if (/^\d?$/.test(value)) {
			const newOtp = [...otp];
			newOtp[index] = value;
			setOtp(newOtp);

			// Move to next field if current field is filled
			if (value && index < otp.length - 1) {
				otpRefs.current[index + 1].focus();
			}
		}
	};

	const handleKeyDown = (e, index) => {
		// Move to previous field on backspace if current field is empty
		if (e.key === "Backspace" && otp[index] === "" && index > 0) {
			otpRefs.current[index - 1].focus();
		}
	};

	const handleVerify = () => {
		// Check if all OTP fields are filled
		if (otp.some((digit) => digit === "")) {
			message.error("Please fill in all OTP fields."); // Show an error message
			return;
		}

		// Clear the OTP fields
		setOtp(["", "", "", "", "", ""]);

		// Show the Success Modal
		setShowSuccessModalComponent(true);
		onClose(); // Close the OTP modal
	};

	const handleResendOTP = () => {
		// Simulate sending OTP
		message.success("OTP has been resent!");

		// Disable the resend button and start a countdown timer
		setResendDisabled(true);
		setTimer(30);
		const countdown = setInterval(() => {
			setTimer((prev) => {
				if (prev === 1) {
					clearInterval(countdown);
					setResendDisabled(false);
					return 30;
				}
				return prev - 1;
			});
		}, 1000);
	};

	if (!visible && !showSuccessModalComponent) return null;

	return (
		<>
			{visible && (
				<div
					className="otp-modal-maincontainer"
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
					<div className="overlay" onClick={onClose}></div>
					<div className="otp-modal-container">
						<div className="otp-modal-content">
							<div className="otp-verification-header">
								<h3>OTP Verification</h3>
								<p>
									Please enter the OTP sent to your mobile number to complete
									your application.
								</p>
							</div>
							<div className="otp-container">
								<div className="otp-box-container">
									{otp.map((digit, index) => (
										<input
											key={index}
											className="otp-box"
											type="text"
											maxLength="1"
											value={digit}
											onChange={(e) => handleChange(e, index)}
											onKeyDown={(e) => handleKeyDown(e, index)}
											ref={(el) => (otpRefs.current[index] = el)}
										/>
									))}
								</div>
								<p>
									Didn't receive OTP?{" "}
									<span
										style={{
											color: resendDisabled ? "gray" : "red",
											cursor: resendDisabled ? "not-allowed" : "pointer",
										}}
										onClick={!resendDisabled ? handleResendOTP : null}
									>
										Resend OTP {resendDisabled && `(${timer}s)`}
									</span>
								</p>
							</div>
							<Button id="otp-modal" type="primary" onClick={handleVerify}>
								Verify Now
							</Button>
						</div>
					</div>
				</div>
			)}
			{showSuccessModalComponent && (
				<SuccessModalComponent
					title="Successfully Submitted!"
					message="Your application is yet to be reviewed.
We will expedite the review process to minimize any inconvenience. Rest assured, we will keep you informed."
					showButton={false}
					setIsSuccessModalOpen={setShowSuccessModalComponent}
					onClick={onClose}
				/>
			)}
		</>
	);
};

export default OTPModal;
