import React, { useState, useEffect } from "react";
import Dummydata from "../../supportDummyData/openListingDummy.json";
import "../../styles/SupportListingMasterlist.css";
import Pagination from "./custom.pagination";
import bin from '../../icons/bin.png';
import edit from '../../icons/edit.png';

const SupportDisapproveListingMasterlist = () => {
  const [activeTab, setActiveTab] = useState("disapproved");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredListings, setFilteredListings] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const listings = Dummydata[`${activeTab}_listings`] || [];
    const filtered = listings.filter((listing) =>
      listing.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredListings(filtered);
  }, [activeTab, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when search term changes
  };

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAllChecked(isChecked);
    const updatedFilteredListings = filteredListings.map((listing) => ({
      ...listing,
      selected: isChecked,
    }));
    setFilteredListings(updatedFilteredListings);
  };

  const handleCheckboxChange = (event, listingId) => {
    const isChecked = event.target.checked;
    const updatedFilteredListings = filteredListings.map((listing) =>
      listing.listing_id === listingId
        ? { ...listing, selected: isChecked }
        : listing
    );
    setFilteredListings(updatedFilteredListings);
  };

  const handleEntriesChange = (event) => {
    const value = parseInt(event.target.value);
    setEntriesPerPage(value);
    setCurrentPage(1); // Reset to the first page when entries per page changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderListings = (listings) => {
    const indexOfLastItem = currentPage * entriesPerPage;
    const indexOfFirstItem = indexOfLastItem - entriesPerPage;
    const currentListings = listings.slice(indexOfFirstItem, indexOfLastItem);

    if (currentListings.length === 0) {
      return (
        <tr>
          <td colSpan="11" className="text-center">
            <center>No results found</center>
          </td>
        </tr>
      );
    }

    return currentListings.map((listing) => (
      <tr key={listing.listing_id}>
        <td>
          <input
            type="checkbox"
            checked={listing.selected || false}
            onChange={(e) => handleCheckboxChange(e, listing.listing_id)}
          />
        </td>
        <td>
          <button className="showDetails">Show Details</button>
        </td>
        <td>{listing.date_created}</td>
        <td>{listing.title}</td>
        <td>{listing.property_type}</td>
        <td>{listing.listing_type}</td>
        <td>{listing.floor_area} sqm</td>
        <td>{listing.price}</td>
        <td>{listing.location}</td>
        <td>{listing.status}</td>
        <td><img src={edit} alt="edit" /> <img src={bin} alt="bin" /></td>
      </tr>
    ));
  };

  return (
    <div className="listings-container">
      <div className="menu">
        <h1>Manage Disapproved Listings</h1>
      </div>
      <hr style={{ border: "#D90000 solid 1px", width: "95%" }} />
      <div className="controls">
        <div className="entries">
          <label>Show Entries</label>
          <select value={entriesPerPage} onChange={handleEntriesChange}>
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
          </select>
        </div>
        <div className="searchbar">
          <p>Search</p>
          <input type="text" value={searchTerm} onChange={handleSearchChange} />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAllChecked}
                onChange={handleSelectAllChange}
              />
            </th>
            <th>Select</th>
            <th>Date Created</th>
            <th>Title</th>
            <th>Property Type</th>
            <th>Listing Type</th>
            <th>Floor Area</th>
            <th>Price</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderListings(filteredListings)}</tbody>
      </table>
      <div className="btns">
      <div></div>
        <Pagination
          totalItems={filteredListings.length}
          itemsPerPage={entriesPerPage}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default SupportDisapproveListingMasterlist;
