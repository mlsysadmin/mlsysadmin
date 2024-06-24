import React from "react";
import {
  HomeFilled,
  DollarOutlined,  
} from "@ant-design/icons";
import { FooterComponent, CustomMlFooter, ListingSearch, MainLayout } from "../components";
import "../styles/mortgage.css";

const MortgageComponent = () => {
  return (
    <div>
      <MainLayout/>
      <div className="mortgageContent"> 
        <div className="mortgage-title">
          <span className="mortgage-h1">Get pre-approved </span>
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
        </div><br/><br/><br/><br/><br/>
        <div>
          <CustomMlFooter/>
          <FooterComponent/>
        </div>
        
      </div>
    </div>
  );
}

export default MortgageComponent;
