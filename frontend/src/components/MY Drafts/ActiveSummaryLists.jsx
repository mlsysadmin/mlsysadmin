import React, {useState} from "react";
import { Link } from "react-router-dom";
import { faPlay, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlay } from '@fortawesome/react-fontawesome';
import "../../styles/ActiveSummaryLists.css";

// Components
// import Navigation from "../layout/NavigationComponent";
import Sidebar from "./Components/DraftSidebarComponent";
import Footer from "./Components/FooterComponent";





// Sample data for listings




const ActiveInactive = () => {
  const [listings] = useState([
    {
      date: "2024-06-18",
      propertyId: "P001",
      propertyType: "Apartment",
      type: "Residential",
      floorArea: "1200 sq ft",
      price: "$300,000",
      location: "New York",
      status: "Active",
      action: [ "Tag Sold"],
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
      action: [ "Tag Sold"],
    },
    // Add more listings as needed
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  
  const openModal = (listing) => {
    setSelectedListing(listing);
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedListing(null);
  };
  
  const handleTagSold = () => {
    // Logic to tag the property as sold
    closeModal();
    setSuccessModalIsOpen(true);
  };

  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
  };
  
  return (
    <div>
      {/* <Navigation /> */}
      <div
        className="active-contentContainer"
        style={{ display: "flex", width: "100%", gap: "1rem" }}
      >
        <div className="side-bar" >
          <Sidebar />
        </div>
        {/* <div className="listing-table-wrapper"> */}
          <div className="active-container">
            <div className="active-header-section">
              <div className="tabs">
                <Link to="/listing-summary-lists">
                  <div className="new-button">Listings</div>
                </Link>
                <Link to="/clientmanagement">
                  <div className="new-button">Client Management</div>
                </Link>
              </div>
              <div className="active-search-section">
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
          <button className="tag-sold-button" onClick={() => openModal(listing)}>Tag Sold</button>
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
            <li className="page-item"><a className="page-link" href="/listing-summary-lists">2</a></li>
            <li className="page-item"><a className="page-link" href="/active-summary-lists">3</a></li>
            <li className="page-item">
              <a className="page-link" href="/sold-properties">
                <FontAwesomeIcon icon={faPlay} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <Footer />
      <div>
      {/* Example button to open the modal */}
      <button onClick={() => openModal('Listing 1')}>Open Modal for Listing 1</button>

      {modalIsOpen && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <h2>Confirmation Message</h2>
            <p>Are you sure you want to tag this property as sold?</p>
            <div className="tagsold-confirm-buttons">
              <button className="confirm-button" onClick={closeModal}>Cancel</button>
              <button className="confirm-button-tag" onClick={handleTagSold}>Tag Sold</button>
            </div>
          </div>
        </div>
      )}

      {successModalIsOpen && (
        <div className="custom-modal-overlay">
          <div className="sold-success-modal">
            <h2 className="sold-message">Successful Message</h2>
            <p>Property sold successfully.</p>
            <button className="sold-success-button" onClick={closeSuccessModal}>Close</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default ActiveInactive;
