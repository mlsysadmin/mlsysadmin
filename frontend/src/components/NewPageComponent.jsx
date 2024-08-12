import React, { useEffect, useState } from "react";
import "../styles/newpage.css";
import { useNavigate } from "react-router-dom";
import { FooterComponent, CustomMlFooter, MainLayout } from "../components";
import Card from "./custom/cards/Card";
import Pagination from "./custom/pagination/Pagination";
import { Dropdown, Menu, Space } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { cardData } from "../utils/ListingMockData";

import property from "../images/Guest/property.png";
import ListingSearch from "./custom/customsearch/custom.listingsearch";
import { GetAllPublicListing } from "../api/GetAllPublicListings";
import { GetPhotoFromDB, GetPhotoLength } from "../utils/GetPhoto";

const NewPageComponent = () => {
  const navigate = useNavigate();
  const [publiclisting, setPublicListing] = useState([]);

  const handleCardClick = (id) => {
    console.log("id", id);
    // window.location.href = `/previewListing/${id}`;
    navigate(`/previewListing/${id}`, { state: id });
  };

  const allPublicListing = async () => {
    const res = await GetAllPublicListing();
    const dataresp = res.data;
    setPublicListing(dataresp);
    console.log("public listing:", dataresp);
  };
  // console.log( GetPhotoFromDB())
  console.log("getlength", GetPhotoLength());

  useEffect(() => {
    allPublicListing();
  }, []);

  // most relevant na Dropdown
  const [selectedSort, setSelectedSort] = useState('Most relevant');

  const handleMenuClick = (e) => {
    setSelectedSort(e.key); // Update the selected sort option based on the clicked item
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Most relevant">Most relevant</Menu.Item>
      <Menu.Item key="New Listings">New Listings</Menu.Item>
      <Menu.Item key="Old Listings">Old Listings</Menu.Item>
      <Menu.Item key="Highest Price">Highest Price</Menu.Item>
      <Menu.Item key="Lowest Price">Lowest Price</Menu.Item>
      <Menu.Item key="Order Title A-Z">Order Title A-Z</Menu.Item>
      <Menu.Item key="Order Title Z-A">Order Title Z-A</Menu.Item>
    </Menu>
  );



  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = publiclisting.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(cardData.length / cardsPerPage);
  return (
    <div className="newpage">
      <div className="newpage-container">
        <div className="newpage-contents">
          <ListingSearch />
          <div className="second-content">
            <h1 className="new-page-label">New Properties</h1>

        
            <div className="sort">
            {/* <span>Showing 2 to 2 our of 100 entries </span> */}
      <Dropdown overlay={menu}>
        <Space>
          Sort: {selectedSort}
          <CaretDownOutlined />
        </Space>
      </Dropdown>
    </div>
            <div className="card-container">
              {currentCards.map((data, index) => (
                <Card
                  key={index}
                  id={data.listings.listing_id}
                  title={data.listings.title}
                  price={`PHP${data.listings.unit_details.price}`}
                  imgSrc={GetPhotoFromDB(data.listings.photos.photo)}
                  beds={data.listings.unit_details.no_of_beds}
                  baths={data.listings.unit_details.no_of_bathrooms}
                  size={data.listings.unit_details.lot_area}
                  likes={GetPhotoLength(data.listings.photos.photo)}
                  forsale={data.listings.listing_type.listing_type}
                  subtitle={`${data.listings.property_type.subtype} ${data.listings.listing_type.listing_type}`}
                  handleClick={() => handleCardClick(data.listings.listing_id)}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={setCurrentPage}
            />
          </div>
          <CustomMlFooter />
          <FooterComponent />
        </div>
      </div>
    </div>
  );
};
export default NewPageComponent;
