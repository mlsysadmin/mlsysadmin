import React, { useState } from "react";
import "../../../styles/wrapupdetails.css";

const WrapUpDetails = () => {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const handleFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastname = (e) => {
    setLastname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="wrap-up-inf">
      <h3>Wrap Up</h3>
      <div className="prop-content2-wrap-up">
        <br />
        <span className="prop-quest">What is your email address?</span>
        <br />
        <span className="protect-tagline">Your information is protected by SSL encryption.</span>
        <div className="prop-info-wrap-up-input">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
      </div>
      <div className="prop-content-wrap-up-2">
        <br />
        <span className="prop-quest">What is your name?</span>
        <br />
        <span className="protect-tagline">Your information is protected by SSL encryption.</span>
        <div className="prop-info-wrap-up-input2">
          <input
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={handleFirstname}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="first-last"
            value={lastname}
            onChange={handleLastname}
          />
        </div>
      </div>
    </div>
  );
};

export default WrapUpDetails;