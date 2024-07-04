import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import SidebarComponent from "./Components/DraftSidebarComponent";
import Footer from "./Components/FooterComponent";
// import Navigation from "../layout/NavigationComponent";
import "../../styles/Soldproperties.css"; // Import the CSS file




const SoldProperties = () => {
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
      datesold: "03/14/2024",
      
    },
    {
      date: "03-11-2024",
      propertyId: "ODFASHUENOPS",
      propertyType: "Condominium",
      type: "For Sale",
      floorArea: "30 sqm",
      price: "5,000,000",
      location: "Mandaue City, Cebu",
      status: "Draft",
      datesold: "03/14/2024",
      
    },
  ]);

  return (
    
    <div>
      <div>
        {/* <Navigation /> */}
        <div className="contentContainer" style={{ display: "flex", width: "100%", gap: "1rem" }}>
          <div className="sidebar" style={{ width: "15%", padding: "none" }}>
            <SidebarComponent />
          </div>
          <div className="list" style={{ display: "flex", flexDirection: "column", width: "80%", gap: "0.5rem" }}>
            {/* <div className="listingsTableWrapper"> */}
              <div className="sold-properties-container">
                <div className="headerSection">
                  <div className="sold-properties-tabs">
                    <Link to="/listing-summary-lists">
                      <div className="newButton">
                        Listings
                      </div>
                    </Link>
                    <Link to="/clientmanagement">
                      <div className="newButton">
                        Client Management
                      </div>
                    </Link>
                  </div>
                  <div className="searchSection">
                    <select className="dropdown">
                      <option>Show entries</option>
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                      <option>100</option>
                    </select>
                    <div className="srchInputContainer">
                      <div className="wrappsearch">
                      <FontAwesomeIcon icon={faSearch} className="searchIcons" />
                      <input type="text" placeholder="Search Property" className="searchInpt" />
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
                      <th>Date Sold</th>
                    
                    </tr>
                  </thead>
                  
                  <tbody>
                    
                    {listings.map((listing, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'even' : ''}>
                        <td>
                          <button className="showDetailsButton">Show Details</button>
                        </td>
                        <td>{listing.date}</td>
                        <td>{listing.propertyId}</td>
                        <td>{listing.propertyType}</td>
                        <td>{listing.type}</td>
                        <td>{listing.floorArea}</td>
                        <td>{listing.price}</td>
                        <td>{listing.location}</td>
                        <td>{listing.status}</td>
                        <td>{listing.datesold}</td>
                        <td>
                          
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            {/* </div> */}
          </div>
        </div>
      </div>
      
      <div className="d-flex justify-content-end" style={{ marginLeft: '85%', marginTop: '10%' }}>
        <nav className="paginationContainer" aria-label="Page navigation example">
          <ul className="paginationList">
            <li className="pageItem"><a className="page-link active" href="/drafts">1</a></li>
            <li className="pageItem"><a className="page-link" href="/listing-summary-lists">2</a></li>
            <li className="pageItem"><a className="page-link" href="active-summary-lists">3</a></li>
            <li className="pageItem">
              <a className="page-link" href="sold-properties">
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

export default SoldProperties;
