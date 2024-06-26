import React, { useState } from "react";
import FavoriteFill1 from "../../assets/icons/FavoriteFill";
import "../../styles/SupportDashboard.css";
import Order from "../layout/OrderLayout";

const SecondNavigationComponent = (props) => {
  const { title, text, isCreateListing } = props;
  const [ listingId, setListingId ] = useState('123abc12ab');
  console.log("Text Information: ", isCreateListing);
  return (
    <div className="SecondNavigationDiv">
      <div className="SecondDiv">
        <div className="SecondDivTitle">{title}</div>
        <div>Listing ID:<span className="listingID">{listingId}</span></div>
      </div>
      <div className="line" />
    </div>
  );
};

export default SecondNavigationComponent;
