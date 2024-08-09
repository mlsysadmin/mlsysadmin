import React from "react";
import { HomeFilled, DollarOutlined } from "@ant-design/icons";
import { FooterComponent, CustomMlFooter } from "../components";
import "../styles/mortgage.css";

const MortgageComponent = () => {
	return (
		<div className="mortgageContent">
			<div className="mortgage-title">
				<span className="mortgage-h1">Get pre-approved </span>
				<p className="mortgage-subheader">
					Home financing to make your goals a reality.
				</p>
			</div>
			<div className="mortBtn">
				<div className="purchasebtn">
					<HomeFilled id="home-icon" />
					<a style={{ textDecoration: "none" }} href="/buy-a-home">
						<p style={{ color: "white" }}>
							I want to{" "}
							<span style={{ fontWeight: "bold", color: "white" }}>
								purchase
							</span>{" "}
							a home
						</p>
					</a>
				</div>
				<div className="refinancebtn">
					<DollarOutlined id="dollar-icon" />
					<a style={{ textDecoration: "none" }} href="/refinance">
						<p style={{ color: "white" }}>
							I want to{" "}
							<span style={{ fontWeight: "bold", color: "white" }}>
								refinance
							</span>{" "}
							my home
						</p>
					</a>
				</div>
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<div>
				<CustomMlFooter />
				<FooterComponent />
			</div>
		</div>
	);
};

export default MortgageComponent;