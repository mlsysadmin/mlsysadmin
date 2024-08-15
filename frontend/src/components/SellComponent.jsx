import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/sell.css";
import { Row, Col } from "antd";
import bannerImg from "../asset/icons/banner.png";
import { Button, Radio } from "antd";
import { FooterComponent, CustomMlFooter, MainLayout } from "../components";

const SellComponent = () => {
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const url_Redirect = process.env.REACT_APP_LOGIN_URL;

  const handleSignIn = () => {
    if (url_Redirect) {
      window.location.href = url_Redirect;
    }
  };

  const [selectedOption, setSelectedOption] = useState("");

	const handleChange = (event) => {
		setSelectedOption(event.target.value);
	};

  return (
		<div className="sell">
			<div className="sell-container">
				<div className="sell-contents">
					<div className="first-section">
						<img src={bannerImg} alt="" />
						<div className="bannerbg">
							<span className="sell-header">
								{" "}
								<span style={{ color: "red" }}>Sell</span> or{" "}
								<span style={{ color: "red" }}>Rent</span> <br />
								your property <br />
								at the best price
							</span>
							<div className="banner-buttons">
								<a href="/contact-us">
									<button id="contactUs" type="primary">
										Contact Us
									</button>{" "}
								</a>
								<a onClick={handleSignIn}>
									<button id="signIn" type="primary">
										Sign In
									</button>
								</a>
							</div>
						</div>
					</div>
					<div className="second-section">
						<span className="second-content-span">
							Maximize your property{"'"}s potential: Sell or Rent with
							Confidence
						</span>
						<div className="section-container">
							<div className="content">
								<p>
									Do you want to Sell or put your house on Rent? M Lhuillier has
									the right solution for you. Your advertisement will be viewed.
								</p>
								<button
									id="ListPropertybtn"
									type="primary"
									onClick={handleSignIn}
									style={{ cursor: "pointer" }}
								>
									{" "}
									List Your Property
								</button>
							</div>
							<div className="options">
								<label>
									<input
										type="radio"
										name="option"
										value="choose-time"
										checked={selectedOption === "choose-time"}
										onChange={handleChange}
									/>
									<span className="dot"></span> Choose the right time to sell.
								</label>

								<label>
									<input
										type="radio"
										name="option"
										value="right-price"
										checked={selectedOption === "right-price"}
										onChange={handleChange}
									/>
									<span className="dot"></span> Sell at the right price.
								</label>

								<label>
									<input
										type="radio"
										name="option"
										value="negotiate-offer"
										checked={selectedOption === "negotiate-offer"}
										onChange={handleChange}
									/>
									<span className="dot"></span> Negotiate the best offer - not
									just the highest offer.
								</label>
							</div>
						</div>
					</div>
					<div className="third-section">
						<span className="third-cont-guide">How it works?</span>
						<div className="section-cards">
							<p className="section-cont-guide">
								Create your seller account today:
							</p>
							<div className="cards">
								<div className="card1">
									<h5>Step 1:</h5>
									<p>Register in ML Wallet app</p>
								</div>
								<div className="card2">
									<h5>Step 2:</h5>
									<p>Visit the nearest ML Branch to upgrade your tier</p>
								</div>
								<div className="card3">
									<h5>Step 3:</h5>
									<p>Once approved, you’re good to go!</p>
								</div>
								<div className="card4">
									<h5>Step 4:</h5>
									<p>Scan QR Code in the ML Website to login your account.</p>
								</div>
							</div>
						</div>
						<div className="non-wallet-user-group">
							<span>
								If you’re a non-wallet user, please visit the nearest M
								Lhuillier Branch and seek assistance from our FLAs for your
								listings.
							</span>
							<div className="non-wallet-user-step">
								<ul style={{ listStyleType: "none", padding: 0 }}>
									<li>
										<span style={{ fontWeight: "bold" }}>Step 1:</span> Bring
										your listing documents to the ML Branch.
									</li>
									<li>
										<span style={{ fontWeight: "bold" }}>Step 2:</span> An FLA
										will list your documents.
									</li>
									<li>
										<span style={{ fontWeight: "bold" }}>Step 3:</span> Wait for
										verification; the review will take 3-5 working days.
									</li>
									<li>
										<span style={{ fontWeight: "bold" }}>Step 4:</span> Once
										approved, an ML Agent will contact you.
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="fourth-section">
						<div className="fourth-section-content">
							<h1>Have questions? We{"'"}re here to help.</h1>
							<p>
								If you{"'"}re just exploring the idea of selling or buying a
								home, we{"'"}re here to talk through your options.
							</p>
						</div>
						<a href="/contact-us">
							<button id="contactUs">Contact Us</button>
						</a>
					</div>
				</div>
			</div>
			<CustomMlFooter />
			<FooterComponent />
		</div>
	);
};
export default SellComponent;
