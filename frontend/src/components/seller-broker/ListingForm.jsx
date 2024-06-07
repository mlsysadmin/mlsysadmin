import React, { useState } from "react";
import Navigation from "../layout/NavigationComponent";
import "../../styles/listing-form.css";
import { WarningOutlined } from "@ant-design/icons";
import { Space } from "antd";

import warning from "../../assets/images/warning.png";
import logo from "../../assets/images/ML logo.png";

import ListingSteps from "../layout/ListingSteps";
import ListingBanner from "../layout/ListingBanner";

// export default function ColorTabs() {
//   const [value, setValue] = React.useState('one');

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box className="tabs" sx={{ width: '100%' }}>
//       <p>Commercial</p>
//       <Tabs
//         value={value}
//         onChange={handleChange}
//         textColor="secondary"
//         indicatorColor="secondary"
//         aria-label="secondary tabs example"
//       >
//         <Tab value="one" label="Item One" />
//         <Tab value="two" label="Item Two" />
//         <Tab value="three" label="Item Three" />
//       </Tabs>
//     </Box>
//   );
// }

const PropertyDetailsTabs = () => {
  const [selectedPropertyTab, setSelectedPropertyTab] = useState(null);
  const [selectedListingTab, setSelectedListingTab] = useState(null);

  const handlePropertyTabClick = (tab) => {
    setSelectedPropertyTab(tab);
  };

  const handleListingTabClick = (tab) => {
    setSelectedListingTab(tab);
  };

  return (
    <div className="property-details-tabs">
      <div className="property-type">
        <div className="property-details-label">
          <div className="label"> Property Type </div>
        </div>

        <div className="tab-container">
          <div className="tab-category">
            <div className="tab-label">Commercial</div>
            <div className="tab-wrapper">
              <div className="tabs">
                {["Service Office", "Shop/Retail", "Commercial Land/Lot"].map(
                  (tab) => (
                    <div
                      key={tab}
                      className={`tab ${
                        selectedPropertyTab === tab ? "selected" : ""
                      }`}
                      onClick={() => handlePropertyTabClick(tab)}
                    >
                      {tab}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="tab-category">
            <div className="tab-label">Residential</div>
            <div className="tab-wrapper">
              <div className="tabs">
                {["Condominium", "House and Lot", "Townhouse"].map((tab) => (
                  <div
                    key={tab}
                    className={`tab ${
                      selectedPropertyTab === tab ? "selected" : ""
                    }`}
                    onClick={() => handlePropertyTabClick(tab)}
                  >
                    {tab}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="tab-category">
            <div className="tab-label">Industrial/etc</div>
            <div className="tab-wrapper">
              <div className="tabs">
                {["Warehouse", "Farm Lot", "Hotel/Resort"].map((tab) => (
                  <div
                    key={tab}
                    className={`tab ${
                      selectedPropertyTab === tab ? "selected" : ""
                    }`}
                    onClick={() => handlePropertyTabClick(tab)}
                  >
                    {tab}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="listing-type">
        <div className="listing-details-label">
          <div className="label"> Listing Type </div>
        </div>

        <div className="listing-tab-container">
          <div className="tab-category">
            <div className="listing-tab-wrapper">
              <div className="listing-tabs">
                {["For Rent", "For Sale", "Pre-Selling"].map((tab) => (
                  <div
                    key={tab}
                    className={`tab ${
                      selectedPropertyTab === tab ? "selected" : ""
                    }`}
                    onClick={() => handlePropertyTabClick(tab)}
                  >
                    {tab}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="note">
            <p>
              To help home buyers better, we only accept these 3 types of
              listing.
            </p>
          </div>

          <div className="reminders">
            <div className="reminders-label">
              <WarningOutlined className="warning-icon" />
              <b>A few reminders when posting a unit.</b>
            </div>
            <ul>
              <li>
                We DO NOT accept pre-selling properties, ONLY ready for
                occupancy (RFO) ones that have either been bought from a
                developer or have been constructed by a person for sale or rent.
              </li>
              <li>
                If you are posting more than one (1) unit, please create one
                listing per unit. DO NOT advertise all your units in one (1)
                post.
              </li>
              <p className="more">
                For more assistance, you refer to our photo guide or watch our
                video guide.
              </p>
            </ul>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export const ListingForm = () => {
  return (
    <div>
      <div className="nav">
        <Navigation />
      </div>

      <div>
        <ListingBanner />
      </div>

      <div className="listing-application">
        <div className="listing-steps">
          <ListingSteps />
        </div>

        <div className="property-details">
          <div className="property-details-info">
            <b className="b">Property Details</b>
            <PropertyDetailsTabs />
          </div>
        </div>
      </div>
    </div>
  );
};
