import { Col, Divider, Menu } from "antd";
import React, { useState, useEffect } from "react";
import { SubMenu } from "../../../../utils/MenuPopover.utils";
import RoundBtn from "../../../custom/buttons/RoundBtn.custom";
import userProfile from "../../../../assets/profile-user.png";
import TextBtn from "../../../custom/buttons/TextBtn.custom";
import { linearProgressClasses } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import JoinTeam from "../../../modals/JoinTeamModal";

const SidebarMenu = ({ setOpenDrawer }) => {
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
        children: getSubMenuChildren(menu.submenu),
      };
    });

    return m;
  };

  const getSubMenuChildren = (submenu) => {
    return submenu.map((sub, key) => {
      if (Object.keys(sub).includes("childSubMenu")) {
        return {
          key: sub.childSubMenu.header,
          label: sub.childSubMenu.header,
          type: "group",
          children: getSubMenuChildren(sub.childSubMenu.submenu),
        };
      } else if (Object.keys(sub).includes("sub_info")) {
        return {
          key: sub.sub_info,
          label: "Loan Dashboard",
          link: sub.link,
        };
      } else if (Object.keys(sub).includes("sub_info_insurance")) {
        return {
          key: sub.sub_info_insurance,
          label: "Home Insurance Dashboard",
          link: sub.link,
        };
      } else {
        return {
          key: sub.sub,
          label: sub.sub,
          link: sub.link,
        };
      }
    });
  };

  const MenuItems = [
    { label: "New", key: "new", link: "/new" },
    { label: "Sell", key: "sell", link: "/sell" },
    {
      label: "Buy",
      key: "buy",
      children: SubMenuChild(SubMenu.buy),
      link: "/buy",
    },
    {
      label: "Rent",
      key: "rent",
      children: SubMenuChild(SubMenu.rent),
    },

    {
      label: "Loan",
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
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleJoinTeamClick = () => {
    setShowModal(true);
    // navigate("/comingsoon");
  };
  return (
		<>
			{showModal && <JoinTeam toggleModal={toggleModal} />}
      <Menu
        style={{
          width: 256,
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        items={items}
        selectedKeys={[currentMenu]}
        mode="inline"
        className="sidebar-menu"
        onClick={(menu) => handleMenuOnClick(menu)}
      />

			<Divider />

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gridGap: "10px",
				}}
			>
				<div
					style={{
						gridRow: "1 / 3",
						display: "flex",
						flexDirection: "column",
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
					/>
					<RoundBtn
						type="primary"
						className="menu-buttons"
						style={{
							border: "#D90000 solid 1px",
							background: "white",
							color: "#D90000",
							fontFamily: '"Poppins", sans-serif',
						}}
						label="Join our Team"
						onClick={handleJoinTeamClick}
					/>
				</div>
				<Col
					style={{
						gridRow: "1 / 2",
						alignSelf: "center",
					}}
					align="right"
					className="menu-buttons"
				>
					<img
						src={userProfile}
						style={{ width: "30px", cursor: "pointer", marginTop: "40px" }}
					></img>
				</Col>
			</div>
		</>
	);
};

export default SidebarMenu;
