import { Button, Menu, Row } from "antd";
import React, { useEffect, useState } from "react";
import MenuPopup from "./MenuPopup";
import MenuPopupContent from "./MenuPopupContent";
import { SubMenu } from "../../../../utils/MenuPopover.utils";
import { useNavigate, useLocation } from "react-router-dom";
import RoundBtn from "../../../custom/buttons/RoundBtn.custom";
import userProfile from "../../../../assets/profile-user.png";
import "../../../../styles/jointeam.css";
// import JoinTeam from "../../../modals/JoinTeamModal";
import UserLogInProfileDropdownBtn from "../../../custom/buttons/BuyerLogInButtonDropdown";
// import userProfileLogIn from "../../../../assets/userProfileLogIn.png"
// import ProfileDropDown
import TextBtn from "../../../custom/buttons/TextBtn.custom";
import LoginModal from "../../../modals/loginmodal";
import SellerLogInButtonDropdown from "../../../custom/buttons/SellerLogInButtonDropdown";
import { colors } from "@mui/material";

const HeaderMenu = () => {
	const [currentMenu, setCurrent] = useState("");
	const [rentPopUpOpen, setrentPopUpOpen] = useState(false);
	const [buyPopUpOpen, setbuyPopUpOpen] = useState(false);
	const [homeLoanPopUpOpen, sethomeLoanPopUpOpen] = useState(false);
	const [homeInsurancePopUpOpen, sethomeInsurancePopUpOpen] = useState(false);
	const [otherServicesPopUpOpen, setotherServicesPopUpOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const url_Redirect = process.env.REACT_APP_LOGIN_URL;
	const handleUserProfileClick = () => {
		if (url_Redirect) {
			window.location.href = url_Redirect;
		}
	};

	//modals
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};
	const handleJoinTeamClick = () => {
		setShowModal(true);
	};

	useEffect(() => {
		const path = location.pathname.replace("/", "");

		setCurrent(path);
	}, [setCurrent]);

	const handleMenuOnClick = (menu) => {
		if (menu.key === "rent") {
			setbuyPopUpOpen(false);
			sethomeLoanPopUpOpen(false);
			sethomeInsurancePopUpOpen(false);
			setotherServicesPopUpOpen(false);
			setrentPopUpOpen(true);
		} else if (menu.key === "buy") {
			setrentPopUpOpen(false);
			sethomeLoanPopUpOpen(false);
			sethomeInsurancePopUpOpen(false);
			setotherServicesPopUpOpen(false);
			setbuyPopUpOpen(true);
		} else if (menu.key === "home-loan") {
			setrentPopUpOpen(false);
			setbuyPopUpOpen(false);
			sethomeInsurancePopUpOpen(false);
			setotherServicesPopUpOpen(false);
			sethomeLoanPopUpOpen(true);
		} else if (menu.key === "home-insurance") {
			setrentPopUpOpen(false);
			setbuyPopUpOpen(false);
			sethomeLoanPopUpOpen(false);
			setotherServicesPopUpOpen(false);
			sethomeInsurancePopUpOpen(true);
		} else if (menu.key === "other-services") {
			setrentPopUpOpen(false);
			setbuyPopUpOpen(false);
			sethomeLoanPopUpOpen(false);
			sethomeInsurancePopUpOpen(false);
			setotherServicesPopUpOpen(true);
		} else {
			console.log("menu", menu);
			setCurrent(menu.key);
			navigate({
				pathname: menu.item.props.link,
			});
			setrentPopUpOpen(false);
			setbuyPopUpOpen(false);
			sethomeLoanPopUpOpen(false);
			sethomeInsurancePopUpOpen(false);
			setotherServicesPopUpOpen(false);
		}
	};

	const RentMenuPopContent = <MenuPopupContent submenu={SubMenu.rent} />;

	const BuyMenuPopContent = <MenuPopupContent submenu={SubMenu.buy} />;

	const HomeLoanMenuPopContent = (
		<MenuPopupContent submenu={SubMenu.homeLoan} />
	);
	const HomeInsuranceMenuPopContent = (
		<MenuPopupContent submenu={SubMenu.homeInsurance} />
	);
	const OtherServicesMenuPopContent = (
		<MenuPopupContent submenu={SubMenu.otherServices} />
	);

	const RentMenu = () => (
		<MenuPopup
			// handleOpenChange={handleRentOpenChange}
			title={"Looking for your dream rental home?"}
			popUpOpen={rentPopUpOpen}
			label={"Rent"}
			content={RentMenuPopContent}
		/>
	);
	const BuyMenu = () => (
		<MenuPopup
			// handleOpenChange={handleBuyOpenChange}
			title={"Looking for your perfect home?"}
			popUpOpen={buyPopUpOpen}
			label={"Buy"}
			content={BuyMenuPopContent}
		/>
	);

	const HomeLoanMenu = () => (
		<MenuPopup
			// handleOpenChange={handleBuyOpenChange}
			title={""}
			popUpOpen={homeLoanPopUpOpen}
			label={"Home Loan"}
			content={HomeLoanMenuPopContent}
		/>
	);
	const HomeInsuranceMenu = () => (
		<MenuPopup
			// handleOpenChange={handleBuyOpenChange}
			title={""}
			popUpOpen={homeInsurancePopUpOpen}
			label={"Home Insurance"}
			content={HomeInsuranceMenuPopContent}
		/>
	);
	const OtherServicesMenu = () => (
		<MenuPopup
			// handleOpenChange={handleBuyOpenChange}
			title={"Learn more about our Products and Services"}
			popUpOpen={otherServicesPopUpOpen}
			label={"Other Services"}
			content={OtherServicesMenuPopContent}
		/>
	);

	const MenuItems = [
		{ label: "Sell", key: "sell", link: "/sell" },
		{ label: "New", key: "new", link: "/new" },
		{ label: <RentMenu />, key: "rent" },
		{ label: <BuyMenu />, key: "buy" },
		{ label: <HomeLoanMenu />, key: "home-loan" },
		{
			label: <HomeInsuranceMenu />,
			key: "home-insurance",
			link: "/home-insurance",
		},
		{
			label: <OtherServicesMenu />,
			key: "other-services",
			link: "/other-services",
		},
		{ label: "Contact", key: "contact", link: "/contact-us" },
	];

	const items = MenuItems.map((item, index) => ({
		key: item.key,
		label: item.label,
		link: item.link,
	}));

	return (
		<>
			<div
				style={{
					display: "flex",
					borderBottom: "none",
					alignItems: "center",
					alignContent: "center",
					flexFlow: "wrap",
					flexWrap: "wrap",
				}}
				id="menu-wrapper"
			>
				<Menu
					mode="horizontal"
					items={items}
					selectedKeys={[currentMenu]}
					onClick={handleMenuOnClick}
					className="header--menu"
				></Menu>
				<RoundBtn
					type="primary"
					className="menu-buttons"
					style={{
						background: "#D90000",
						boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
						margin: "0px 15px 0px 0px",
					}}
					label="List your Property"
					onClick={handleUserProfileClick}
				/>
				<RoundBtn
					type="primary"
					className="menu-buttons"
					style={{
						color: "#D90000",
						backgroundColor: "transparent",
						border: "1px solid #d90000",
						boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
						padding: "5px 5px",
						cursor: "pointer",
					}}
					label="Join our Team"
					onClick={handleJoinTeamClick}
				/>
				{showModal && <JoinTeam toggleModal={toggleModal} />}
				<Row align={"middle"} className="menu-buttons">
					<img
						src={userProfile}
						style={{ margin: "0px 0px 0px 10px", cursor: "pointer" }}
						onClick={handleUserProfileClick}
					/>
					{/* <SellerLogInButtonDropdown/> */}
				</Row>
			</div>
		</>
	);
};

