import React from "react";
import { Link } from "react-router-dom";
import { faPlay, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlay } from '@fortawesome/react-fontawesome';
import "../../styles/Active-Inactive.css";

// Components
import Navigation from "../layout/NavigationComponent";
import Sidebar from "../MY Drafts/Components/SidebarComponent";
import Footer from "../MY Drafts/Components/FooterComponent";

// Sample data for listings
const listings = [
  {
    date: "2024-06-18",
    propertyId: "P001",
    propertyType: "Apartment",
    type: "Residential",
    floorArea: "1200 sq ft",
    price: "$300,000",
    location: "New York",
    status: "Active",
    action: ["Inactive", "Tag Sold"],
  },
  {
    date: "2024-06-17",
    propertyId: "P002",
    propertyType: "Villa",
    type: "Luxury",
    floorArea: "3000 sq ft",
    price: "$900,000",
    location: "Los Angeles",
    status: "Inactive",
    action: ["Active", "Tag Sold"],
  },
  // Add more listings as needed
];

const ActiveInactive = () => {
  return (
    <div>
      <Navigation />
      <div
        className="contentContainer"
        style={{ display: "flex", width: "100%", gap: "1rem" }}
      >
        <div className="side-bar" >
          <Sidebar />
        </div>
        {/* <div className="listing-table-wrapper"> */}
          <div className="container">
            <div className="header-section">
              <div className="tabs">
                <Link to="/listingsapproval">
                  <div className="new-button">Listings</div>
                </Link>
                <Link to="/clientmanagement">
                  <div className="new-button">Client Management</div>
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
                <div className="searchInputCont">
                  <div className="srchwrapp">
                  <FontAwesomeIcon className="searchico" icon={faSearch} />
                  <input
                    type="text"
                    className="searchinT"
                    placeholder="Search Property"
                  />
                  </div>
                </div>
              </div>
            </div>
            <table className="table">
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing, index) => (
                  <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                    <td>
                      <button className="show-details-button">
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
                    <td>{listing.status}</td>
                    <td>
                      <div className="action-buttons">
                        {listing.action.map((action, actionIndex) => (
                          <button key={actionIndex} className="action-button">
                            {action}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        {/* </div> */}
        <div />
      </div>
      <div className="d-flex justify-content-end" style={{ marginLeft: '85%', marginTop: '10%' }}>
        <nav className="pagination-container" aria-label="Page navigation example">
          <ul className="pagination-list">
            <li className="page-item"><a className="page-link active" href="/drafts">1</a></li>
            <li className="page-item"><a className="page-link" href="/listingsApproval">2</a></li>
            <li className="page-item"><a className="page-link" href="/active-inactive">3</a></li>
            <li className="page-item">
              <a className="page-link" href="/sold-properties">
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

export default ActiveInactive;
