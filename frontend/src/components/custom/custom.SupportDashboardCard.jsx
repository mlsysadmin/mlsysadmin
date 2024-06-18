import React from "react";
import CustomSupportOverviewCard from "./custom.SupportOverviewCard";

const CustomSupportDashboardCard = (props) => {
  const { propertySold, highlighted, activeListing, newListing, listingSaves, forApproval} = props
  console.log("Console Props: ",props);
  return (
    <div className="card">
      <CustomSupportOverviewCard
        imgSrc="https://c.animaapp.com/1RDRTvCv/img/home-fill-1.svg"
        totalHead={propertySold}
        valueTitle="Property Sold"
      />
      <CustomSupportOverviewCard
        imgSrc="https://c.animaapp.com/1RDRTvCv/img/star-1.svg"
        totalHead={highlighted}
        valueTitle="Highlighted"
      />
      <CustomSupportOverviewCard
        imgSrc="https://c.animaapp.com/1RDRTvCv/img/lable-fill.svg"
        totalHead={activeListing}
        valueTitle="Active Listing"
      />
      <CustomSupportOverviewCard
        imgSrc="https://c.animaapp.com/eS0o2HKP/img/new-bookmark-1.svg"
        totalHead={newListing}
        valueTitle="New Listings"
      />
      <CustomSupportOverviewCard
        imgSrc="https://c.animaapp.com/EtdCH9Y5/img/heart--1--1.svg"
        totalHead={listingSaves}
        valueTitle="Listing Saves"
      />
      <CustomSupportOverviewCard
        imgSrc="https://c.animaapp.com/1RDRTvCv/img/home-fill-1.svg"
        totalHead={forApproval}
        valueTitle="For Approvals"
      />
    </div>
  );
};
export default CustomSupportDashboardCard;
