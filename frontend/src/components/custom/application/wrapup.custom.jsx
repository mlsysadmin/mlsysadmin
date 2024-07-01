import React from "react";
import "../../../styles/wrapupdetails.css"

const WrapUpDetails = () => {
    return (
        <div className="wrap-up-inf">
            <h3>Wrap Up</h3>
            <div className="prop-content2-wrap-up">
                <br />
                <span className="prop-quest">What is your email address?</span><br />
                <span className="protect-tagline">Your information is protected by SSL encryption.</span>
                <div className="prop-info-wrap-up-input">
                    <input type="email" placeholder="Your email address"
                    ></input>
                </div>
            </div>
            <div className="prop-content-wrap-up-2">
                <br />
                <span className="prop-quest">What is your name?</span><br />
                <span className="protect-tagline">Your information is protected by SSL encryption.</span>
                <div className="prop-info-wrap-up-input2">
                    <input type="firstname" placeholder="First Name"
                    ></input>
                    <input type="lastname" placeholder="Last Name" className="first-last"
                    ></input>
                </div>
            </div>
        </div>
    );
}
export default WrapUpDetails