import React, { useState } from "react";
import FavoriteFill1 from "../../../asset/icons/FavoriteFill";
import "../../../styles/support/SupportDashboard.css";

const SecondNavigationComponent = (props) => {
  const { title, text, isCreateListing } = props;
  const [listingId, setListingId] = useState("123abc12ab");
  console.log("Text Information: ", isCreateListing);
  return (
    <div className="SecondNavigationDiv">
      <div className="SecondDiv">
        <div className="SecondDivTitle">{title}</div>
        <div className="id">
          Listing ID: <span className="listingID">{listingId}</span>
        </div>
      </div>
      <center>
        {" "}
        <hr style={{ border: "#D90000 solid 1px", width: "95%" }} />
      </center>
    </div>
  );
};

export default SecondNavigationComponent;
