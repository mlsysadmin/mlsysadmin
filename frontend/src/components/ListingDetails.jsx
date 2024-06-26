import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Dummydata from "../supportDummyData/openListingDummy.json";
import Menu from "./custom/Menu";
import "../styles/ListingDetails.css";
import SupportNavigation from "./custom/custom.NavigationComponent";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BedIcon from "@mui/icons-material/Bed";
import ShowerIcon from "@mui/icons-material/Shower";
import RoofingIcon from "@mui/icons-material/Roofing";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import PublicIcon from "@mui/icons-material/Public";
import image1 from "../assets/images/image1.png";
import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";
import Modal from "./custom/Modal"; // Import the Modal component
import FooterComponent from "./layout/FooterComponent";

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
    // Perform action based on actionType and remarks
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

  return (
    <div className="listing-details-container">
      <SupportNavigation />
      <div className="bodySection">
        <Menu activeTab={activeTab} tabHeadings={tabHeadings} />
        <hr style={{ border: "#D90000 solid 1px", width: "100%" }} />
        <div className="contentContainer">
          <div className="leftside">
            <div className="texts">
              <h2 className="title">{detailedListing.title}</h2>
              <div className="location">
                <LocationOnIcon style={{ color: "red" }} />
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
                  <BedIcon style={{ color: "red" }} />
                  <p>{detailedListing.bedroom}</p>
                </div>
              </div>
              <div className="card">
                <p>Bathrooms</p>
                <div className="num">
                  <ShowerIcon style={{ color: "red" }} />
                  <p>{detailedListing.bathroom}</p>
                </div>
              </div>
              <div className="card">
                <p>Garage</p>
                <div className="num">
                  <RoofingIcon style={{ color: "red" }} />
                  <p>{detailedListing.car_parking}</p>
                </div>
              </div>
              <div className="card">
                <p>Area</p>
                <div className="num">
                  <OpenWithIcon style={{ color: "red" }} />
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
                <LocationOnIcon />
                <p>Show Property on Map </p>
              </a>
              <a href="#" className="sbutton">
                <PublicIcon />
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
        <FooterComponent/>
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
