import React, { useState } from "react";
import bedrooms from "../assets/icons/previewlisting/bedrooms.png";
import bathrooms from "../assets/icons/previewlisting/bathroom.png";
import garage from "../assets/icons/previewlisting/garage.png";
import sqm from "../assets/icons/previewlisting/sqm.png";
import map from "../assets/images/map.png";
import "../styles/previewListing.css";
import MapComponent from "./mapComponent";

const handleLocationClick = () => {
  window.location.href = '/locationdetailscomponent'; // Redirect to location details component
};

const handlePropertyTypeClick = () => {
  window.location.href = '/listing'; // Redirect to listing component for property type
};

const handleListingTypeClick = () => {
  window.location.href = '/listing'; // Redirect to listing component for listing type
};




const PreviewListLeftContent = () => {
  return (
    <div className="leftContent">
      <div className="previewlist-property-info">
        <div className="property-info-item">
          <span>Bedrooms:</span>
          <span>5</span>
          <img src={bedrooms} alt="" />
        </div>
        <div className="property-info-item">
          <span>Bathrooms:</span>
          <span>5</span>
          <img src={bathrooms} alt="" />
        </div>
        <div className="property-info-item">
          <span>Garage:</span>
          <span>300 SqM</span>
          <img src={garage} alt="" />
        </div>
        <div className="property-info-item">
          <span>Area:</span>
          <span>300 SqM</span>
          <img src={sqm} alt="" className="sqm" />
        </div>
        <div className="property-info-item">
          <span>Price per SqM:</span>
          <span style={{ color: "red", fontSize: "15px" }}>
            PHP 400,000
          </span>
        </div>
      </div>
      <div className="Description">
        <h3>Description</h3>
        <p>
          Maria Luisa Estate Park, Cebu’s most prestigious and most
          sought after residential development both by locals and
          foreigners alike, is set proudly atop the Banilad and Busay
          Hills of Cebu. It encompasses 200 hectares of prime
          residential property with the excellent reputation of being
          the most desirable and exclusive neighborhood to live in Cebu.
          Homes there catches the cool breeze while enjoying a
          magnificent view of the city and the Visayan sea. It has been
          known to provide comfort, security and safety to its
          residents.
        </p>
      </div>
      <div className="preview-table">
        <table className="Listing-property-details">
          <tbody>
            <tr>
              <th>Property ID</th>
              <td className="view-top-border">1234567893</td>
            </tr>
            <tr>
              <th>Listing Type</th>
              <td>House for Sale</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>Maria Luisa Estate Park, Banilad, Cebu City</td>
            </tr>
            <tr>
              <th>Bedroom</th>
              <td>5 Beds</td>
            </tr>
            <tr>
              <th>Bathroom</th>
              <td>5 Bath</td>
            </tr>
            <tr>
              <th>Floor Area</th>
              <td>300 SqM</td>
            </tr>
            <tr>
              <th>Lot Area</th>
              <td>300 SqM</td>
            </tr>
            <tr>
              <th>Price per SqM</th>
              <td>PHP400,000</td>
            </tr>
            <tr>
              <th>No of Floors</th>
              <td>3 Floors</td>
            </tr>
            <tr>
              <th>Car Parking</th>
              <td>3 Cars</td>
            </tr>
            <tr>
              <th>Furnishing</th>
              <td>Furnished</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="featuresamenites">
        <h3>Features & Amenities</h3>
        <ul>
          <li>Landscaped Parks with picnic grounds</li>
          <li>Jogging trails</li>
          <li>The Highland Park and Clubhouse</li>
          <li>The Emerald Lake valley</li>
          <li>Basketball and Tennis court</li>
          <li>Children Playground</li>
          <li>Water and Electric facilities</li>
          <li>State of the art communications facilities</li>
          <li>5 Bedroom House for Rent in Maria Luisa Park</li>
        </ul>
      </div>
      <div className="includes">
        <h3>Includes:</h3>
        <ul>
          <li>Living Room with Dining Area</li>
          <li>Kitchen Area</li>
          <li>Master Bedroom with walk-in closet, toilet and bath</li>
          <li>Four (4) Bedrooms each with toilet and bath</li>
          <li>Lanai</li>
          <li>Landscaped Garden</li>
          <li>Maid’s Room</li>
          <li>Service Kitchen</li>
          <li>Service Area</li>
        </ul>
      </div>
      <div className="view-features">
        <h3>Features:</h3>
        <div className="feature-grid">
          <div className="feature-items">
            <input
              type="checkbox"
              id="air-conditioning"
              checked
              readOnly
            />
            <label>Air Conditioning</label>
          </div>
          <div className="feature-items">
            <input type="checkbox" id="laundry-room" checked readOnly />
            <label>Laundry Room</label>
          </div>
          <div className="feature-items">
            <input
              type="checkbox"
              id="open-car-spaces"
              checked
              readOnly
            />
            <label>Open Car Spaces</label>
          </div>
          <div className="feature-items">
            <input type="checkbox" id="balcony" checked readOnly />
            <label>Balcony</label>
          </div>
          <div className="feature-items">
            <input type="checkbox" id="cctv" checked readOnly />
            <label>CCTV</label>
          </div>
          <div className="feature-items">
            <input type="checkbox" id="driver-room" checked readOnly />
            <label>Driver Room</label>
          </div>
          <div className="feature-items">
            <input type="checkbox" id="maid-room" checked readOnly />
            <label>Maid Room</label>
          </div>
          <div className="feature-items">
            <input type="checkbox" id="powder-room" checked readOnly />
            <label>Powder Room</label>
          </div>
          <div className="feature-items">
            <input
              type="checkbox"
              id="landscape-garden"
              checked
              readOnly
            />
            <label>Landscape Garden</label>
          </div>
          <div className="feature-items">
            <input
              type="checkbox"
              id="sports-facilities"
              checked
              readOnly
            />
            <label>Sports Facilities</label>
          </div>
          <div className="feature-items">
            <input
              type="checkbox"
              id="swimming-pool"
              checked
              readOnly
            />
            <label>Swimming Pool</label>
          </div>
          <div className="feature-items">
            <input type="checkbox" id="security" checked readOnly />
            <label>24/7 Security</label>
          </div>
        </div>
      </div>
      
      <div className="property-on-map">
        <h3>Property on Map</h3>
        
      </div>
      <MapComponent/>
      <div className="view-similar-properties">
            <h3>Similar Properties</h3>
            <div className="view-listi-buttons">
                <button className="recommendedactive">Recommended</button>
                <button className="locationbutt" onClick={handleLocationClick}>Location</button>
                <button className="property-type" onClick={handlePropertyTypeClick}>Property Type</button>
                <button className="listing-type" onClick={handleListingTypeClick}>Listing Type</button>
            </div>
        </div>
    </div>
  );
};

export default PreviewListLeftContent;
