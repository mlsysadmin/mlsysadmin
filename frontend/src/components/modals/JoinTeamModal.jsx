import React from "react";
import { useEffect, useState } from "react";
import "../../styles/jointeam.css";
import { GetCountry, GetCities, GetProvince } from "../../api/Public/Location.api";

const JoinTeam = ({ toggleModal }) => {
	const [getCountry, setGetCountry] = useState([]);
	const [getCities, setGetCities] = useState([]);
	const [getProvince, setGetProvince] = useState([]);

	const allCountries = async () => {
		const datares = await GetCountry();
		setGetCountry(datares);
		console.log("these are countries:", datares);
	};
	const allCities = async () => {
		const datarescities = await GetCities();
		setGetCities(datarescities);
		console.log("these are cities:", datarescities);
	};
	const allProvince = async () => {
		const dataresprovince = await GetProvince();
		setGetProvince(dataresprovince);
		console.log("these are provinces:", dataresprovince);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				await Promise.all([allCountries(), allCities(), allProvince()]);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);
	return (
		<div className="join-modal-container">
			<div
				className="modal-overlay-jointeam"
				role="dialog"
				aria-modal="true"
				style={{
					position: "fixed",
					top: "0px",
					left: "50%",
					transform: "translateX(-50%)",
					backgroundColor: "rgba(0, 0, 0, 0.5)",
					width: "100%",
					height: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					zIndex: 100,
					padding: "100px 0px 0px 0px",
				}}
			>
				<div
					className="modal-content-jointeam"
					style={{
						backgroundColor: "white",
						borderRadius: "20px",
						width: "auto",
						maxHeight: "95vh",
						display: "flex",
						padding: "40px 30px",
						flexDirection: "column",
						margin: "0px 0px",
						overflowY: "auto",
					}}
				>
					<h2 style={{ color: "#000000", fontSize: "24px"}}>
						Join our innovative team at M Lhuillier.
					</h2>
					<p style={{ fontSize: "16px", color: "#000000" }}>
						Your expertise and passion are exactly what we need.
					</p>
					<div className="join-team-columns">
						<div className="join-team-column-group">
							<div className="join-team-group">
								<span>Mobile Number</span>
								<input type="text" placeholder="09" />
							</div>
							<div className="join-team-group">
								<span>Email Address</span>
								<input type="email" placeholder="Email Address" />
							</div>
						</div>
						<div className="join-team-column-group">
							<div className="join-team-group">
								<span>Last Name</span>
								<input type="text" placeholder="First Name" />
							</div>
							<div className="join-team-group">
								<span>First Number</span>
								<input type="text" placeholder="Last Name" />
							</div>
							<div className="join-team-group">
								<span>Middle Name</span>
								<input type="text" placeholder="Middle Name" />
							</div>
							<div className="join-team-group">
								<span>Suffix</span>
								<select type="text">
									<option value="">Select Option</option>
									<option value="">None</option>
									<option value="">Jr.</option>
									<option value="">Sr.</option>
								</select>
							</div>
						</div>
						<div className="join-team-column-group">
							<div className="join-team-group">
								<span>Country</span>
								<select type="text">
									<option value="">Select Country</option>
									{getCountry?.map((country, index) => {
										return (
											<option key={index} value={country.name}>
												{country.name}
											</option>
										);
									})}
								</select>
							</div>
							<div className="join-team-group">
								<span>Province/State</span>
								<select type="text">
									<option value="">Select Province</option>
									{getProvince?.map((province, index) => {
										return (
											<option key={index} value={province.name}>
												{province.name}
											</option>
										);
									})}
								</select>
							</div>
							<div className="join-team-group">
								<span>City/Town</span>
								<select type="text">
									<option value="">Select City</option>
									{getCities?.map((cities, index) => {
										return (
											<option key={index} value={cities.name}>
												{cities.name}
											</option>
										);
									})}
								</select>
							</div>
							<div className="join-team-group">
								<span>House No/St/Sitio/Barangay</span>
								<input
									type="text"
									placeholder="House No/St/Sitio/Barangay"
								></input>
							</div>
						</div>
						<div className="join-team-column-group">
							<div className="join-team-group">
								<span>Birthdate</span>
								<input
									type="text"
									class="calendar-input-field"
									placeholder="mm/dd/yyyy"
								/>
							</div>

							<div className="join-team-group">
								<span>Country of Birth</span>
								<select type="text">
									<option value="">Select Country</option>
									{getCountry?.map((country, index) => {
										return (
											<option key={index} value={country.name}>
												{country.name}
											</option>
										);
									})}
								</select>
							</div>
							<div className="join-team-group">
								<span>Place of Birth</span>
								<select type="text">
									<option value="">Select City</option>
									{getCities?.map((cities, index) => {
										return (
											<option key={index} value={cities.name}>
												{cities.name}
											</option>
										);
									})}
								</select>
							</div>
							<div className="join-team-group">
								<span>Civil Status</span>
								<select type="text">
									<option value="">Select Civil Status</option>
									<option value="">Single</option>
									<option value="">Married</option>
									<option value="">Separated</option>
									<option value="">Widowed</option>
								</select>
							</div>
						</div>
						<div className="join-team-column-group">
							<div className="join-team-group">
								<span>Nationality</span>
								<select type="text">
									<option value="">Select Nationality</option>
								</select>
							</div>
							<div className="join-team-group">
								<span>Source of Income</span>
								<select type="text">
									<option value="">Source of Income</option>
									<option value="">BUSINESS INCOME/SELF</option>
									<option value="">Salary/Pay/Wage/Commission</option>
									<option value="">Pension for Retiree</option>
									<option value="">Regular Remittance Abroad</option>
								</select>
							</div>
							<div className="join-team-group">
								<span>ID Type</span>
								<select type="text">
									<option value="">ID Type</option>
								</select>
							</div>
							<div className="join-team-group">
								<span>ID No</span>
								<input type="text" placeholder="125BXOSER5"></input>
							</div>
						</div>
					</div>
					<div className="broker-questions-jointeam">
						<div className="broker-questions-review">
							<span>Are you a license Real Estate Broker?</span>
							<div className="radio-button-broker-question">
								<label>
									<input type="radio" name="broker-question" value="yes" />
									Yes
								</label>
								<label>
									<input type="radio" name="broker-question" value="no" />
									No
								</label>
							</div>
						</div>
						<div className="broker-number-of-years">
							<span>Number of Years as Real Estate Broker</span>
							<input type="text" placeholder="Enter Number" />
						</div>
						<span>
							By proceeding, I agree and review that all information are
							correct.
						</span>
					</div>
					<button
						onClick={toggleModal}
						style={{
							backgroundColor: "#D90000",
							color: "white",
							border: "none",
							padding: "10px",
							alignItems: "center",
							justifyContent: "center",
							borderRadius: "10px",
							cursor: "pointer",
							margin: "20px 0px 0px 300px",
							width: "250px",
							display: "flex",
							fontSize: "16px",
							fontWeight: "bold",
						}}
					>
						Submit Application
					</button>
				</div>
			</div>
		</div>
	);
};

export default JoinTeam