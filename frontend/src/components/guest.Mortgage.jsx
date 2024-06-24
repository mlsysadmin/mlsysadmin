import React from "react";
import TopbarComponent from "./custom/TopbarComponent ";
import {
  HomeFilled,
  DollarOutlined,  
} from "@ant-design/icons";
import "../styles/mortgage.css";

function Mortgage() {
  return (
    <div>
      <TopbarComponent />
      <div className="mortgageContent">
        <div className="title">
          <h1>Get pre-approved </h1>
          <p className="SubTitle">
            Home financing to make your goals a reality.
          </p>
        </div>
        <div className="mortBtn">
          <div className="purchasebtn">
            <HomeFilled style={{ fontSize: "4rem" }} />
            <p>I want to <span style={{fontWeight:"bold"}}>purchase</span> a home</p>
          </div>
          <div className="refinancebtn">
            <DollarOutlined style={{ fontSize: "4rem" }} />
            <p>I want to <span style={{fontWeight:"bold"}}>refinance</span> my home</p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Mortgage;
