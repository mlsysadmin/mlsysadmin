import React from "react";
import "../styles/loginComponent.css";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {SwipeableButton} from "react-swipeable-button";
import BrokerageLogo from "../assets/BrokerageLogo.png";

const LoginComponent = () => {
    const [phone, setPhone] = useState("");
    const [countryCode, setcountryCode] = useState("+63");

    const handlePhoneNumberChange = (val, data) =>{
        const curCode = `+${data.dialCode}`;
        if (!val.startsWith(curCode)){
            setPhone(curCode);
        }else{
            setPhone(val);
        }
        setcountryCode(curCode);
    }
    const handleSwipeComplete = () => {
	console.log("Swipe completed! Logging in...");
	};
    
	return (
		<div className="login-container">
			<div className="login-content-container">
				<div className="login-content">
					<div className="gen-content-login">
						<div className="logo-area">
							<img src={BrokerageLogo} alt="ML Brokerage Logo" />
						</div>
						<div className="conten-login-page">
							<span id="signin">
								<b>Login or Sign Up</b>
							</span>
							<p id="no-account">
								Get started with your mobile number
							</p>
						</div>
						<div className="mobile-input-login-group">
							<span id="mobile-num-label">
								<b>Mobile Number</b>
							</span>
							<div className="login-input-group">
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
							</div>
							<div className="login-slider">
								<SwipeableButton
									onSuccess={handleSwipeComplete} 
									text="Slide to get started!" 
									text_unlocked="yeee" 
									color="#16362d" 
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default LoginComponent;
