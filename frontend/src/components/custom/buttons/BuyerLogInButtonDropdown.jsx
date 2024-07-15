
import React from "react";
import { useState } from "react";
import userProfileLogIn from "../../../assets/userProfileLogIn.png"
import profileDropdown from "../../../assets/profileDropdown.png";

const BuyerLogInProfileDropdownBtn = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleButtonClick = () => {
      setShowDropdown(!showDropdown);
    };

  return (
    <div style={{position:"relative"}}>
    <button
      style={{
        margin: "0px 0px 0px 10px",
        cursor: "pointer",
        backgroundColor: "#D90000",
        color: "white",
        border: "none",
        padding: "5px 10px",
        borderRadius: "20px",
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
      Charebel B.
      <img src={profileDropdown} alt=""profileDropdown style={{width:"10px", marginLeft:"5px"}}></img>
    </button>
    {showDropdown && (
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            minWidth: '200px',
            zIndex: '10',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            justifyContent:"center"
          }}
        >
            <ul style={{ listStyle: 'none', padding: "10px", margin: '0', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <li>Charebel Bejoc</li>
            <li> charebel@example.com</li>
            <li>Buyer Tier</li>
            <li>───────────────────</li>
            <li>Application History</li>
            <li>Logout</li>
            <li>
            </li>
          </ul>
        </div>
       
      )}
      </div>
  );
};
export default BuyerLogInProfileDropdownBtn;
