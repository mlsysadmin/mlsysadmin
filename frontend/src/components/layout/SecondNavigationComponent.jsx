import React from "react";
import "../../styles/SupportDashboard.css";

const SecondNavigationComponent = (props) => {
  const { title, text } = props;
  console.log("Text Information: ", text);
  return (
    <div className="SecondNavigationDiv">
      <div className="SecondDivTitle">{title}</div>
      <div className="line" />
    </div>
  );
};

export default SecondNavigationComponent;
