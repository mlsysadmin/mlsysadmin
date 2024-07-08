import React, { useState } from "react";
import CustomTextField from "../custom/custom.TextField";
import SupportFeatureLayout from "./SupportFeatureLayout";
import Modal from "react-modal";
import "../../styles/Support.css";
import CustomSelectTypeField from "../custom/custom.SelectTypeField";

Modal.setAppElement('#root'); // Set this to your app root element

const ListingDetailsLayout = () => {
  const [subdivision, setSubdivision] = useState("");
  const [completeAddress, setCompleteAddress] = useState("");
  const [mapLocation, setMapLocation] = useState("");
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const openFirstModal = () => setIsFirstModalOpen(true);
  const closeFirstModal = () => setIsFirstModalOpen(false);
  const openSecondModal = () => {
    closeFirstModal();
    setIsSecondModalOpen(true);
  };
  const closeSecondModal = () => setIsSecondModalOpen(false);
  const handleSubdivisionChange = (e) => setSubdivision(e.target.value);
  const handleCompleteAddressChange = (e) => setCompleteAddress(e.target.value);
  const handleMapLocationChange = (e) => setMapLocation(e.target.value);

  // const generateMapSrc = () => {
  //   const query = `${subdivision} ${completeAddress} ${mapLocation}`;
  //   return `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(query)}`;
  // };

  return (
    <>
      <div className="ListingDetails">
        <div className="leftSide">
          <div className="propertyDetailsText">Property Details</div>
          <div className="propertyDetailsFields">
          <CustomSelectTypeField labelName="Property Type" />
          <CustomSelectTypeField labelName="Listing Type" />
          </div>
          <div className="unitDetailsText">Unit Details</div>
          <div className="unitDetailsFields">
            <CustomTextField inputType="input" labelName="Selling Price" />
            <CustomTextField
              inputType="input"
              labelName="Discounted Selling Price"
            />
            <CustomSelectTypeField labelName="Furnishing" />
            <CustomSelectTypeField labelName="Classification" />
            <CustomSelectTypeField labelName="Beds" />
            <CustomSelectTypeField labelName="Bathrooms" />
            <CustomSelectTypeField labelName="Parking" />
            <CustomSelectTypeField labelName="No of Floors" />
            <CustomTextField inputType="input" labelName="Floor Area (sqm)" />
            <CustomTextField inputType="input" labelName="Lot Area (sqm)" />
            <CustomTextField inputType="input" labelName="Price per sqm" />
            <CustomTextField inputType="input" labelName="Property ID" />
          </div>
          <div className="location">
            <div className="locationText">Location</div>
            <CustomTextField
              inputType="textarea"
              labelName="Subdivision"
              value={subdivision}
              onChange={handleSubdivisionChange}
            />
            <CustomTextField
              inputType="textarea"
              labelName="Complete Address"
              value={completeAddress}
              onChange={handleCompleteAddressChange}
            />
            <CustomTextField
              inputType="input"
              labelName="Map Location"
              value={mapLocation}
              onChange={handleMapLocationChange}
            />
          </div>
        </div>
        <div className="rightSide">
          <div className="descriptionText">Description</div>
          <div className="descriptionFields">
            <CustomTextField inputType="input" labelName="Title" />
            <CustomTextField inputType="textarea" labelName="Caption" />
            <div className="googleMapDisplay">
              {/* <iframe
                width="600"
                height="450"
                frameBorder="0"
                style={{ border: 0 }}
                src={generateMapSrc()}
                allowFullScreen
              ></iframe> */}
            </div>
          </div>
        </div>
        <SupportFeatureLayout />
        <Modal
          isOpen={isFirstModalOpen}
          onRequestClose={closeFirstModal}
          className="fmodal"
          overlayClassName="overlay"
          contentLabel="First Modal"
        >
          <h2>Confirmation Message</h2>
          <p>Are you sure you want to create listing?</p>
          <div>
          <button className="button button-primary" onClick={openSecondModal}>Confirm</button>
          <button className="button button-secondary" onClick={closeFirstModal}>Cancel</button>
          </div>
        </Modal>

        <Modal
          isOpen={isSecondModalOpen}
          onRequestClose={closeSecondModal}
          className="smodal"
          overlayClassName="overlay"
          contentLabel="Second Modal"
        >
          <h2>Successful Message</h2>
          <p>Listing successfully created!</p>
          <button className="button button-primary">Preview Listing</button>
        </Modal>
      </div>
      <div className="submit">
        <button className="button button-primary" onClick={openFirstModal}>Create</button>
      </div>
    </>
  );
};

export default ListingDetailsLayout;
