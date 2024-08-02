import React from "react";
import { useState } from "react";
import userProfileLogIn from "../../../assets/userProfileLogIn.png";
import profileDropdown from "../../../assets/profileDropdown.png";

const SellerLogInButtonDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleButtonClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        style={{
          margin: "0px 0px 0px 10px",
          cursor: "pointer",
          backgroundColor: "#D90000",
          color: "white",
          border: "none",
          padding: "6px 10px",
          borderRadius: "5px",
          display: "flex",
          width: "auto",
          alignItems: "center",
        }}
        onClick={handleButtonClick}
      >
        <img
          src={userProfileLogIn}
          alt="User Profile"
          style={{ marginRight: "5px", height: "20px" }}
        />
        ItsmeSeller Ml.
        <img
          src={profileDropdown}
          alt=""
          profileDropdown
          style={{ width: "10px", marginLeft: "5px" }}
        ></img>
      </button>
      {showDropdown && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "0",
            backgroundColor: "rgba(0, 0, 0, .72)",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            minWidth: "200px",
            zIndex: "1",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: "10px",
              margin: "0",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              cursor: "pointer",
            }}
          >
            <li>ItsMe Mlhuillier</li>
            <li>mlseller@example.com</li>
            <li>Seller Tier</li>
            <li>───────────────────</li>
            <l1><button style={{minWidth:"200px", height:"40px", borderRadius:"20px", backgroundColor:"rgb(217,217,217,42%)", color:"white"}}>LIST YOUR PROPERTY</button></l1>
            <a
              style={{
                color: "white",
              }}
            >
              <li>Profile Settings</li>
            </a>
            <a
            href="/listing-summary-lists"
              style={{
                color: "white",
              }}
            >
              <li>Listings</li>
            </a>
            <a
            href="/clientmanagement"
              style={{
                color: "white",
              }}
            >
              <li>Client Management</li>
            </a>
            <a
              style={{
                color: "white",
              }}
            >
              <li>Logout</li>
            </a>
            <li
              style={{
                color: "white",
              }}
            ></li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default SellerLogInButtonDropdown;
