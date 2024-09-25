import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/All.css";
import Card from "./custom/cards/Card";
import property from "../images/Guest/property.png";
import Pagination from "./custom/pagination/Pagination";
import { FooterComponent, CustomMlFooter, ListingSearch, MainLayout, SearchPropertiesSoration } from "../components";
import { GetPropertiesBySaleStatus } from "../api/GetAllPublicListings";
import {GetPhotoWithUrl, GetPhotoLength} from "../utils/GetPhoto"
import { AmountFormatterGroup } from "../utils/AmountFormatter";
import { CapitalizeString } from "../utils/StringFunctions.utils";

const AllComponent = () => {
  const navigate = useNavigate();

  const [publiclisting, setPublicListing] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  
  const handleCardClick = (id) => {
    console.log("id",id);
    // window.location.href = `/previewListing/${id}`;
    navigate(`/previewListing/${id}`, { state: id });
  };
  
  const allPublicListing = async () =>{
    const res = await GetPropertiesBySaleStatus();
    const dataresp = res.data
    setPublicListing(dataresp);
    console.log("public listing:", dataresp)

  }
// console.log( GetPhotoWithUrl())
console.log( "getlength", GetPhotoLength())

  useEffect (() => {
    allPublicListing()
  }, [])

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = publiclisting.slice(indexOfFirstCard, indexOfLastCard);


  const totalPages = Math.ceil(publiclisting.length / cardsPerPage);
  return (
    <div className="all-container">
        <div className="all-searchcomponent">
          <ListingSearch />
        </div>
      <div className="all-page-container">
        <span className="all-h1">For Sale/Rent</span>
        <SearchPropertiesSoration/>
        <div className="card-container">
          {currentCards.map((data, index) => (
            <Card
            key={index}
            id= {data.PropertyNo}
            title={data.UnitName}
            price={`PHP ${AmountFormatterGroup(data.Price)}`}
            imgSrc={GetPhotoWithUrl(data.Photo)}
            beds={data.BedRooms}
            baths={data.BathRooms}
            size={data.LotArea}
            likes={0}
            forsale={CapitalizeString(data.SaleType)}
            subtitle={`${data.PropertyType} For ${CapitalizeString(data.SaleType)}`}
            handleClick={() => handleCardClick(data.PropertyNo)}
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
  );
};

export default AllComponent;
