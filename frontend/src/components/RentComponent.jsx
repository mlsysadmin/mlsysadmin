import React from "react";
import "../styles/rent.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CameraFilled,
  HeartOutlined,
  ControlOutlined,
} from "@ant-design/icons";
import Card from "./custom/cards/Card";
import property from "../images/Guest/property.png";
import Pagination from "./custom/pagination/Pagination";
import { FooterComponent, CustomMlFooter, ListingSearch, MainLayout, SearchPropertiesSoration } from "../components";
import {GetPropertiesBySaleStatus} from "../api/GetAllPublicListings";
import {GetPhotoWithUrl, GetPhotoLength} from "../utils/GetPhoto";

const RentComponent = () => {
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
		<div className="rent">
			<div className="topbar">
				<ListingSearch />
			</div>
			<div className="rentContainer">
					<span className="rent-h1">Properties for Rent</span>
					
					<SearchPropertiesSoration />
					<div className="card-container">
						{currentCards.map((data, index) => (
							<Card
								key={index}
								id={data.listings.listing_id}
								title={data.listings.title}
								price={`PHP${data.listings.unit_details.price}`}
								imgSrc={GetPhotoWithUrl(data.listings.photos.photo)}
								beds={data.listings.unit_details.no_of_beds}
								baths={data.listings.unit_details.no_of_bathrooms}
								size={data.listings.unit_details.lot_area}
								likes={GetPhotoLength(data.listings.photos.photo)}
								forsale={
									data.listings.listing_type.listing_type === "For Sale"
										? "FOR RENT"
										: data.listings.listing_type.listing_type
								}
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
	);
}

export default RentComponent;
