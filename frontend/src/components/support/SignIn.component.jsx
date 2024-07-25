import React from "react";
import logo from "../../asset/SigninLogo.png";
import "../../styles/support/Signin.css";
import SemiRoundBtn from "../custom/buttons/SemiRoundBtn.custom";
const SignIncomponent = () => {
  return (
    <div className="SigninContainer">
      <div className="cardContainer">
        <div className="loginInterface">
          <div className="logo">
            <img src={logo} alt="" width={80}/>
          </div>
          <p>M Lhuillier Philippines</p>
          <h1>Brokerage System</h1>
          {/* <button>Google Sign-In</button> */}
          <SemiRoundBtn 
            label={"Google Sign-In"}
            type="primary" 
            className="sign-in--btn"
            size="large"
            />
        </div>
        <div className="version">
          <div></div>
          <p>version {process.env.REACT_APP_VERSION}</p>
        </div>
      </div>
    </div>
  );
};

export default SignIncomponent;
