import React, { useState } from "react";
import "../../styles/modals/RegistrationModal.css";
import logo from "../../assets/red-ml-logo.png";
import google from "../../assets/icons/logreg/google-icon.png";
import apple from "../../assets/icons/logreg/apple-icon.png";
import upload from "../../assets/icons/upload/document-upload.png";
import flag from "../../assets/icons/Pflag.png";
import vector from "../../assets/Vector.png";

const RegistrationModal = () => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const handleRegistrationModalClose = () => {
    setShowRegistrationModal(false);
  };

  return (
    <div className="App">
      <button onClick={() => setShowRegistrationModal(true)}>
        Registration
      </button>
      {showRegistrationModal && (
        <div className="modal">
          <div className="modalcontent">
            <span
              className="close-button"
              onClick={handleRegistrationModalClose}
            >
              &times;
            </span>

            <div className="logo">
              <img className="victor" src={logo} alt="M Lhuillier Logo" />
            </div>
            <h1 className="header-reg">Welcome to M Lhuillier Brokerage</h1>
            <div className="input-group">
              <div className="mobilenum">
                <img className="icOn" src={flag} alt="flag" />
                {/* <img
                  style={{ width: "3%", height: "7px" }}
                  src={vector}
                  alt=""
                /> */}
                <input type="number" placeholder="Mobile Number" />
              </div>
            </div>
            <div className="input-group name">
              <input className="input" type="text" placeholder="First Name" />
              <input className="input" type="text" placeholder="Middle Name" />
            </div>
            <div className="input-group name">
              <input className="input" type="text" placeholder="Last Name" />
              <input className="input" type="text" placeholder="Suffix Name" />
            </div>
            <div className="input-group">
              <input className="input" type="date" placeholder="Birthdate" />
            </div>
            <div className="input-group">
              <input
                className="input"
                type="email"
                placeholder="Email Address"
              />
            </div>
            <div className="input-group">
              <input className="input" type="password" placeholder="Password" />
            </div>
            <div className="input-group">
              <select className="select">
                <option value="broker">I am a real estate broker</option>
                <option value="agent">I’m a real estate sales agent</option>
                <option value="home-seeker">
                  I’m looking for my next home Buy/Rent
                </option>
                <option value="homeowner">
                  I’m a homeowner looking to Sell/Rent
                </option>
              </select>
            </div>
            <div className="input-FILE-group">
              <div className="file-input">
                <input
                  type="file"
                  id="file-input"
                  style={{ display: "none" }}
                />
                <label htmlFor="file-input" id="file-input">
                  <img className="icOn" src={upload} alt="Upload" />
                  <span>Upload Real Estate License</span>
                </label>
              </div>
            </div>
            <p className="terms-text">
              By signing up, I agree to M Lhuillier's{" "}
              <a href="#">Terms of Use</a>
            </p>
            <button className="button" onClick={handleRegistrationModalClose}>
              REGISTER
            </button>
            <div className="social-login">
              <button className="social-button">
                <img src={google} alt="Google" /> Continue with Google
              </button>
              <button className="social-button">
                <img src={apple} alt="Apple" /> Continue with Apple
              </button>
            </div>
            <div className="signin-text">
              Already have an account?{" "}
              <a href="#" onClick={handleRegistrationModalClose}>
                Sign in
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationModal;
