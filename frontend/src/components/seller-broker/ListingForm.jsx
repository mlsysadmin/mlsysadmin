import React, { useState } from "react";
import Navigation from "../layout/NavigationComponent";

import { WarningOutlined } from "@ant-design/icons";
import PropIdLogo from "../../assets/icons/PropertyId/PropIdLogo";
import floorlogo from "../../assets/images/floorlogo.png";
import SearchIcon from "../../assets/icons/SearchIcon/SearchIcon";

import ListingSteps from "../layout/ListingSteps";
import ListingBanner from "../layout/ListingBanner";

import BedsInputSlider from "../Slider/BedSlider";
import ParkingInputSlider from "../Slider/ParkingSlider";
import BathroomInputSlider from "../Slider/BathroomsSlider";
import NoOfFloorsInputSlider from "../Slider/NoOfFloors";

import "../../styles/listing-form.css";

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

function ListingDetailsForm() {
  const [selectedPropertyTab, setSelectedPropertyTab] = useState(null);
  const [selectedListingTab, setSelectedListingTab] = useState(null);
  const [selectedSellingPrice, setSelectedSellingPrice] = useState(null);
  const [selectedClassification, setSelectedClassification] = useState(null);

  const handlePropertyTabClick = (tab) => {
    setSelectedPropertyTab(tab);
  };

  const handleListingTabClick = (tab) => {
    setSelectedListingTab(tab);
  };

  const handleSellingPriceClick = (tab) => {
    setSelectedSellingPrice(tab);
  };

  const handleClassificationClick = (tab) => {
    setSelectedClassification(tab);
  };

  return (
    <div className="listing-form-application">
      <div className="property-details">
        <div className="property-details-info">
          <b className="b">Property Details</b>
        </div>
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
                    {[
                      "Service Office",
                      "Shop/Retail",
                      "Commercial Land/Lot",
                    ].map((tab) => (
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
                <div className="tab-label">Residential</div>
                <div className="tab-wrapper">
                  <div className="tabs">
                    {["Condominium", "House and Lot", "Townhouse"].map(
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
                          selectedListingTab === tab ? "selected" : ""
                        }`}
                        onClick={() => handleListingTabClick(tab)}
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
                    developer or have been constructed by a person for sale or
                    rent.
                  </li>
                  <li>
                    If you are posting more than one (1) unit, please create one
                    listing per unit. DO NOT advertise all your units in one (1)
                    post.
                  </li>
                  <p className="more">
                    For more assistance, you refer to our photo guide or watch
                    our video guide.
                  </p>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="unit-details">
        <div className="unit-details-label">Unit Details</div>

        <div className="unit-details-div">
          <div className="unit-details-left">
            <div className="form-group">
              <div className="text-wrapper-37">Selling Price</div>
              <div className="input-group">
                <label className="text-wrapper-38" htmlFor="selling-price">
                  What is the selling price of the unit?
                </label>

                <div className="input-container">
                  <div className="currency-prefix">PHP</div>

                  <input id="price-input" className="price-input" type="text" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="text-wrapper-37">Furnishing</div>
              <div className="input-group">
                <label className="text-wrapper-38" htmlFor="furnish-tabs">
                  Is the unit fully furnished?
                </label>
                <div className="tab-category">
                  <div className="tab-wrapper">
                    <div className="furnish-tabs">
                      {["Yes", "No", "Semi"].map((tab) => (
                        <div
                          key={tab}
                          className={`furnish-tab ${
                            selectedSellingPrice === tab ? "selected" : ""
                          }`}
                          onClick={() => handleSellingPriceClick(tab)}
                        >
                          {tab}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="text-wrapper-37">Beds</div>
              <div className="input-group">
                <label className="text-wrapper-38" htmlFor="beds">
                  How many beds?
                </label>

                <div className="beds-input-group">
                  <div className="overlap-10">
                    <div className="beds-number">
                      <BedsInputSlider />
                    </div>

                    <img
                      className="beds-logo"
                      alt="Beds logo"
                      src="https://cdn.animaapp.com/projects/64e41d552340cba66b90f01a/releases/665420ac7606a0cc15aa6b94/img/hotel-bed-2--bed-double-bedroom-bedrooms-queen-king-full-hotel-h-5@2x.png"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="text-wrapper-37">Parking</div>
              <div className="input-group">
                <label className="text-wrapper-38" htmlFor="beds">
                  How many parking slots?
                </label>

                <div className="parking-input-group">
                  <div className="overlap-10">
                    <div className="parking-number">
                      <ParkingInputSlider />
                    </div>

                    <img
                      className="parking-logo"
                      alt="Parking logo"
                      src="https://cdn.animaapp.com/projects/64e41d552340cba66b90f01a/releases/665e706f7ae3ba3a45818d90/img/parking-sign--discount-coupon-parking-price-prices-hotel.svg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="text-wrapper-37">Floor Area</div>
              <div className="input-group">
                <label className="text-wrapper-38" htmlFor="floor-logo">
                  What is the floor area of the unit?
                </label>

                <div className="floor-input-container">
                  <div className="floor-logo">
                    <img
                      className="floor-logo-img"
                      alt="floor-logo"
                      src={floorlogo}
                    />
                  </div>

                  <input
                    id="floorarea-input"
                    className="floorarea-input"
                    type="text"
                  />
                  <div className="sqm-prefix">sqm</div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="text-wrapper-37">Price per sqm</div>
              <div className="input-group">
                <label className="text-wrapper-38" htmlFor="pricepersqm">
                  What is the selling price of per sqm?
                </label>

                <div className="input-container">
                  <div className="currency-prefix">PHP</div>

                  <input
                    id="pricepersqm"
                    className="pricepersqm-input"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="unit-details-right">
            <div className="form-group">
              <div className="text-wrapper-37">
                {" "}
                Discounted <br /> Selling Price
              </div>
              <div className="input-group">
                <label className="text-wrapper-38" htmlFor="disc-selling-price">
                  What is the discounted selling price of the unit?
                </label>

                <div className="input-container">
                  <div className="currency-prefix">PHP</div>

                  <input
                    id="disc-price-input"
                    className="disc-price-input"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="text-wrapper-37">Classification</div>
              <div className="input-group">
                <label className="text-wrapper-38" htmlFor="classification">
                  Is the unit fully furnished?
                </label>
                <div className="tab-category">
                  <div className="tab-wrapper">
                    <div className="classification-tabs">
                      {["BrandNew", "Retail"].map((tab) => (
                        <div
                          key={tab}
                          className={`classification-tab ${
                            selectedClassification === tab ? "selected" : ""
                          }`}
                          onClick={() => handleClassificationClick(tab)}
                        >
                          {tab}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="text-wrapper-37">Bathrooms</div>
              <div className="input-group">
                <label className="text-wrapper-38" htmlFor="bathrooms">
                  How many bathrooms?
                </label>

                <div className="bathroom-input-group">
                  <div className="overlap-10">
                    <div className="bathroom-number">
                      <BathroomInputSlider />
                    </div>

                    <img
                      className="bathroom-logo"
                      alt="bathroom-logo"
                      src="https://cdn.animaapp.com/projects/64e41d552340cba66b90f01a/releases/665e706f7ae3ba3a45818d90/img/hotel-shower-head--bathe-bath-bathroom-shower-water-head-hotel@2x.png"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="text-wrapper-37">No. of Floors</div>
              <div className="input-group">
                <label className="text-wrapper-38" htmlFor="nofloors">
                  How many floors?
                </label>

                <div className="nofloors-input-group">
                  <div className="overlap-10">
                    <div className="nofloors-number">
                      <NoOfFloorsInputSlider />
                    </div>

                    <img
                      className="nofloors-logo"
                      alt="nofloors-logo"
                      src="https://cdn.animaapp.com/projects/64e41d552340cba66b90f01a/releases/665e706f7ae3ba3a45818d90/img/descending-number-order-1@2x.png"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="text-wrapper-37">Lot Area</div>
              <div className="input-group">
                <label className="text-wrapper-38" htmlFor="lot-area">
                  What is the lot area of the unit?
                </label>

                <div className="lot-area-input-container">
                  <div className="lot-area-logo">
                    <img
                      className="lot-area-logo-img"
                      alt="lot-area-logo"
                      src={floorlogo}
                    />
                  </div>

                  <input
                    id="lot-area-input"
                    className="lot-area-input"
                    type="text"
                  />
                  <div className="sqm-prefix">sqm</div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="text-wrapper-37">Property ID Number</div>
              <div className="input-group">
                <label className="text-wrapper-38" htmlFor="lot-area">
                  What is the lot area of the unit?
                </label>

                <div className="propid-input-container">
                  <div className="propid-logo">
                    <PropIdLogo className="propid-logo-img" />
                  </div>

                  <input
                    id="propid-input"
                    className="propid-input"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="location-details">
        <div className="location-label">Location</div>
        <div className="location-div">

          <div className="form-group">
            <div className="text-wrapper-37">Subdivision</div>
            <div className="input-group">
              <label className="text-wrapper-38" htmlFor="subdivision">
                What is the subdivision name?
              </label>

              <div className="subdivision-input-container">
                <div className="subdivision-logo">
                  <img
                    className="subdivision-logo-img"
                    alt="subdivision-logo"
                    src="https://cdn.animaapp.com/projects/64e41d552340cba66b90f01a/releases/665e706f7ae3ba3a45818d90/img/location-pin-3--navigation-map-maps-pin-gps-location.svg"
                  />
                </div>

                <input
                  id="subdivision-input"
                  className="subdivision-input"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="text-wrapper-37">Address</div>
            <div className="input-group">
              <label className="text-wrapper-38" htmlFor="address">
                What is the address of the unit?
              </label>

              <div className="address-input-container">
                <div className="address-logo">
                  <img
                    className="address-logo-img"
                    alt="address-logo"
                    src="https://cdn.animaapp.com/projects/64e41d552340cba66b90f01a/releases/665e706f7ae3ba3a45818d90/img/location-pin-3--navigation-map-maps-pin-gps-location.svg"
                  />
                </div>

                <input
                  id="address-input"
                  className="address-input"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="text-wrapper-37">Map Location</div>
            <div className="input-group">
              <label className="text-wrapper-38" htmlFor="map-location">
                Show us where the property located.?
              </label>

              <div className="map-location-input-container">
                <div className="map-search-logo">
                  <SearchIcon className="search"/>
                </div>

                <input
                  id="map-location-input"
                  className="map-location-input"
                  type="text"
                />
              </div>

              <div className="map">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

        <div className="listing-form">
          <ListingDetailsForm />
        </div>
      </div>
    </div>
  );
};
