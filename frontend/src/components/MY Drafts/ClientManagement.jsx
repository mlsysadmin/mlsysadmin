import React from "react";
import Sidebar from "./Components/DraftSidebarComponent";
import Footer from "./Components/FooterComponent";
import { Link } from "react-router-dom";
// import NavigationHeader from "../layout/NavigationComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faStar, faHeart, faList, faEye, faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../styles/ClientManagement.css";

const ClientManagement = () => {
  return (
    <div>
      <div>
        {/* <NavigationHeader /> */}
        <div className="contentContainer" style={{ display: "flex", width: "100%", gap: "1rem" }}>
          <div className="sidebar" style={{ width: "15%", padding: "none" }}>
            <Sidebar />
          </div>
          <div className="list" style={{ display: "flex", flexDirection: "column", width: "80%", gap: "0.5rem" }}>
            {/* <div className="listingsTableWrapper"> */}
              <div className="client-management-container">
                <div className="headerSection">
                  <div className="tabs">
                    <Link to="/listing-summary-lists">
                      <div className="newButton">Listings</div>
                    </Link>
                    <Link to="/clientmanagement">
                      <div className="newButton">Client Management</div>
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
                    <div className="srchIntContnr">
                      <div className="srchwrapps">
                      <FontAwesomeIcon icon={faSearch} className="srchIcony" />
                      <input type="text" placeholder="Search Property" className="searchsInput" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            {/* </div> */}
            <section className="overviewSection">
              <h2 className="overviewTitle">OVERVIEW</h2>
              <p>Listing Count & Highlight</p>
              <div className="overviewStats">
                <div className="statBox">
                  <div className="statIcon">
                    <FontAwesomeIcon icon={faHome} />
                  </div>
                  <div className="statNumber">0</div>
                  <div className="statLabel">Property Sold</div>
                </div>
                <div className="statBox">
                  <div className="statIcon">
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                  <div className="statNumber">0</div>
                  <div className="statLabel">Highlighted</div>
                </div>
                <div className="statBox">
                  <div className="statIcon">
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                  <div className="statNumber">0</div>
                  <div className="statLabel">Listing Saves</div>
                </div>
                <div className="statBox">
                  <div className="statIcon">
                    <FontAwesomeIcon icon={faList} />
                  </div>
                  <div className="statNumber">0</div>
                  <div className="statLabel">Active Listing</div>
                </div>
                <div className="statBox">
                  <div className="statIcon">
                    <FontAwesomeIcon icon={faEye} />
                  </div>
                  <div className="statNumber">0</div>
                  <div className="statLabel">Total Views</div>
                </div>
              </div>
            </section>
            <div className="performanceSection">
              <h2 className="performanceTitle">PERFORMANCE</h2>
              <div className="performanceStats">
                <div className="performanceBox">
                  <div className="performanceLabel">Potential Sales Opportunities</div>
                  <div className="performanceNumber">₱ 0</div>
                  <p>Potential Sales Opportunities is derived from the sum of the prices of the properties your clients are interested at.</p>
                </div>
                <div className="performanceBox">
                  <div className="performanceLabel">Potential Commission</div>
                  <div className="performanceNumber">₱ 0</div>
                  <p>Potential Commission is the potential profit you'll make when you close the deals with your clients.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClientManagement;
