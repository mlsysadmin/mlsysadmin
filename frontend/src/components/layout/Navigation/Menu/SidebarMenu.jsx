import { Col, Divider, Menu } from "antd";
import React, { useState, useEffect } from "react";
import { SubMenu } from "../../../../utils/MenuPopover.utils";
import RoundBtn from "../../../custom/buttons/RoundBtn.custom";
import userProfile from "../../../../assets/profile-user.png";
import TextBtn from "../../../custom/buttons/TextBtn.custom";
import { linearProgressClasses } from "@mui/material";
import UpgradeTierModal from "../../../modals/UpgradeTierModal";
import { isCookiePresent } from "../../../../utils/CookieChecker";
import { getCookieData } from "../../../../utils/CookieChecker";
import { useNavigate, useLocation } from "react-router-dom";

const SidebarMenu = ({ setOpenDrawer }) => {
	const [showUpgradeModal, setShowUpgradeModal] = useState(false);
	const sessionCookieName = process.env.REACT_APP_SESSION_COOKIE_NAME;
	const accountCookieName = process.env.REACT_APP_ACCOUNT_COOKIE_NAME;
	const isMLWWSPresent = isCookiePresent(sessionCookieName);
	const isAccountDetailsPresent = isCookiePresent(accountCookieName);
	const [userDetails, setUserDetails] = useState(null);

	const accountDetails = getCookieData();
	const showLogin = () => {
		const redirectUrl = process.env.REACT_APP_REDIRECT_URL;
		const loginUrl = process.env.REACT_APP_LOGIN_URL;
		setShowUpgradeModal(false);
		window.location.href = `${loginUrl}?redirect_url=${encodeURIComponent(
			redirectUrl
		)}`;
	};
	const closeModal = () => {
		setShowUpgradeModal(false);
	};
	const openUpgradeModal = () => {
		setShowUpgradeModal(true);
	};
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
			setShowUpgradeModal(true);
		}
	};

	const navigate = useNavigate();
	const location = useLocation();

	const [currentMenu, setCurrent] = useState("");

	useEffect(() => {
		const path = location.pathname.replace("/", "");

		setCurrent(path);
	}, [setCurrent]);

	const SubMenuChild = (submen) => {
		const m = submen.map((menu, index) => {
			return {
				key: menu.header,
				label: menu.header,
				type: "group",
				children: menu.submenu?.map((sub, key) => {
					// let childSub = sub.childSubMenu;
					return Object.keys(sub).includes("childSubMenu")
						? {
								key: sub.childSubMenu.header,
								label: sub.childSubMenu.header,
								link: sub.link,
								type: "group",
								children: Object.keys(sub).includes("childSubMenu")
									? sub.childSubMenu.submenu.map((i, k) => {
											return {
												key: i.header,
												label: i.sub,
											};
									  })
									: [],
						  }
						: Object.keys(sub).includes("sub_info")
						? {
								key: sub.sub_info,
								label: "Home Loan Dashboard",
								link: sub.link,
						  }
						: Object.keys(sub).includes("sub_info_insurance")
						? {
								key: sub.sub_info_insurance,
								label: "Home Insurance Dashboard",
								link: sub.link,
						  }
						: {
								key: sub.sub,
								label: sub.sub,
								link: sub.link,
						  };
				}),
			};
		});

		return m;
	};

	const MenuItems = [
		{ label: "Sell", key: "sell", link: "/sell" },
		{ label: "New", key: "new", link: "/new" },
		{
			label: "Rent",
			key: "rent",
			children: SubMenuChild(SubMenu.rent),
		},
		{
			label: "Buy",
			key: "buy",
			children: SubMenuChild(SubMenu.buy),
			link: "/buy",
		},
		{
			label: "Home Loan",
			key: "home-loan",
			children: SubMenuChild(SubMenu.homeLoan),
		},
		{
			label: "Home Insurance",
			key: "home-insurance",
			link: "/insurance-guide",
		},
		{
			label: "Other Services",
			key: "other-services",
			children: SubMenuChild(SubMenu.otherServices),
		},
		{ label: "Contact", key: "contact", link: "/contact-us" },
	];

	const items = MenuItems.map((item, index) => ({
		key: item.key,
		label: item.label,
		link: item.link,
		children: item.children,
	}));

	const handleMenuOnClick = (menu) => {
		console.log("menu", menu);
		setCurrent(menu.key);
		setOpenDrawer(false);
		navigate({
			pathname: menu.item.props.link,
		});
	};

	return (
		<>
			<Menu
				// onClick={onClick}
				style={{
					width: 256,
				}}
				defaultSelectedKeys={["1"]}
				defaultOpenKeys={["sub1"]}
				items={items}
				selectedKeys={[currentMenu]}
				mode="inline"
				className="sidebar-menu"
				onClick={handleMenuOnClick}
			/>
			<Divider />
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<RoundBtn
					type="primary"
					className="menu-buttons"
					style={{
						background: "#D90000",
						fontFamily: '"Poppins", sans-serif',
					}}
					label="List your Property"
					onClick={handleUserProfileClick}
				/>
				{showUpgradeModal && (
					<UpgradeTierModal
						isVisible={showUpgradeModal}
						onClose={closeModal}
						showLogin={showLogin}
					/>
				)}
				<Col align="left" className="menu-buttons">
					<img
						src={userProfile}
						style={{ width: "30px", cursor: "pointer" }}
					></img>
				</Col>
			</div>
		</>
	);
};

export default SidebarMenu;
