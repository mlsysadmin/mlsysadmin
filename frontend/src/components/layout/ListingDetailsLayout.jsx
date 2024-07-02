import React, { useState } from "react";
import CustomSelectTypeField from "../custom/custom.SelectTypeField";
import CustomTextField from "../custom/custom.TextField";
import SupportFeatureLayout from "./SupportFeatureLayout";
import "../../styles/Support.css";

const ListingDetailsLayout = () => {
  const [subdivision, setSubdivision] = useState("");
  const [completeAddress, setCompleteAddress] = useState("");
  const [mapLocation, setMapLocation] = useState("");

  const handleSubdivisionChange = (e) => setSubdivision(e.target.value);
  const handleCompleteAddressChange = (e) => setCompleteAddress(e.target.value);
  const handleMapLocationChange = (e) => setMapLocation(e.target.value);

  // const generateMapSrc = () => {
  //   const query = `${subdivision} ${completeAddress} ${mapLocation}`;
  //   return `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(query)}`;
  // };

  return (
    <div className="ListingDetails">
      <div className="leftSide">
        <div className="propertyDetailsText">Property Details</div>
        <div className="propertyDetailsFields">
          <CustomSelectTypeField labelName="Property Type" />
          <CustomSelectTypeField labelName="Listing Type" />
        </div>
        <div className="unitDetailsText">Unit Details</div>
        <div className="unitDetailsFields">
          <CustomTextField
            inputType="input"
            labelName="Selling Price"
            
          />
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
          <CustomTextField
            inputType="input"
            labelName="Floor Area (sqm)"
            
          />
          <CustomTextField
            inputType="input"
            labelName="Lot Area (sqm)"
            
          />
          <CustomTextField
            inputType="input"
            labelName="Price per sqm"
            
          />
          <CustomTextField
            inputType="input"
            labelName="Property ID"
            
          />
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
          <CustomTextField
            inputType="input"
            labelName="Title"
           
          />
          <CustomTextField
            inputType="textarea"
            labelName="Caption"
           
          />
          <div className="googleMapDisplay">
            {/* <iframe
              width="600"
              height="450"
              frameborder="0"
              style={{ border: 0 }}
              src={generateMapSrc()}
              allowfullscreen
            ></iframe> */}
          </div>
        </div>
      </div>
      <SupportFeatureLayout />
    </div>
  );
};

export default ListingDetailsLayout;
