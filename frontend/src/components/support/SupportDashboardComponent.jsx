import React, { useState } from "react";
import SupportNavigation from "../custom/support/custom.NavigationComponent";
import SupportDashboardCard from "../custom/support/custom.SupportDashboardCard";
import FavoriteFill1 from "../../asset/icons/FavoriteFill";
import "../../styles/support/SupportDashboard.css";
import Order from "../layout/support/OrderLayout";
import Footer from "../layout/support/FooterComponent";
import SecondNavigationComponent from "../layout/support/SecondNavigationComponent";
import SupportSubMenu from "./SupportSubMenu";

import Approval from '../../asset/icons/approval.png';
import Bookmark from '../../asset/icons/bookmark.png';
import Heart from '../../asset/icons/heart.png';
import House from '../../asset/icons/house.png';
import Star from '../../asset/icons/star.png';

const SupportDashboardComponent = () => {

  const [totalSales, setTotalSales] = useState("10,000");
  const [totalCommission, setTotalCommission] = useState("20,000");

  const summary = [
    {
      total: "1000000",
      name: "Property Sold",
      pic: House
    },
    {
      total: "1000000",
      name: "Highlighted",
      pic: Star
    },
    {
      total: "1000000",
      name: "Active Listing",
      pic: Bookmark
    },
    {
      total: "1000000",
      name: "Listing Saves",
      pic: Heart
    },
    {
      total: "1000000",
      name: "For Approval",
      pic: Approval
    },
    {
      total: "1000000",
      name: "New Listing",
      pic: "https://c.animaapp.com/eS0o2HKP/img/new-bookmark-1.svg"
    }
  ]
  
  return (
    <>
      <div className="SupportDashboard">
        <SupportSubMenu title={'Dashboard'} isShowDetails={false}/>
        <div className="SupportDashboard__container"></div>
        <div className="supportingDashboard">
          <div className="overview">OVERVIEW</div>
          <div className="listing-count">Listing Count &amp; Highlight</div>
        </div>
        <SupportDashboardCard
          summary={summary}
        />
        <div className="performanceDiv">
          <div className="performance-title">PERFORMANCE</div>
          <div className="totalDiv">
            <div className="totalCard">
              <div className="totalSales">Total Sales</div>
              <div className="amountOfTotalSales"><span>₱ </span>{totalSales}</div>
              <p className="salesParagraph">
                Potential Sales Opportunities is derived from the sum of the
                prices of the properties your clients are interested at.
              </p>
            </div>
            <div className="totalCard">
              <div className="totalSales">Total Commission</div>
              <div className="amountOfTotalSales"><span>₱ </span>{totalCommission}</div>
              <p className="salesParagraph">
                Potential Commission is the potential profit you{"'"}ll make
                when you close the deals with your clients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportDashboardComponent;
