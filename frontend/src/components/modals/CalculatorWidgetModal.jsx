import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Slider, Select } from "antd";
import "../../styles/widget.css";

const CalculatorWidgetModal = ({ closeWidgetCalc }) => {
	const [HomepriceRange, setHomePriceRange] = useState(100000);
	const [DppriceRange, setDpHomePriceRange] = useState(10000);
	const [yearFixed, setyearFixed] = useState(30);
	const [yearlypayment, setYearlyPayment] = useState(0);
	const [interestPerMonthAmount, setInterestPerMonthAmount] = useState(0);
	const [totalNumberMonths, setTotalnumberMonths] = useState(0);
	const [interestRate, setinterestRate] = useState(5);
	const handleHomePriceRangeChange = (values) => {
		setHomePriceRange(values);
	};
	const formatValue = (value) => {
		if (value === undefined) {
			return "N/A";
		}
		return value.toLocaleString();
	};

	const handleDpInputChange = (e) => {
		const inputValue = e.target.value.replace(/PHP\s*/i, "").replace(/,/g, "");
		if (!isNaN(inputValue)) {
			setDpHomePriceRange(parseInt(inputValue, 10) || 0);
		}
	};
	const handleHomePriceInputChange = (e) => {
		const inputValue = e.target.value.replace(/PHP\s*/i, "").replace(/,/g, "");
		if (!isNaN(inputValue)) {
			setHomePriceRange(parseInt(inputValue, 10) || 0);
		}
	};

	const computeMortgage = () => {
		const principalAmnt = HomepriceRange - DppriceRange;
		const totalNumberOfMonths = yearFixed * 12;
		setTotalnumberMonths(totalNumberOfMonths);

		const interestRateperMonth = parseFloat(
			(interestRate / 100 / 12).toFixed(7)
		);

		const addedOneinInterest = interestRateperMonth + 1;

		const powerAddedOneinInterest = Math.pow(
			addedOneinInterest,
			totalNumberOfMonths
		).toFixed(5);
		console.log("powerAddedOneinInterest:", powerAddedOneinInterest);

		const totalMonthlyPayment = (
			(principalAmnt * interestRateperMonth * powerAddedOneinInterest) /
			(powerAddedOneinInterest - 1)
		).toFixed(2);

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
		// const totalPaymentwithInterest = totalMonthlyPayment * totalNumberOfMonths;
		// setPrincipalwithInterest(Math.round(totalPaymentwithInterest));
	};
	const handleDpPriceRange = (values) => {
		setDpHomePriceRange(values);
	};

	return (
		<div
			className="widget-calculator-container"
			style={{
				position: "fixed",
				bottom: "20px",
				right: "100px",
				width: "300px",
				backgroundColor: "#fff",
				borderRadius: "8px",
				boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
				padding: "20px",
				zIndex: 1050,
				overflow: "hidden",
			}}
		>
			<CloseOutlined
				onClick={closeWidgetCalc}
				style={{
					position: "absolute",
					top: "10px",
					right: "10px",
					fontSize: "12px",
					cursor: "pointer",
				}}
			/>
			<span style={{ fontSize: "14px !important", fontWeight: "bold" }}>
				Mortgage Calculator
			</span>
			<div className="calculator-widget-form">
				<div className="form-widget-container">
					<div className="form-widget">
						<div className="info-widget">
							<label>Home Price &nbsp;</label>
							<div className="hp-widget-value">
								<input
									type="text"
									value={`PHP ${
										HomepriceRange ? HomepriceRange.toLocaleString() : "0"
									}`}
									onChange={handleHomePriceInputChange}
									style={{
										fontSize: "15px",
										borderStyle: "none !important",
										paddingLeft: "5px",
										backgroundColor: "transparent",
									}}
								/>
							</div>
						</div>

						{/* <input
							type="text"
							value={HomepriceRange ? HomepriceRange.toLocaleString() : "0"}
							onChange={handleHomePriceInputChange}
							style={{
								fontSize: "18px",
								borderStyle: "none",
								paddingLeft: "5px",
								backgroundColor: "transparent",
							}}
						/> */}

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
					</div>

					<div className="form-widget">
						<div className="downpayment-amount">
							<div className="info-widget-downpayment">
								<label>Downpayment &nbsp;</label>
								<div className="hp-widget-value">
									<input
										type="text"
										value={`PHP ${
											DppriceRange ? DppriceRange.toLocaleString() : "0"
										}`}
										onChange={handleDpInputChange}
										style={{
											fontSize: "15px",
											border: "none !important",
											paddingLeft: "5px",
											backgroundColor: "transparent",
										}}
									/>
								</div>
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
					<div className="form-widget-select">
						<div className="loan-term-widget">
							<Select
								value={yearFixed}
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
					<div className="form-widget-select">
						<div className="interest-rate-widget">
							<Select
								value={interestRate}
								onChange={(value) => setinterestRate(value)}
								dropdownMatchSelectWidth={true} // Dropdown matches the select width
							>
								<Select.Option value={5}>Interest Rate 5%</Select.Option>
								<Select.Option value={10}>Interest Rate 10%</Select.Option>
								<Select.Option value={15}>Interest Rate 15%</Select.Option>
								<Select.Option value={30}>Interest Rate 30%</Select.Option>
							</Select>
						</div>

						{/* <img
                                            className="vector"
                                            alt="Vector"
                                            src="https://cdn.animaapp.com/projects/64e41d552340cba66b90f01a/releases/6667bfedd77ca3da5aa489ba/img/vector-9.svg"
                                        /> */}
					</div>

					<button className="widget-calculate-btn" onClick={computeMortgage}>
						Calculate
					</button>
					{/* <div className="ellipse" /> */}
				</div>
				<div className="widget-payment-container">
					<p>Yearly Payment Breakdown:</p>
					<span className="amount-value">
						<b>PHP {Number(yearlypayment)?.toLocaleString() || 0}</b>
					</span>
				</div>
			</div>
		</div>
	);
};
export default CalculatorWidgetModal;
