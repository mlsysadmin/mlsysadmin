import { Button, Menu, Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import MenuPopup from "./MenuPopup";
import MenuPopupContent from "./MenuPopupContent";
import { SubMenu } from "../../../../utils/MenuPopover.utils";
import { useNavigate } from "react-router-dom";
import RoundBtn from "../../../custom/buttons/RoundBtn.custom";
import TextBtn from "../../../custom/buttons/TextBtn.custom";

import { CaretDownOutlined, UserOutlined } from "@ant-design/icons";

const HeaderMenu = () => {
  const [currentMenu, setCurrent] = useState("");
  const [rentPopUpOpen, setrentPopUpOpen] = useState(false);
  const [buyPopUpOpen, setbuyPopUpOpen] = useState(false);
  const [homeLoanPopUpOpen, sethomeLoanPopUpOpen] = useState(false);
  const [homeInsurancePopUpOpen, sethomeInsurancePopUpOpen] = useState(false);
  const [otherServicesPopUpOpen, setotherServicesPopUpOpen] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //     const setTogglePopoverOutside = (event) => {
  //     //   if (modal) {
  //         const classNameBtn = event.target.className === "ant-popover-open";

  //         setrentPopUpOpen(!classNameBtn);
  //     //   }
  //     };

  //     window.addEventListener("click", setTogglePopoverOutside);

  //     return () => {
  //       window.removeEventListener("click", setTogglePopoverOutside);
  //     };
  //   }, []);

  const handleMenuOnClick = (menu) => {
    console.log(menu);
    if (menu.key === "Rent") {
      setbuyPopUpOpen(false);
      sethomeLoanPopUpOpen(false);
      sethomeInsurancePopUpOpen(false);
      setotherServicesPopUpOpen(false);
      setrentPopUpOpen(true);
    } else if (menu.key === "Buy") {
      setrentPopUpOpen(false);
      sethomeLoanPopUpOpen(false);
      sethomeInsurancePopUpOpen(false);
      setotherServicesPopUpOpen(false);
      setbuyPopUpOpen(true);
    } else if (menu.key === "Home Loan") {
      setrentPopUpOpen(false);
      setbuyPopUpOpen(false);
      sethomeInsurancePopUpOpen(false);
      setotherServicesPopUpOpen(false);
      sethomeLoanPopUpOpen(true);
    } else if (menu.key === "Home Insurance") {
      setrentPopUpOpen(false);
      setbuyPopUpOpen(false);
      sethomeLoanPopUpOpen(false);
      setotherServicesPopUpOpen(false);
      sethomeInsurancePopUpOpen(true);
    } else if (menu.key === "Other Services") {
      setrentPopUpOpen(false);
      setbuyPopUpOpen(false);
      sethomeLoanPopUpOpen(false);
      sethomeInsurancePopUpOpen(false);
      setotherServicesPopUpOpen(true);
    } else {
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
    { label: "Sell", key: "Sell", link: "/sell-page" },
    { label: "New", key: "New", link: "/new-page" },
    { label: <RentMenu />, key: "Rent" },
    { label: <BuyMenu />, key: "Buy" },
    { label: <HomeLoanMenu />, key: "Home Loan" },
    {
      label: <HomeInsuranceMenu />,
      key: "Home Insurance",
      link: "/home-insurance",
    },
    {
      label: <OtherServicesMenu />,
      key: "Other Services",
      link: "/other-services",
    },
    { label: "Contact", key: "Contact", link: "/contact-us" },
  ];

  const items = MenuItems.map((item, index) => ({
    key: item.key,
    label: item.label,
    link: item.link,
  }));


  // user dropdown
  const userMenuDropdown = [
    {
      key: "1",
      label: "Marie R. Rodriguez",
    },
    {
      key: "2",
      label: "test@ml.com",
    },
    {
      type: "divider", // Add a divider
    },
    {
      key: "3",
      label: "Profile Settings",
    },
    {
      key: "4",
      label: "Listings",
    },
    {
      key: "5",
      label: "Client Management",
    },
    {
      key: "6",
      label: "Sign out",
    },
  ];

  const userMenuItems = userMenuDropdown.map((loginItem) => {
    if (loginItem.type === "divider") {
      return { type: "divider" };
    } else {
      return {
        key: loginItem.key,
        label: loginItem.label,
        disabled: loginItem.disabled,
      };
    }
  });

  const loginMenu = <Menu items={userMenuItems} />;

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
        {/* <Row align={"middle"} className='menu-buttons'>
                <TextBtn label="Login" style={{ color:"#D90000" }}/>
                <div style={{ color:"#D90000" }}>/</div>
                <TextBtn label="Register" style={{ color:"#D90000" }}/>
            </Row> */}

        <RoundBtn
          type="primary"
          className="menu-buttons"
          style={{ background: "#D90000" }}
          label="List your Property"
        />

        {/* <Dropdown menu={userMenu} placement="bottomRight">
          <RoundBtn
            type="primary"
            className="menu-buttons"
            style={{ background: "#D90000", marginLeft:"12px" }}
            label="Marie R." 
            beforeIcon={<UserOutlined />}
            afterIcon={<CaretDownOutlined/>}
          />
        </Dropdown> */}

        <Dropdown overlay={loginMenu} placement="bottomRight">
          <Button
            type="primary"
            shape="round"
            style={{ background: "#D90000", marginLeft: "12px" }}
          >
            <UserOutlined style={{ marginRight: "8px" }} />
            Marie R.
            <CaretDownOutlined style={{ marginLeft: "8px" }} />
          </Button>
        </Dropdown>
      </div>
    </>
  );
};

export default HeaderMenu;
