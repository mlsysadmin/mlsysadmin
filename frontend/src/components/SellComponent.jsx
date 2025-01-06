import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/sell.css";
import { isCookiePresent } from "../utils/CookieChecker";
import { DownOutlined } from "@ant-design/icons";
import bannerImg from "../asset/banners/house_car_LE_auto_x2-transformed.jpeg";
import { Button, Radio } from "antd";
import UpgradeTierModal from "./modals/UpgradeTierModal";
import { FooterComponent, CustomMlFooter, MainLayout } from "../components";
import SemiRoundBtn from "./custom/buttons/SemiRoundBtn.custom";
import WorkingOnItModal from "./ComingSoonComponent";
import { buyFaqs, sellFaqs } from "../utils/FaqsData";
import { useAuth } from "../Context/AuthContext";

const SellComponent = () => {

	const {
		isAuthenticated,
		logout,
		userDetails
	} = useAuth();

	const [activeIndex, setActiveIndex] = useState(null);
	const [value, setValue] = useState(1);
	const [tierUpgrade, setTierUpgrade] = useState(false);

	const onChange = (e) => {
		console.log("radio checked", e.target.value);
		setValue(e.target.value);
	};
	const navigate = useNavigate();
	const location = useLocation();

	const topSellComponentDiv = useRef(null);
	const scrollToSection = (sectionRef) => {
		if (sectionRef?.current) {
			sectionRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	const [showUpgradeModal, setShowUpgradeModal] = useState(false);

	const openUpgradeModal = () => {
		setShowUpgradeModal(true);
	};
	const closeModal = () => {
		setShowUpgradeModal(false);
	};

	const handleSignIn = () => {

		if (isAuthenticated && userDetails) {
			navigate('/');
		} else {
			window.location.href = `/login`;
		}
	};

	const handleListPropertyClick = () => {
		if (isAuthenticated) {
			window.location.href = "/saved-properties#listingForm";
		} else {
			openUpgradeModal();
		}
	};

	const handleListPropertyLogin = () => {
		if (isAuthenticated) {
			window.location.href = "/saved-properties#listingForm";
		} else {
			window.location.href = `/login/?redirect=saved-properties#listingForm`;
		}
	};

	useEffect(() => {
		if (location.hash === "#sell") {
			scrollToSection(topSellComponentDiv);
		}
	}, [location]);

	const toggleFaq = (index) => {
		if (activeIndex === index) {
			setActiveIndex(null);
		} else {
			setActiveIndex(index);
		}
	};
	const [selectedOption, setSelectedOption] = useState("");

	const handleChange = (event) => {
		setSelectedOption(event.target.value);
	};
	const [showModal, setShowModal] = useState(false);

	const handleButtonClick = () => {
		navigate("/contact-us");
	};
	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const SellBUyFaqs = {
		sell: { faqs: sellFaqs, title: "Sell" },
		buy: { faqs: buyFaqs, title: "Rent" },
	};
	const combinedFaqs = [...sellFaqs, ...buyFaqs];

	return (
		<div className="sell" ref={topSellComponentDiv}>
			<div className="sell-container">
				<div className="sell-contents">
					<div className="first-section">
						<div className="sell-banner-bg">
							<img src={bannerImg} alt="" />
						</div>
						<div className="bannerbg">
							<span className="sell-header">
								{" "}
								<span style={{ color: "red" }}>Sell</span> or{" "}
								<span style={{ color: "red" }}>Rent</span> <br />
								your property <br />
								at the best price
							</span>
							<div className="banner-buttons">
								{/* <a href="/contact-us">
									<button id="contactUs" type="primary">
										Contact Us
									</button>{" "}
								</a> */}
								<SemiRoundBtn
									label={"Contact Us"}
									id="contactUs"
									className={"sell--action-btn"}
									handleClick={handleButtonClick}
									// handleClick={() => navigate({
									// 	pathname: "contact-us"
									// })}
								/>
								{/* <a onClick={handleSignIn}>
									<button id="signIn" type="primary">
										Sign In
									</button>
								</a> */}{" "}
								<SemiRoundBtn
									label={"Sign In"}
									id="signIn"
									className={"sell--action-btn"}
									handleClick={handleSignIn}
								/>
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
								<SemiRoundBtn
									label={"List Your Property"}
									id="ListPropertybtn"
									className={"sell--action-btn"}
									handleClick={handleListPropertyClick}
								/>
								{showUpgradeModal && (
									<UpgradeTierModal
										isVisible={showUpgradeModal}
										onClose={closeModal}
										showLogin={handleListPropertyLogin}
									/>
								)}
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
						<div className="third--subtitle">
							<p className="section-cont-guide">
								Create your seller account today:
							</p>
						</div>
						<div className="section-cards">
							<div className="cards">
								<div className="card1">
									<h5>Step 1:</h5>
									<p> Enter your mobile number to register</p>
								</div>
								<div className="card2">
									<h5>Step 2:</h5>
									<p>Once registered, you’re good to go!</p>
								</div>
								<div className="card3">
									<h5>Step 3:</h5>
									<p>Login your mobile number to receive OTP.</p>
								</div>
								{/* <div className="card4">
									<h5>Step 4:</h5>
									<p>Scan QR Code in the ML Website to login your account.</p>
								</div> */}
							</div>
						</div>
						<div className="non-wallet-user-group">
							<span>
								If you are not an MCash user or have not registered, please
								visit the nearest M Lhuillier branch and seek assistance from
								our FLAs for your listings.
							</span>
							<div className="non-wallet-user-step">
								<ul style={{ listStyleType: "none", padding: 0 }}>
									<li>
										<span style={{ fontWeight: "bold" }}>Step 1:</span> Bring
										your listing documents to the M Lhuillier branch.
									</li>
									<li>
										<span style={{ fontWeight: "bold" }}>Step 2:</span> An FLA
										will process your documents.
									</li>
									<li>
										<span style={{ fontWeight: "bold" }}>Step 3:</span> Wait for
										verification. The review process will take 3–5 working days.
									</li>
									<li>
										<span style={{ fontWeight: "bold" }}>Step 4:</span> Once
										approved, an M Lhuillier Agent will contact you.
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
						<div className="sell-component-faqs">
							<div className="sell-component-faqs-content">
								{Object.keys(SellBUyFaqs).map((category, i) => {
									const { faqs, title } = SellBUyFaqs[category];
									return (
										<div className="sell-component-faqs-questions" key={i}>
											<h2>{title}</h2>
											{faqs.map((item, index) => (
												<div className="sell-buy-faqs" key={index}>
													<div
														className="sell-faqs-dropdown"
														onClick={() => toggleFaq(index)}
														style={{
															display: activeIndex === index ? "flex" : "flex",
															flexDirection:
																activeIndex === index ? "column" : "row",
														}}
													>
														{item.question}
														<DownOutlined
															style={{
																color: "rgb(164, 161, 161, 27%)",
																transform:
																	activeIndex === index
																		? "rotate(180deg)"
																		: "none",
															}}
															className="dropdown-icon"
														/>
														{activeIndex === index && (
															<div
																className="sell-faqs-dropdown-content"
																style={{ height: "auto", fontWeight: "100px" }}
															>
																{item.answer}
															</div>
														)}
													</div>
												</div>
											))}
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
			{showModal && (
				<WorkingOnItModal onClose={toggleModal} isOpen={showModal} />
			)}
		</div>
	);
};
export default SellComponent;
