import React from "react";
import logo from "../../asset/SigninLogo.png";
import "../../styles/support/Signin.css";
const SignIncomponent = () => {
  return (
    <div className="SigninContainer">
      <div className="cardContainer">
        <div className="loginInterface">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <p>M Lhuillier Philippines</p>
          <h1>Brokerage System</h1>
          <button>Google Sign-In</button>
        </div>
        <div className="version">
          <div></div>
          <p>version 1.0</p>
        </div>
      </div>
    </div>
  );
};

export default SignIncomponent;
