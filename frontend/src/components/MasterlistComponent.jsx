import React, { useState } from "react";
import SupportNavigation from "./custom/custom.NavigationComponent";
import SupportListingMasterlist from "./custom/custom.SupportListingMasterlist";

const MasterlistComponent = () => {
  const [activeTab, setActiveTab] = useState("open"); 
  const navLinks = [
    { text: "Listing Masterlist", to: "/MasterlistDashboard" },
    { text: "Active", to: "/path" },
    { text: "Inactive", to: "/path" },
  ];

  return (
    <div>
      <SupportNavigation navLinkProps={navLinks} activeTab={activeTab} />{" "}
      <SupportListingMasterlist setActiveTab={setActiveTab} />{" "}
    </div>
  );
};

export default MasterlistComponent;
