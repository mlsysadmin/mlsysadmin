import React, { useState } from "react";
import SupportNavigation from "./custom/custom.NavigationComponent";
import SupportDashboardCard from "./custom/custom.SupportDashboardCard";
import FavoriteFill1 from "../assets/icons/FavoriteFill";
import "../styles/SupportDashboard.css";
import Order from "./layout/OrderLayout";
import Footer from "./layout/FooterComponent";
import SecondNavigationComponent from "./layout/SecondNavigationComponent";

const SupportDashboardComponent = () => {
  const [propertySold, setPropertySold] = useState("1000000");
  const [highlighted, setHighlighted] = useState("20000");
  const [activeListing, setActiveListing] = useState("300");
  const [newListing, setNewListing] = useState("40000000");
  const [listingSaves, setListingSaves] = useState("50000000");
  const [forApproval, setForApproval] = useState("60000000000");
  const [totalSales, setTotalSales] = useState("10,000");
  const [totalCommission, setTotalCommission] = useState("20,000");
  const navLinks = [
    { text: "Create listing", to: "/dashboard/support/create-listing" },
    {
      text: "Listing Masterlist",
      dropdown: true,
      options: [
        { text: "Open Listings", to: "/dashboard/Support/open" },
        { text: "Pending Listings", to: "/dashboard/Support/pending" },
        { text: "Active Listings", to: "/dashboard/Support/active" },
        { text: "Disapproved Listings", to: "/dashboard/Support/disapproved" },
      ],
    },
    { text: "Client Management", to: "/dashboard/support" },
  ];
  return (
    <>
      <SupportNavigation navLinkProps={navLinks} />
      <div className="SupportDashboard">
        <SecondNavigationComponent
          title="Dashboard"
          text="These is Dashboard!"
        />
       <center> <hr style={{ border: "#D90000 solid 1px", width: "98%" }} /></center>

        <div className="supportingDashboard">
          <div className="overview">OVERVIEW</div>
          <div className="listing-count">Listing Count &amp; Highlight</div>
        </div>
        <SupportDashboardCard
          propertySold={propertySold}
          highlighted={highlighted}
          activeListing={activeListing}
          newListing={newListing}
          listingSaves={listingSaves}
          forApproval={forApproval}
        />
        <div className="performanceDiv">
          <div className="performance-title">PERFORMANCE</div>
          <div className="totalDiv">
            <div className="totalCard">
              <div className="totalSales">Total Sales</div>
              <div className="amountOfTotalSales">₱{totalSales}</div>
              <p className="salesParagraph">
                Potential Sales Opportunities is derived from the sum of the
                prices of the properties your clients are interested at.
              </p>
            </div>
            <div className="totalCard">
              <div className="totalSales">Total Commission</div>
              <div className="amountOfTotalSales">₱{totalCommission}</div>
              <p className="salesParagraph">
                Potential Commission is the potential profit you{"'"}ll make
                when you close the deals with your clients.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SupportDashboardComponent;
