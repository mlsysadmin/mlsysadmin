import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "../../styles/SupportNavigation.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography } from "antd";

const SupportNavigation = (props) => {
  const whatIsNavigationActive = props.navigationActiv
  const whatIsListingStatus = props.whatIsListingStatus;
  const [showDropdown, setShowDropdown] = useState(false);
  const [navigationActive, setNavigationActive] = useState("");
  const [listingStatus, setListingStatus] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    if (params.status) {
      setNavigationActive("listing-masterlist");
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [params]);

  const handleClick = (path) => {
    if (path === "SupportListingMasterlist") {
      navigate(`/ML-Brokerage/Support/${path}/open`, {
        replace: true,
      });
    } else {
      setShowDropdown(false);
      navigate(`/ML-Brokerage/Support/${path}`, { replace: true });
      console.log("Set Navigation: ", path);
      setNavigationActive(path);
    }
  };
  const handleClickSubPath = (status) => {
    const path = `${navigationActive}/${status}`;
    console.log("Path: ", path);
    console.log("Status: ", status);
    setListingStatus(status);
    console.log("I am inside IF in handleClick!");
    navigate(`/ML-Brokerage/Support/${path}`, {
      replace: true,
    });
    setShowDropdown(true);
    console.log("Logging: ", navigationActive);
    console.log("Lisitng Stua: ", listingStatus);
  };

  const handleClickShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const items = [
    {
      label: <a href="/logout">Log out</a>,
      key: "1",
    },
  ];

  return (
    <div className="support-navigation-bar">
      <img
        className="image"
        alt="Image"
        src="https://c.animaapp.com/1RDRTvCv/img/image-87-1@2x.png"
      />
      <div
        className={`navigation_links ${
          whatIsNavigationActive === "create-listing" ? "active" : ""
        }`}
        onClick={() => handleClick("SupportCreateListingPage")}
      >
        Create Listing
      </div>
      <div
        className={`navigation_links ${
          whatIsNavigationActive === "listing-masterlist" ? "active" : ""
        }`}
        onClick={() => handleClick("SupportListingMasterlist")}
      >
        <span>Listing Masterlist</span>
        {showDropdown && (
          <ul className="dropdown-menu">
            <li
              className={whatIsListingStatus === "open" ? "active" : ""}
              onClick={() => handleClickSubPath("open")}
            >
              <a href="#">Open Listings</a>
            </li>
            <li
              className={whatIsListingStatus === "pending" ? "active" : ""}
              onClick={() => handleClickSubPath("pending")}
            >
              <a href="#">Pending Listings</a>
            </li>
            <li
              className={whatIsListingStatus === "active" ? "active" : ""}
              onClick={() => handleClickSubPath("active")}
            >
              <a href="#">Active Listings</a>
            </li>
            <li
              className={whatIsListingStatus === "disapproved" ? "active" : ""}
              onClick={() => handleClickSubPath("disapproved")}
            >
              <a href="#">Disapproved Listings</a>
            </li>
          </ul>
        )}
      </div>
      <div
        className={`navigation_links ${
          whatIsNavigationActive === "client-management" ? "active" : ""
        }`}
        onClick={() => handleClick("SupportDashboard")}
      >
        Client Management
      </div>
      <div className="user_dropdown">
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Chemuel Castillo
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default SupportNavigation;
