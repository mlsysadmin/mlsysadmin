import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Dummydata from "../supportDummyData/openListingDummy.json";
import Menu from "./custom/Menu";
import "../styles/ListingDetails.css";
import { EnvironmentOutlined, HomeOutlined } from "@ant-design/icons";

import SupportNavigation from "./custom/custom.NavigationComponent";
import image1 from "../assets/images/image1.png";
import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";
import Modal from "./custom/Modal";
import FooterComponent from "./layout/FooterComponent ";

const ListingDetails = () => {
  const location = useLocation();
  const { listing, activeTab } = location.state || {};

  const [detailedListing, setDetailedListing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [actionType, setActionType] = useState("");

  useEffect(() => {
    if (listing) {
      const listings = Dummydata[`${activeTab}_listings`] || [];
      const detailed = listings.find(
        (item) => item.listing_id === listing.listing_id
      );
      if (detailed) {
        setDetailedListing(detailed);
      } else {
        console.error(
          `Detailed listing not found for listing ID ${listing.listing_id}`
        );
      }
    }
  }, [listing, activeTab]);

  const tabHeadings = {
    open: "Manage Open Listings",
    pending: "Manage Pending Listings",
    disapproved: "Manage Disapproved Listings",
  };

  const handleAction = (type) => {
    setActionType(type);
    setShowModal(true);
  };

  const handleConfirm = () => {
    console.log(`Action: ${actionType}, Remarks: ${remarks}`);
    setShowModal(false);
    setRemarks("");
  };

  const handleClose = () => {
    setShowModal(false);
    setRemarks("");
  };

  if (!detailedListing) {
    return <div>Loading...</div>;
  }
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
    <div className="listing-details-container">
      <SupportNavigation navLinkProps={navLinks} />
      <div className="bodySection">
        <Menu activeTab={activeTab} tabHeadings={tabHeadings} />
        <hr style={{ border: "#D90000 solid 1px", width: "100%" }} />
        <div className="contentContainer">
          <div className="leftside">
            <div className="texts">
              <h2 className="title">{detailedListing.title}</h2>
              <div className="location">
                <EnvironmentOutlined style={{ color: "red" }} />
                <p>{detailedListing.location}</p>
              </div>
              <h2 className="price">
                <strong>PHP</strong>
                {detailedListing.price}
              </h2>
              <h2 className="ID">
                <strong>Property ID:</strong> {detailedListing.listing_id}
              </h2>
            </div>
            <div className="cards">
              <div className="card">
                <p>Bedrooms</p>
                <div className="num">
                  <span
                    class="material-symbols-outlined"
                    style={{ color: "red" }}
                  >
                    bed
                  </span>
                  <p>{detailedListing.bedroom}</p>
                </div>
              </div>
              <div className="card">
                <p>Bathrooms</p>
                <div className="num">
                  <span
                    style={{ color: "red" }}
                    class="material-symbols-outlined"
                  >
                    shower
                  </span>
                  <p>{detailedListing.bathroom}</p>
                </div>
              </div>
              <div className="card">
                <p>Garage</p>
                <div className="num">
                  <span
                    style={{ color: "red" }}
                    class="material-symbols-outlined"
                  >
                    roofing
                  </span>
                  <p>{detailedListing.car_parking}</p>
                </div>
              </div>
              <div className="card">
                <p>Area</p>
                <div className="num">
                  <span
                    class="material-symbols-outlined"
                    style={{ color: "red" }}
                  >
                    open_with
                  </span>
                  <p>{detailedListing.lot_area}</p>
                </div>
              </div>
            </div>
            <div className="propertyDescription">
              <b className="description">Description: </b>
              <p>{detailedListing.description}</p>
            </div>
            <div className="listInfo">
              <p>
                <strong>Property ID:</strong> {detailedListing.listing_id}
              </p>
              <p>
                <strong>Type:</strong> {detailedListing.property_type}
              </p>

              <p>
                <strong>Location:</strong> {detailedListing.location}
              </p>
              <p>
                <strong>Bedroom:</strong> {detailedListing.bedroom}
              </p>
              <p>
                <strong>Bathroom:</strong> {detailedListing.bathroom}
              </p>
              <p>
                <strong>Floor Area:</strong> {detailedListing.floor_area} sqm
              </p>
              <p>
                <strong>Lot Area:</strong> {detailedListing.lot_area} sqm
              </p>
              <p>
                <strong>No of Floors:</strong> {detailedListing.no_of_floors}
              </p>
              <p>
                <strong>Car Parking:</strong> {detailedListing.car_parking}
              </p>
              <p>
                <strong>Furnishing:</strong> {detailedListing.furnishing}
              </p>
            </div>
            <div className="btns">
              <a href="#" className="fbutton">
                <EnvironmentOutlined />
                <p>Show Property on Map </p>
              </a>
              <a href="#" className="sbutton">
                <span class="material-symbols-outlined">public</span>
                <p>Show Property on Map </p>
              </a>
            </div>
            <br />
          </div>
          <div className="rightside">
            <div className="photos">
              <div className="card">
                <img src={image1} alt="" />
              </div>
              <div className="card">
                <img src={image2} alt="" />
              </div>
              <div className="card">
                <img src={image3} alt="" />
              </div>
              <div className="card">
                <h1>18+</h1>
                <p>Photos</p>
              </div>
            </div>
            <div className="amenities">
              <h2>Features and Amenities:</h2>
              <ul>
                {detailedListing.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
            <div className="amenities">
              <h2>Includes:</h2>
              <ul>
                {detailedListing.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="bottomBtns">
          {activeTab !== "pending" && (
            <button id="pending" onClick={() => handleAction("pending")}>
              Move to Pending
            </button>
          )}
          {activeTab !== "disapproved" && (
            <button id="disapprove" onClick={() => handleAction("disapprove")}>
              Disapprove
            </button>
          )}
          {activeTab !== "approved" && (
            <button id="approve" onClick={() => handleAction("approve")}>
              Approve
            </button>
          )}
        </div>
          
        <FooterComponent />
      </div>
      <Modal
        show={showModal}
        onClose={handleClose}
        onConfirm={handleConfirm}
        question={`Are you sure you want to ${actionType} this listing?`}
        remarks={remarks}
        setRemarks={setRemarks}
        actionType={actionType}
      />
    </div>
  );
};

export default ListingDetails;
