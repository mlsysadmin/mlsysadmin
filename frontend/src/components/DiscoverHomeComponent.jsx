import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomMlFooter from "./custom/Custom.Mlfooter";
import FooterComponent from "./layout/FooterComponent";
import MainLayout from "./layout/layout.component";
import { Slider, Progress, Menu, Select } from "antd";
import iconcalcu from "../assets/icons/previewlisting/calculatorsign.png";
import { DownOutlined, MessageOutlined, CalculatorOutlined } from "@ant-design/icons";
import homeicon from "../asset/icons/homeicon.png";
import { homeloanFaqs, mortgageFaqs } from "../utils/FaqsData";
import dollaricon from "../asset/icons/dollar-icon.png";
import "../styles/discoverhome.css";
import {FloatButton} from "antd";
import FloatBtnGroup from "./custom/buttons/FloatBtnGroup";
import ContactUsWidget from "./modals/ContactUsWidget";
import CalculatorWidgetModal from "./modals/CalculatorWidgetModal";
import Title from "antd/es/skeleton/Title";

const DiscoverHomeComponent = () => {
	const navigate= useNavigate();
	const [activeIndex, setActiveIndex] = useState(null);
	const [monthlyPayment, setMonthlyPayment] = useState(0);
	const [HomepriceRange, setHomePriceRange] = useState(100000);
	const [DppriceRange, setDpHomePriceRange] = useState(10000);
	const [yearFixed, setyearFixed] = useState(30);
	const [interestPerMonthAmount, setInterestPerMonthAmount] = useState(0);
	const [interestRate, setInterestRate] = useState(0);
	const [yearlypayment, setYearlyPayment] = useState(0);
	const [progressBarVal, setProgressBarVal] = useState(HomepriceRange);
	const [totalNumberMonths, setTotalnumberMonths] = useState(0);
	const [principalWithInterest, setPrincipalwithInterest] = useState(0);


	const [isContactUsFormVisible, setContactUsFormVisible] = useState(false);
	const [isCalculatorVisible, setCalculatorVisible] = useState(false);
	const toggleCalculator = () => {
		setCalculatorVisible(!isCalculatorVisible);
		setContactUsFormVisible(false);
	};
	const closeWidgetCalc = () => {
		setCalculatorVisible(false);
		setContactUsFormVisible(false);
	};
	const toogleContarctUsForm = () => {
		setCalculatorVisible(false);
		setContactUsFormVisible(!isContactUsFormVisible);
	};


	const handleHomePriceRangeChange = (values) => {
		setHomePriceRange(values);
	};
	const formatValue = (value) => {
		if (value === undefined) {
			return "N/A";
		}
		return value.toLocaleString();
	};

	const handleDpPriceRange = (values) => {
		setDpHomePriceRange(values);
	};
	const handleHomePriceInputChange = (e) => {
		const value = e.target.value.replace(/,/g, "");
		const parsedValue = parseInt(value, 10) || 0;
		setHomePriceRange(parsedValue);
	};

	const handleDpInputChange = (e) => {
		const value = e.target.value.replace(/,/g, "");
		const parsedValue = parseInt(value, 10) || 0;
		setDpHomePriceRange(parsedValue);
	};


	const getApproved = () =>{
		window.location.href = "/mortgage"
	}
	const handleInterestRateChange = (values) => {
		setInterestRate(values);
	};
	const toggleAccordion = (index) => {
		setActiveIndex(index === activeIndex ? null : index);
	};

	const calculatorRef = useRef(null);
	const location = useLocation();
	const scrollToSection = (sectionRef) => {
		if (sectionRef?.current) {
			sectionRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	useEffect(() => {
		if (location.hash === "#calculator") {
			scrollToSection(calculatorRef);
		}
	}, [location]);

	const handleSelectOptionChange = (e) => {
		setyearFixed(e.target.value);
	};


	const principalAmnt = HomepriceRange - DppriceRange;
	const totalNumberOfMonths = yearFixed * 12;
	
	// const interestRateperMonth = ((interestRate/100) / 12);
	// console.log("interestRateperMonth:", interestRateperMonth);

	// const addedOneinInterest =
	// 	(interestRateperMonth + 1).toFixed(7);
	// const powerAddedOneinInterest = (addedOneinInterest ** totalNumberMonths).toFixed(5);
	// console.log("powerAddedOneinInterest:", powerAddedOneinInterest);

 //total numbe of months
	const totalInterestRate = (interestRate / 100) * yearFixed;
	const totalInterestAmount = principalAmnt * totalInterestRate;

	const computeMortgage = () => {
		// Calculate principal amount
		const principalAmnt = HomepriceRange - DppriceRange;

		// Total number of months for the loan
		const totalNumberOfMonths = yearFixed * 12;
		setTotalnumberMonths(totalNumberOfMonths);

		// Monthly interest rate
		const interestRateperMonth = parseFloat(
			(interestRate / 100 / 12).toFixed(7)
		);
		console.log("interestRateperMonth:", interestRateperMonth);

		// Add 1 to interest rate
		const addedOneinInterest = (interestRateperMonth + 1);
		console.log("addedOneinInterest:", addedOneinInterest);

		// Exponentiate to the total number of months
		const powerAddedOneinInterest = (Math.pow(
			addedOneinInterest,
			totalNumberOfMonths
		)).toFixed(5);
		console.log("powerAddedOneinInterest:", powerAddedOneinInterest);

		// Total monthly payment using the mortgage formula
		const totalMonthlyPayment = 
			((principalAmnt * interestRateperMonth * powerAddedOneinInterest) /
				(powerAddedOneinInterest - 1)).toFixed(2);
		;

		console.log("totalMonthlyPayment:", totalMonthlyPayment);
		const yearlyPayment = totalMonthlyPayment * 12;
		setYearlyPayment(Math.round(yearlyPayment));

		// Total interest over the loan term
		const totalInterestRate = (interestRate / 100) * yearFixed;
		const totalInterestAmount = principalAmnt * totalInterestRate;

		// Interest per year and per month
		const yearlyInterestAmount = totalInterestAmount / yearFixed;
		const monthlyInterestAmount = yearlyInterestAmount / 12;
		setInterestPerMonthAmount(monthlyInterestAmount.toFixed(2));

		// Total payment including interest
		const totalPaymentwithInterest = totalMonthlyPayment * totalNumberOfMonths;
		setPrincipalwithInterest(Math.round(totalPaymentwithInterest));

		// Progress bar calculation
		const progressBar =
			((HomepriceRange - yearlyPayment) / HomepriceRange) * 100;
		setProgressBarVal(progressBar);

		console.log("Yearly Payment:", yearlyPayment);
		console.log("Progress Bar Value:", progressBar);

		// const interestAmountperMonth = totalMonthlyPayment * totalInterestRate;
		//    setInterestPerMonthAmount(interestAmountperMonth.toFixed(2));
		// const dpPriceRange = DppriceRange;
		// const homePriceRange = HomepriceRange;
		// const interestRateDecimal = interestRate / 100;

		// const monthlyInterestRate = interestRateDecimal / 12;
		// const loanAmount = homePriceRange - dpPriceRange;
		// const numberOfPayments = yearFixed * 12;
		// const totalMonthlyPayment =
		// 	loanAmount *
		// 	((monthlyInterestRate *
		// 		Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
		// 		(Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1));

		// setMonthlyPayment(totalMonthlyPayment.toFixed(2));
	};
	const menu = (
		<Menu onClick={(e) => setyearFixed(parseInt(e.key))}>
			<Menu.Item key="30">30 Years Fixed</Menu.Item>
			<Menu.Item key="25">25 Years Fixed</Menu.Item>
			<Menu.Item key="20">20 Years Fixed</Menu.Item>
			<Menu.Item key="15">15 Years Fixed</Menu.Item>
			<Menu.Item key="10">10 Years Fixed</Menu.Item>
			<Menu.Item key="5">5 Years Fixed</Menu.Item>
		</Menu>
	);
	const faqsloandata = {
		mortgage: { faqs: mortgageFaqs, Title: "Mortgage" },
		homeloan: { faqs: homeloanFaqs, Title: "Home Loan" },
	};

	return (
		<div className="discover-home-container">
			<div className="discover-home">
				<div className="discover-home-content">
					<div className="discover-overlap">
						<div className="disc-content-container">
							<div className="discover-words">
								<span className="smart-way-to-get-a">Smart way to get a</span>
								<span className="home-loan"> Home Loan</span>
								<span className="discover-tagline">
									Home financing to make your goals reality.
								</span>
							</div>
							<div className="discover-upper-btn">
								<div className="buy-a-home">
									<div className="buy-home-text">
										<a href="/buy-a-home">
											<span>Buy a Home</span>
										</a>
									</div>
								</div>
								<div className="refinance-a-home">
									<div className="refinance-btn">
										<a href="/refinance">
											<span>Refinance a Home</span>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mortgageexp">
					<div className="mortgage-cont">
						<span className="mortgage-title">
							A new kind of mortgage experience
						</span>
						<div className="mortgage-slide-group">
							<div className="mortgage-slide">
								<div className="ms1-group">
									<span className="ms1-title">Easy Payment</span>
									<span className="ms1-text">
										Making mortgage payments easier often involves exploring
										various options and strategies.
									</span>
								</div>
								<div className="ms2-group">
									<span className="ms2-title">Apply online with ease</span>
									<span className="ms2-text">
										Securely import documents from thousands of financial
										institutions in a few clicks.
									</span>
								</div>
								<div className="ms3-group">
									<span className="ms3-title">Get one-on-one support</span>
									<span className="ms3-text">
										You’ll get support and regular updates from a dedicated
										Mortgage Consultant.
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mortgage-calc">
				<div className="mortgage-title-mort-lg">Mortgage Calculator</div>
				<div className="mortgage-calc-cont">
					<div className="mortgage-cont1">
						<div className="mortrange" ref={calculatorRef}>
							<div className="mortgage-title-mort">Mortgage Calculator</div>
							<div className="range-group">
								<div className="home-price-frame">
									<div className="home-price-frame-title">Home price</div>
									<div className="home-price-frame-cont">
										<div className="home-price-price-range">
											<span className="amount-value">Php </span>
											<input
												type="text"
												value={
													HomepriceRange ? HomepriceRange.toLocaleString() : "0"
												}
												onChange={handleHomePriceInputChange}
												style={{
													fontSize: "18px",
													borderStyle: "none",
													paddingLeft: "5px",
													backgroundColor: "transparent",
												}}
											/>
										</div>
										<Slider
											range
											min={100000}
											max={100000000}
											step={100}
											value={HomepriceRange}
											onChange={handleHomePriceRangeChange}
											// tooltip={{ open: true }}
											tipFormatter={formatValue}
										/>
										{/* <div className="ellipse" /> */}
									</div>
								</div>
								<div className="down-payment-frame">
									<div className="down-payment-title">Down payment</div>
									<div className="down-payment-frame-cont">
										<div className="downpayment-amount">
											<div className="downpayment-amount-val">
												<span className="amount-value">Php </span>
												<input
													type="text"
													value={
														DppriceRange ? DppriceRange.toLocaleString() : "0"
													}
													onChange={handleDpInputChange}
													style={{
														fontSize: "18px",
														borderStyle: "none",
														paddingLeft: "5px",
														backgroundColor: "transparent",
													}}
												/>
											</div>
											<Slider
												range
												min={10000}
												max={1000000}
												step={100}
												value={DppriceRange}
												onChange={handleDpPriceRange}
												tipFormatter={formatValue}
											/>
										</div>
									</div>
								</div>
								<div className="loan-term-frame">
									<div className="loan-term-frame-title">Loan Term</div>
									<div className="loan-term-frame-cont">
										<div className="loan-term-value">
											<Select
												value={yearFixed}
												className="year-term-options"
												onChange={(value) => setyearFixed(value)}
												dropdownMatchSelectWidth={true} // Dropdown matches the select width
											>
												<Select.Option value={5}>5 Years Fixed</Select.Option>
												<Select.Option value={10}>10 Years Fixed</Select.Option>
												<Select.Option value={15}>15 Years Fixed</Select.Option>
												<Select.Option value={30}>30 Years Fixed</Select.Option>
											</Select>
										</div>

										{/* <img
                                            className="vector"
                                            alt="Vector"
                                            src="https://cdn.animaapp.com/projects/64e41d552340cba66b90f01a/releases/6667bfedd77ca3da5aa489ba/img/vector-9.svg"
                                        /> */}
									</div>
								</div>

								<div className="interest-rate-frame">
									<div className="interest-rate-frame-title">Interest Rate</div>
									<div className="interest-rate-frame-cont">
										<div className="interest-rate-value">{interestRate} % </div>
										<Slider
											range
											min={0}
											max={25}
											step={1}
											value={interestRate}
											onChange={handleInterestRateChange}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="mortgage-btn-group">
							<div
								className="compute-mortgage"
								onClick={computeMortgage}
								style={{ cursor: "pointer" }}
							>
								<span>Compute Mortgage</span>
							</div>
							<div className="getpre-approvedbtn" onClick={getApproved}>
								<span className="text-wrapper">
									<a
										href="/mortgage"
										style={{ textDecoration: "none", color: "#D90000" }}
									>
										Get pre-approved
									</a>
								</span>
							</div>
						</div>
					</div>

					{/* right-side */}

					<div className="mortlabel">
						<div className="mortlabel-cont">
							<span className="label-title">Yearly payment breakdown</span>
							<div className="per-range">
								<div
									className="interest-group-label"
									style={{ position: "relative", display: "inline-block" }}
								>
									<Progress
										type="circle"
										percent={progressBarVal}
										// width={200}
										strokeWidth={10}
										strokeColor="#D90000"
										trailColor="#d900002b"
										format={() => null} // No need to format inside the Progress component
										gapDegree={10}
										gapPosition="bottom"
										className="calculator--progress"
									/>
									<div style={{}} className="montly-pay-cal">
										PHP {Number(yearlypayment)?.toLocaleString() || 0} <br />
										<p
											style={{
												fontSize: "16px",
												color: "gray",
												fontWeight: "100px",
											}}
										>
											per year
										</p>
									</div>
								</div>

								<div className="principal">
									<div className="content-info-mortgage">
										<div className="payment-breakdown">
											<div
												className="radio-circle"
												style={{ backgroundColor: "rgba(140, 144, 148, 0.62)" }}
											/>
											<span>
												{DppriceRange?.toLocaleString() || 0} down payment
											</span>
										</div>
										<div className="payment-breakdown">
											<div
												className="radio-circle"
												style={{ backgroundColor: "#D90000" }}
											/>
											<span>
												Principal&nbsp;&nbsp;PHP &nbsp;
												{Number(principalAmnt)?.toLocaleString() || 0}
											</span>
										</div>
										{/* <div className="payment-breakdown">
											<div
												className="radio-circle"
												style={{ backgroundColor: "#F9C7C7" }}
											/>
											<span>
												{" "}
												Interest:&nbsp;&nbsp;PHP{" "}
												{Number(interestPerMonthAmount).toLocaleString()} per
												month
											</span>
										</div>
										<div className="payment-breakdown">
											<div
												className="radio-circle"
												style={{ backgroundColor: "#8C9094" }}
											/>
											<span>
												Total Interest: PHP{" "}
												{totalInterestAmount.toLocaleString()}
											</span>
										</div> */}
										<div className="payment-breakdown">
											<div
												className="radio-circle"
												style={{ backgroundColor: "#D9AEAE" }}
											/>
											<span>
												{totalNumberOfMonths} months ({yearFixed} years)
											</span>
										</div>
									</div>
									<div className="lower-monthly-payment">
										<span className="pan">Total Payment</span>
										<div className="line-principal-group">
											<img
												className="line-3"
												alt="Line"
												src="https://cdn.animaapp.com/projects/64e41d552340cba66b90f01a/releases/6667bfedd77ca3da5aa489ba/img/line-31.svg"
											/>
											<div
												className="monthly-amount"
												style={{ fontSize: "18px" }}
											>
												PHP{" "}
												{Array.isArray(principalWithInterest) &&
												principalWithInterest.length === 2
													? `${
															Number(
																principalWithInterest[0]
															)?.toLocaleString() || 0
													  } - ${
															Number(
																principalWithInterest[1]
															)?.toLocaleString() || 0
													  }`
													: Number(principalWithInterest)?.toLocaleString() ||
													  0}{" "}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="dn-component">
				<div className="component4-header">
					<h1>Get pre-approved</h1>
					<span className="home-tagline">
						Home financing to make your goals a reality.
					</span>
				</div>

				<div className="content-4">
					<a href="/buy-a-home">
						<div className="purchase">
							<div className="overlap-group">
								<img src={homeicon} alt="home" />
								<span className="span" style={{ color: "black" }}>
									I want to purchase a home.
								</span>
							</div>
						</div>
					</a>
					<a href="/refinance">
						<div className="refinance">
							<div className="overlap-group">
								<img src={dollaricon} alt="dollar" />
								<span className="span" style={{ color: "black" }}>
									I want to refinance my home{" "}
								</span>
							</div>
						</div>
					</a>
				</div>
			</div>
			<div className="faqs-container">
				<div className="faqs-content">
					<h2>Most-asked morgage questions</h2>
					{Object.keys(faqsloandata).map((category, i) => {
						const { faqs, Title } = faqsloandata[category];
						return (
							<div className="discover-questions" key={i}>
								<br />
								<h2>{Title}</h2>
								{faqs.map((item, index) => (
									<div key={index}>
										<div
											className="dropdown-label"
											onClick={() => toggleAccordion(index)}
											style={{
												backgroundColor:
													activeIndex === index ? "#ffffff" : "white",
												display: activeIndex === index ? "flex" : "flex",
												flexDirection: activeIndex === index ? "column" : "row",
											}}
										>
											{item.question}
											<DownOutlined
												style={{
													color: "rgb(164, 161, 161, 27%)",
													transform:
														activeIndex === index ? "rotate(180deg)" : "none",
												}}
												className="dropdown-icon"
											/>
											{activeIndex === index && (
												<div
													className="dropdown-content"
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
			<div className="listing__contact--form-btns-sticky">
				<FloatBtnGroup
					children={
						<>
							<a href="#contact-form">
								<FloatButton
									icon={
										<MessageOutlined className="message-float__icon--icon" />
									}
									tooltip={isContactUsFormVisible ? "" : "Message us"}
									className="float__icon message-float__icon"
									onClick={toogleContarctUsForm}
								/>
							</a>
							<FloatButton
								icon={<CalculatorOutlined className="calculator-float__icon" />}
								tooltip={isCalculatorVisible ? "" : "Calculator"}
								className="float__icon calculator-float__icon"
								// onClick={toggleCalculator}
								onClick={() => navigate("/discover-home#calculator")}
							/>
						</>
					}
				/>
			</div>
			{isCalculatorVisible && (
				<CalculatorWidgetModal
					toggleCalculator={toggleCalculator}
					closeWidgetCalc={closeWidgetCalc}
				/>
			)}
			{isContactUsFormVisible && (
				<ContactUsWidget closeWidgetCalc={closeWidgetCalc} />
			)}

			<CustomMlFooter />
			<FooterComponent />
		</div>
	);
};
export default DiscoverHomeComponent;
