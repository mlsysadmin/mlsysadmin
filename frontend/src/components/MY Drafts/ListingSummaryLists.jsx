import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Sidebar from "./Components/DraftSidebarComponent";
import Footer from "./Components/FooterComponent";
import { Link } from 'react-router-dom'; 
// import Navigation from "../layout/NavigationComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSearch } from '@fortawesome/free-solid-svg-icons';
import '../../styles/ListingsSummaryLists.css';  // Import the CSS file

const ListingsSummaryLists = () => {
  const [listings] = useState([
    {
      date: "03-11-2024",
      propertyId: "11X8NBSADAFO",
      propertyType: "Condominium",
      type: "For Sale",
      floorArea: "30 sqm",
      price: "5,000,000",
      location: "Mandaue City, Cebu",
      status: "Processing",
    },
    {
      date: "04-15-2024",
      propertyId: "LKJHGFDSAREW",
      propertyType: "House",
      type: "For Sale",
      floorArea: "200 sqm",
      price: "12,000,000",
      location: "Cebu City, Cebu",
      status: "Processing",
    },
    {
      date: "05-01-2024",
      propertyId: "QWERTYUIOP",
      propertyType: "Apartment",
      type: "For Rent",
      floorArea: "60 sqm",
      price: "20,000",
      location: "Cebu City, Cebu",
      status: "Denied",
    },
  ]);

  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const handleShowDetailsClick = (status) => {
    if (status === 'Processing') {
      navigate('/show-details-processing');
    } else if (status === 'Denied') {
      navigate('/show-details-denied');
    } else {
      navigate('/show-details-default'); // Fallback route
    }
  };

  return (
    <div>
      <div className="contentContainer" style={{ display: "flex", width: "100%", gap: "1rem" }}>
        <div className="summary-sidebar" style={{ width: "15%", padding: "none" }}>
          <Sidebar />
        </div>
        <div className="list" style={{ display: "flex", flexDirection: 'column', width: "100%", gap: "0.5rem" }}>
          <div className="listings-summary-container">
            <div className="listings-summary-header-section">
              <div className="listings-summary-tabs">
                <Link to="/listing-summary-lists">
                  <div className="listings-summary-button">
                    Listings
                  </div>
                </Link>
                <Link to="/clientmanagement">
                  <div className="listings-summary-button">
                    Client Management
                  </div>
                </Link>
              </div>
              <div className="search-section">
                <select className="dropdown">
                  <option>Show entries</option>
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
                <div className="search-inp-container">
                <div className="searchwrapper">
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                  <input type="text" className="search-Inputss" placeholder="Search Property" />
                  </div>
                </div>
              </div>                  
            </div>
            <table className="listing-summary-table">
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
                  <tr key={index}>
                    <td>
                      <button 
                        className="listings-summary-show-details-button" 
                        onClick={() => handleShowDetailsClick(listing.status)}>
                        Show Details
                      </button>
                    </td>
                    <td>{listing.date}</td>
                    <td>{listing.propertyId}</td>
                    <td>{listing.propertyType}</td>
                    <td>{listing.type}</td>
                    <td>{listing.floorArea}</td>
                    <td>{listing.price}</td>
                    <td>{listing.location}</td>
                    <td className={`status-cell ${listing.status.toLowerCase()}`}>
                      {listing.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end" style={{ marginLeft: '85%', marginTop: '10%' }}>
        <nav className="pagination-container" aria-label="Page navigation example">
          <ul className="pagination-list">
            <li className="page-item"><a className="page-link active" href="/drafts">1</a></li>
            <li className="page-item"><a className="page-link" href="/listing-summary-lists">2</a></li>
            <li className="page-item">
              <a className="page-link" href="/active-summary-lists">
                <FontAwesomeIcon icon={faPlay} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <Footer />
    </div>
  );
};

export default ListingsSummaryLists;

