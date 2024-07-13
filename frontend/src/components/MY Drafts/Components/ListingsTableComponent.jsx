import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../../styles/ListingsTableComponent.css";

const ListingsTable = () => {
  const [listings] = useState([
    {
      date: "03-11-2024",
      propertyId: "11X8NBSADAFO",
      propertyType: "Condominium",
      type: "For Sale",
      floorArea: "30 sqm",
      price: "5,000,000",
      location: "Mandaue City, Cebu",
      status: "Draft",
      action: ["Edit"],
    },
    {
      date: "03-11-2024",
      propertyId: "11X8NBSADAFO",
      propertyType: "Condominium",
      type: "For Sale",
      floorArea: "30 sqm",
      price: "5,000,000",
      location: "Mandaue City, Cebu",
      status: "Draft",
      action: ["Edit"],
    },
    {
      date: "03-11-2024",
      propertyId: "11X8NBSADAFO",
      propertyType: "Condominium",
      type: "For Sale",
      floorArea: "30 sqm",
      price: "5,000,000",
      location: "Mandaue City, Cebu",
      status: "Draft",
      action: ["Edit"],
    },
    {
      date: "03-11-2024",
      propertyId: "11X8NBSADAFO",
      propertyType: "Condominium",
      type: "For Sale",
      floorArea: "30 sqm",
      price: "5,000,000",
      location: "Mandaue City, Cebu",
      status: "Draft",
      action: ["Edit"],
    },
    {
      date: "03-11-2024",
      propertyId: "11X8NBSADAFO",
      propertyType: "Condominium",
      type: "For Sale",
      floorArea: "30 sqm",
      price: "5,000,000",
      location: "Mandaue City, Cebu",
      status: "Draft",
      action: ["Edit"],
    },
    

    // Add more listings as needed
  ]);

  return (
    <div>
      <div className="listings-table-container">
        <div className="listings-table-header-section">
          <div className="tabs-listings-table">
            <Link to="/listing-summary-lists">
              <div className="table-header-button">Listings</div>
            </Link>
            <Link to="/clientmanagement">
              <div className="table-header-button">Client Management</div>
            </Link>
          </div>
          <div className="listsum-search-section">
            <select className="dropdown">
              <option>Show entries</option>
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <div className="search-input-container">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search Property"
                />
                <FontAwesomeIcon className="search-icon" icon={faSearch} />
              </div>
            </div>
          </div>
        </div>
        <div className="listings-whole-table">
        <table className="listings-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Date</th>
              <th>Property ID</th>
              <th>Property Type</th>
              <th>Type</th>
              <th>Floor Area</th>
              <th>Price</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing, index) => (
              <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                <td>
                  <button className="listings-show-details-button">Show Details</button>
                </td>
                <td>{listing.date}</td>
                <td>{listing.propertyId}</td>
                <td>{listing.propertyType}</td>
                <td>{listing.type}</td>
                <td>{listing.floorArea}</td>
                <td>{listing.price}</td>
                <td>{listing.location}</td>
                <td>{listing.status}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      <div className="d-flex justify-content-end" style={{ marginLeft: "85%", marginTop: "10%" }}>
        <nav aria-label="Page navigation example" className="pagination-container">
          <ul className="pagination-list">
            <li className="page-item">
              <a className="page-link active" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="/listing-summary-lists">
                <FontAwesomeIcon icon={faPlay} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ListingsTable;
