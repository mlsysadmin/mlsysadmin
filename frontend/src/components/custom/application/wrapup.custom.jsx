import React from "react";
import "../../../styles/wrapupdetails.css"

const WrapUpDetails = () => {
    return (
        <div>
            <h3>Wrap Up</h3>
            <div className="prop-content2">
                <br />
                <span className="prop-quest">What is your email address?</span><br />
                <span>Your information is protected by SSL encryption.</span>
                <div className="prop-info-wrap-up-input">
                    <input type="email" placeholder="Your email address"
                    ></input>
                </div>
            </div>
            <div className="prop-content6">
                <br />
                <span className="prop-quest">What is your name?</span><br />
                <span>Your information is protected by SSL encryption.</span>
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