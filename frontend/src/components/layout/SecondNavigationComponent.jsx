import React from "react";
import FavoriteFill1 from "../../assets/icons/FavoriteFill";
import "../../styles/SupportDashboard.css";
import Order from "../layout/OrderLayout";

const SecondNavigationComponent = (props) => {
    const { title, text } = props;
    console.log("Text Information: ",text);
  return (
    <div className="SecondNavigationDiv">
      <div className="SecondDivTitle">{title}</div>
      <div className="line"/>
    </div>
  );
};

export default SecondNavigationComponent;