const JoinTeam = ({ toggleModal }) => {
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
						padding: "20px",
						borderRadius: "20px",
						width: "auto",
						height: "auto",
						display: "flex",
						padding: "50px 30px",
						flexDirection: "column",
					}}
				>
					<h2 style={{ color: "#000000", fontSize: "24px" }}>
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
								</select>
							</div>
						</div>
						<div className="join-team-column-group">
							<div className="join-team-group">
								<span>Country</span>
								<select type="text">
									<option value="">Select Country</option>
								</select>
							</div>
							<div className="join-team-group">
								<span>Province/State</span>
								<select type="text">
									<option value="">Select Province</option>
								</select>
							</div>
							<div className="join-team-group">
								<span>City/Town</span>
								<select type="text">
									<option value="">Select City</option>
								</select>
							</div>
							<div className="join-team-group">
								<span>House No/St/Sitio/Barangay</span>
								<select type="text">
									<option value="">House No/St/Sitio/Barangay</option>
								</select>
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
								<span>Place of Birth</span>
								<input
									type="text"
									class="calendar-input-field"
									placeholder="Enter Text"
								/>
							</div>
							<div className="join-team-group">
								<span>Country of Birth</span>
								<select type="text">
									<option value="">Select Country</option>
								</select>
							</div>
							<div className="join-team-group">
								<span>Civil Status</span>
								<select type="text">
									<option value="">Select Civil Status</option>
								</select>
							</div>
						</div>
						<div className="join-team-column-group">
							<div className="join-team-group">
								<span>Country</span>
								<select type="text">
									<option value="">Select Country</option>
								</select>
							</div>
							<div className="join-team-group">
								<span>Province/State</span>
								<select type="text">
									<option value="">Select Province</option>
								</select>
							</div>
							<div className="join-team-group">
								<span>City/Town</span>
								<select type="text">
									<option value="">Select City</option>
								</select>
							</div>
							<div className="join-team-group">
								<span>House No/St/Sitio/Barangay</span>
								<select type="text">
									<option value="">House No/St/Sitio/Barangay</option>
								</select>
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
							margin: "20px 0px 0px 200px",
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
export default HeaderMenu;
