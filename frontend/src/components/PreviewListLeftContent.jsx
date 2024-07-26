import React, { useState } from "react";
import bedrooms from "../assets/icons/previewlisting/bedrooms.png";
import bathrooms from "../assets/icons/previewlisting/bathroom.png";
import garage from "../assets/icons/previewlisting/garage.png";
import sqm from "../assets/icons/previewlisting/sqm.png";
import map from "../assets/images/map.png";
import "../styles/previewListing.css";
import MapComponent from "./mapComponent";
import { LocationFormatter } from "../utils/LocationDateFormatter";

const handleLocationClick = () => {
  window.location.href = "/locationdetailscomponent"; // Redirect to location details component
};

const handlePropertyTypeClick = () => {
  window.location.href = "/listing"; // Redirect to listing component for property type
};

const handleListingTypeClick = () => {
  window.location.href = "/listing"; // Redirect to listing component for listing type
};

const PreviewListLeftContent = ({ oneListing }) => {
  return (
    <div className="leftContent">
      <div className="previewlist-property-info">
        <div className="property-info-item">
          <span>Bedrooms:</span>
          <span>{oneListing.listings.unit_details.no_of_beds}</span>
          <img src={bedrooms} alt="" />
        </div>
        <div className="property-info-item">
          <span>Bathrooms:</span>
          <span>{oneListing.listings.unit_details.no_of_bathrooms}</span>
          <img src={bathrooms} alt="" />
        </div>
        <div className="property-info-item">
          <span>Parking Slots:</span>
          <span>{oneListing.listings.unit_details.parking} </span>
          <img src={garage} alt="" />
        </div>
        <div className="property-info-item">
          <span>Area:</span>
          <span>{oneListing.listings.unit_details.lot_area} SqM</span>
          <img src={sqm} alt="" className="sqm" />
        </div>
        <div className="property-info-item">
          <span>Price per SqM:</span>
          <span style={{ color: "red" }}>
            PHP {oneListing.listings.unit_details.price_per_sqm}
          </span>
        </div>
      </div>

      <div className="Description">
        <h3>Description</h3>
        <p>{oneListing.listings.description}</p>
      </div>
      <div className="preview-table">
        <table className="Listing-property-details">
          <tbody>
            <tr>
              <th>Property ID</th>
              <td className="view-top-border">
                {oneListing.listings.property_id}
              </td>
            </tr>
            <tr>
              <th>Listing Type</th>
              <td>{oneListing.listings.listing_type.listing_type}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{LocationFormatter(oneListing.listings.location)}</td>
            </tr>
            <tr>
              <th>Bedroom</th>
              <td>{oneListing.listings.unit_details.no_of_beds} Beds</td>
            </tr>
            <tr>
              <th>Bathroom</th>
              <td>
                {oneListing.listings.unit_details.no_of_bathrooms} Bath/Baths
              </td>
            </tr>
            <tr>
              <th>Floor Area</th>
              <td>{oneListing.listings.unit_details.floor_area} SqM</td>
            </tr>
            <tr>
              <th>Lot Area</th>
              <td>{oneListing.listings.unit_details.lot_area} SqM</td>
            </tr>
            <tr>
              <th>Price per SqM</th>
              <td>PHP {oneListing.listings.unit_details.price_per_sqm}</td>
            </tr>
            <tr>
              <th>No of Floors</th>
              <td>{oneListing.listings.unit_details.no_of_floors} Floors</td>
            </tr>
            <tr>
              <th>Car Parking</th>
              <td>{oneListing.listings.unit_details.parking} Cars</td>
            </tr>
            <tr>
              <th>Furnishing</th>
              <td>{oneListing.listings.unit_details.classification}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="featuresamenites">
        <h3>Features & Amenities</h3>
        <ul>
          {JSON.parse(
            oneListing.listings.amenities.custom_amenities.feature_name
          ).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="includes">
        <h3>Includes:</h3>
        <ul>
          {JSON.parse(
            oneListing.listings.amenities.custom_inclusion.inclusion_name
          ).map((inclusion, index) => (
            <li key={index}>{inclusion}</li>
          ))}
        </ul>
      </div>
      <div className="view-features">
        <h3>Features:</h3>
        <div className="feature-grid">
          {[
            ...JSON.parse(oneListing.listings.amenities.indoor_features),
            ...JSON.parse(oneListing.listings.amenities.outdoor_features),
          ].map((feature, index) => (
            <div key={index} className="feature-items">
              <input type="checkbox" checked readOnly />
              <label>{feature}</label>
            </div>
          ))}
        </div>
      </div><br/>

      <div className="property-on-map">
        <h3>Property on Map</h3>
      </div>
      <MapComponent />
      <div className="view-similar-properties">
        <h3>Similar Properties</h3>
        <div className="view-listi-buttons">
          <button className="recommendedactive">Recommended</button>
          <button className="locationbutt" onClick={handleLocationClick}>
            Location
          </button>
          <button className="property-type" onClick={handlePropertyTypeClick}>
            Property Type
          </button>
          <button className="listing-type" onClick={handleListingTypeClick}>
            Listing Type
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewListLeftContent;
