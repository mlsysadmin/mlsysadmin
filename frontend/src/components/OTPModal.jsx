import React, { useState } from "react";
import "../styles/OTPModal.css";
import { Button } from "antd";

const OTPModal = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleVerify = () => {
    // Handle the OTP verification logic here

    // Clear the OTP fields
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <div className="otp-modal-maincontainer">
      <div className="otp-modal-container">
        <div className="otp-modal-content">
          <div className="otp-verification-header">
            <h3>OTP Verification</h3>
            <p>
              Please enter the OTP sent to your mobile number to complete your
              application.
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
                />
              ))}
            </div>
            <p>Don't receive OTP? <span style={{color:"red"}}>Resend OTP</span></p>
          </div>
          <Button id="otp-modal" type="primary" onClick={handleVerify}>
            Verify Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
