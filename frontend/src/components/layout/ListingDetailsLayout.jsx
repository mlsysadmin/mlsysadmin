import React, { useState } from "react";
import CustomSelectTypeField from "../custom/custom.SelectTypeField";
import CustomTextField from "../custom/custom.TextField";
import SupportFeatureLayout from "./SupportFeatureLayout";
import "../../styles/Support.css";

const ListingDetailsLayout = () => {
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
            inputStyle={{
              fontSize: "12px",
              fontWeight: "400",
              letterSpacing: "0",
              lineHeight: "normal",
              border: "1px solid",
              borderColor: "#8c9094",
              borderRadius: "10px",
              height: "50px",
              width: "333px",
              padding: "0px 10px 0px 10px",
            }}
          />
          <CustomTextField
            inputType="input"
            labelName="Discounted Selling Price"
            inputStyle={{
              fontSize: "12px",
              fontWeight: "400",
              letterSpacing: "0",
              lineHeight: "normal",
              border: "1px solid",
              borderColor: "#8c9094",
              borderRadius: "10px",
              height: "50px",
              width: "333px",
              padding: "0px 10px 0px 10px",
            }}
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
            inputStyle={{
              fontSize: "12px",
              fontWeight: "400",
              letterSpacing: "0",
              lineHeight: "normal",
              border: "1px solid",
              borderColor: "#8c9094",
              borderRadius: "10px",
              height: "50px",
              width: "333px",
              padding: "0px 10px 0px 10px",
            }}
          />
          <CustomTextField
            inputType="input"
            labelName="Lot Area (sqm)"
            inputStyle={{
              fontSize: "12px",
              fontWeight: "400",
              letterSpacing: "0",
              lineHeight: "normal",
              border: "1px solid",
              borderColor: "#8c9094",
              borderRadius: "10px",
              height: "50px",
              width: "333px",
              padding: "0px 10px 0px 10px",
            }}
          />
          <CustomTextField
            inputType="input"
            labelName="Price per sqm"
            inputStyle={{
              fontSize: "12px",
              fontWeight: "400",
              letterSpacing: "0",
              lineHeight: "normal",
              border: "1px solid",
              borderColor: "#8c9094",
              borderRadius: "10px",
              height: "50px",
              width: "333px",
              padding: "0px 10px 0px 10px",
            }}
          />
          <CustomTextField
            inputType="input"
            labelName="Property ID"
            inputStyle={{
              fontSize: "12px",
              fontWeight: "400",
              letterSpacing: "0",
              lineHeight: "normal",
              border: "1px solid",
              borderColor: "#8c9094",
              borderRadius: "10px",
              height: "50px",
              width: "333px",
              padding: "0px 10px 0px 10px",
            }}
          />
        </div>
        <div className="location">
          <div className="locationText">Location</div>
          <CustomTextField
            inputType="textarea"
            labelName="Subdivision"
            inputStyle={{
              fontSize: "12px",
              fontWeight: "400",
              letterSpacing: "0",
              lineHeight: "normal",
              border: "1px solid",
              borderColor: "#8c9094",
              borderRadius: "10px",
              height: "100px",
              width: "88%",
              padding: "10px 10px 10px 10px",
            }}
          />
          <CustomTextField
            inputType="textarea"
            labelName="Complete Address"
            inputStyle={{
              fontSize: "12px",
              fontWeight: "400",
              letterSpacing: "0",
              lineHeight: "normal",
              border: "1px solid",
              borderColor: "#8c9094",
              borderRadius: "10px",
              height: "100px",
              width: "88%",
              padding: "10px 10px 10px 10px",
            }}
          />
          <CustomTextField
            inputType="input"
            labelName="Map Location"
            inputStyle={{
              border: "1px solid",
              borderColor: "#8c9094",
              borderRadius: "10px",
              height: "50px",
              padding: "5px 15px 5px 15px",
              width: "87%",
            }}
          />
        </div>
      </div>
      <div className="rightSide">
        <div className="descriptionText">Description</div>
        <div className="descriptionFields">
          <CustomTextField
            inputType="input"
            labelName="Title"
            inputStyle={{
              border: "1px solid",
              borderColor: "#8c9094",
              borderRadius: "10px",
              height: "50px",
              padding: "0px 20px 0px 10px",
              width: "90%",
            }}
          />
          <CustomTextField
            inputType="textarea"
            labelName="Caption"
            inputType="textarea"
            inputStyle={{
              border: "1px solid",
              borderColor: "#8c9094",
              borderRadius: "10px",
              height: "560px",
              padding: "10px 20px 0px 10px",
              width: "90%",
            }}
          />
          <div className="googleMapDisplay">
            {/* <Map
              defaultZoom={13}
              defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
              mapId="DEMO_MAP_ID"
              onCameraChanged={(ev: MapCameraChangedEvent) =>
                console.log(
                  "camera changed:",
                  ev.detail.center,
                  "zoom:",
                  ev.detail.zoom
                )
              }
            >
              {/* Add markers or other map elements here 
            </Map> */}
          </div>
        </div>
      </div>
      <SupportFeatureLayout/>
    </div>
  );
};

export default ListingDetailsLayout;
