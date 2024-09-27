import { Button, Menu, Row } from "antd";
import React, { useEffect, useState } from "react";
import MenuPopup from "./MenuPopup";
import MenuPopupContent from "./MenuPopupContent";
import { SubMenu } from "../../../../utils/MenuPopover.utils";
import { useNavigate, useLocation } from "react-router-dom";
import RoundBtn from "../../../custom/buttons/RoundBtn.custom";
import userProfile from "../../../../assets/profile-user.png";

import { getCookieData } from "../../../../utils/CookieChecker";
import { searchKyc } from "../../../../api/Public/User.api";

import JoinTeam from "../../../modals/JoinTeamModal";
import WorkingOnItModal from "../../../ComingSoonComponent";
import PropertySearchModal from "../../../modals/PropertySearchModal";
import { isCookiePresent } from "../../../../utils/CookieChecker";
import UserLogInProfileDropdownBtn from "../../../custom/buttons/BuyerLogInButtonDropdown";
// import userProfileLogIn from "../../../../assets/userProfileLogIn.png"
// import ProfileDropDown
import TextBtn from "../../../custom/buttons/TextBtn.custom";
import LoginModal from "../../../modals/loginmodal";
import SellerLogInButtonDropdown from "../../../custom/buttons/SellerLogInButtonDropdown";
import { colors } from "@mui/material";
import UpgradeTierModal from "../../../modals/UpgradeTierModal";

const HeaderMenu = () => {
	const [currentMenu, setCurrent] = useState("");
	const [rentPopUpOpen, setrentPopUpOpen] = useState(false);
	const [buyPopUpOpen, setbuyPopUpOpen] = useState(false);
	const [homeLoanPopUpOpen, sethomeLoanPopUpOpen] = useState(false);
	const [homeInsurancePopUpOpen, sethomeInsurancePopUpOpen] = useState(false);
	const [otherServicesPopUpOpen, setotherServicesPopUpOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const sessionCookieName = process.env.REACT_APP_SESSION_COOKIE_NAME;
	const accountCookieName = process.env.REACT_APP_ACCOUNT_COOKIE_NAME;
	const isMLWWSPresent = isCookiePresent(sessionCookieName);
	const isAccountDetailsPresent = isCookiePresent(accountCookieName);
	const [userDetails, setUserDetails] = useState(null);

	const login = process.env.REACT_APP_LOGIN_URL;

	console.log("isMLWWSPresent:", isMLWWSPresent);
	console.log("isAccountDetailsPresent:", isAccountDetailsPresent);

	const [showUpgradeModal, setShowUpgradeModal] = useState(false);

	const closeModal = () => {
		setShowUpgradeModal(false);
	};

	const openUpgradeModal = () => {
		setShowUpgradeModal(true);
	};

	//get user DEtails

	const accountDetails = getCookieData();
	const fetchUserDetails = async () => {
		try {
			const response = await searchKyc(accountDetails.mobileNumber);

			const respData = response.data.data;
			console.log("API Response:", respData);
			setUserDetails(respData);
		} catch (error) {
			console.error("Error fetching user details:", error);
		}
	};

	useEffect(() => {
		fetchUserDetails();
		console.log("user", userDetails);
	}, []);

	const handleUserProfileClick = () => {
		const redirectUrl = process.env.REACT_APP_REDIRECT_URL;
		const loginUrl = process.env.REACT_APP_LOGIN_URL;
		if (isMLWWSPresent && isAccountDetailsPresent) {
			console.log("cookie", isMLWWSPresent);
			console.log("tier", userDetails.tier.label);
			if (userDetails?.tier?.label === "FULLY VERIFIED") {
				window.location.href = "/listing";
			} else if (userDetails?.tier?.label === "BUYER") {
				console.log(
					"User is a buyer and cannot list properties.",
					showUpgradeModal
				);
				openUpgradeModal();
			}
		} else {
			window.location.href = `${loginUrl}?redirect_url=${encodeURIComponent(
				redirectUrl
			)}`;
		}

		// const redirectUrl =
		// 	isCookiePresent(sessionCookieName) && isCookiePresent(accountCookieName)
		// 		? "/listing"
		// 		: process.env.REACT_APP_LOGIN_URL;

		// window.location.href = `${
		// 	process.env.REACT_APP_REDIRECT_URL
		// }?redirect_url=${encodeURIComponent(redirectUrl)}`;
	};
	//modals
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};
	const handleJoinTeamClick = () => {
		// setShowModal(true);
		navigate("/comingsoon");
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
			title={"Other Services"}
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
				{showUpgradeModal && (
					<UpgradeTierModal isVisible={showUpgradeModal} onClose={closeModal} />
				)}
				{/* {!isMLWWSPresent&&
					( */}
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
				{/* )} */}
				{/* {showModal && (
					<WorkingOnItModal isOpen={showModal} onClose={toggleModal} />
				)} */}

				{/* {showModal && <JoinTeam toggleModal={toggleModal} />} */}
				<Row align={"middle"} className="menu-buttons">
					{isMLWWSPresent ? (
						userDetails?.tier.label === "BUYER" ? (
							<UserLogInProfileDropdownBtn />
						) : userDetails?.tier.label === "FULLY VERIFIED" ? (
							<SellerLogInButtonDropdown />
						) : (
							<></>
						)
					) : (
						<img
							src={userProfile}
							style={{ margin: "0px 0px 0px 10px", cursor: "pointer" }}
							onClick={handleUserProfileClick}
						/>
					)}
				</Row>
			</div>
		</>
	);
};

export default HeaderMenu;
