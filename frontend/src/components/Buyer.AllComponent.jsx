import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/All.css";
import Card from "./custom/cards/Card";
import property from "../images/Guest/property.png";
import Pagination from "./custom/pagination/Pagination";
import { FooterComponent, CustomMlFooter, ListingSearch, MainLayout, SearchPropertiesSoration } from "../components";
import { GetPropertiesBySaleStatus } from "../api/GetAllPublicListings";
import {GetPhotoFromDB, GetPhotoLength} from "../utils/GetPhoto"
import NoListingAvailable from "./custom/custom.NoListingAvailable";

import DefaultPropertyImage from "../asset/fallbackImage.png";
import { GetAllListing } from "../api/GetAllPublicListings";
import { AmountFormatterGroup } from "../utils/AmountFormatter";

const AllComponent = () => {
  const navigate = useNavigate();
const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  const [publiclisting, setPublicListing] = useState([
		{
			id: 0,
			title: "",
			price: 0,
			status: "",
			pics: 0,
			img: DefaultPropertyImage,
			no_of_bathrooms: 0,
			lot: 0,
			property_no: "",
		},
	]);

  
  const handleCardClick = (propertyNo) => {
		console.log("id", propertyNo);
		// window.location.href = `/previewListing/${id}`;
		navigate(`/previewListing/?id=${propertyNo}`, { state: propertyNo });
	};
  
const getlistings = async () =>{
   try {
			const res = await GetPropertiesBySaleStatus();
			const dataresp = res.data;

			if (dataresp && dataresp.length > 0) {
				setPublicListing(dataresp);
				console.log("public listing:", dataresp);
			} else {
				setPublicListing([]);
				console.log("No listings found.");
			}
		} catch (error) {
			console.error("Error fetching public listings:", error);
			setPublicListing([]);
		}
  
}
 
// console.log( GetPhotoFromDB())
console.log( "getlength", GetPhotoLength())

  useEffect (() => {
    // allPublicListing()
    getlistings()
  }, [])

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = publiclisting?.slice(indexOfFirstCard, indexOfLastCard);


  const totalPages = Math.ceil(publiclisting?.length / cardsPerPage);
  return (
		<div className="all-container">
			<div className="all-searchcomponent">
				<ListingSearch />
			</div>
			<div className="all-page-container">
				<span className="all-h1">For Sale/Rent</span>
				<SearchPropertiesSoration />

				<div className="card-container">
					{currentCards.length > 0 ? (
						currentCards.map((item, index) => (
							<Card
								title={`${item.ProjectName} - (${item.UnitName})`}
								subtitle={item.PropertyType}
								price={`PHP ${AmountFormatterGroup(item.Price)}`}
								status={item.SaleType}
								pics={
									GetPhotoFromDB(item.Photo)
										? GetPhotoLength(item.id) + 1
										: GetPhotoLength(item.id)
								}
								img={GetPhotoFromDB(item.Photo)}
								no_of_bathrooms={item.BathRooms}
								lot={item.LotArea}
								bed={item.BedRooms}
								key={index}
								loading={loading}
								handleClick={() => handleCardClick(item.PropertyNo)}
							/>
						))
					) : (
						<NoListingAvailable/>
					)}
				</div>

				{currentCards.length > 0 && (
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						paginate={setCurrentPage}
					/>
				)}
			</div>

			<CustomMlFooter />
			<FooterComponent />
		</div>
	);
};

export default AllComponent;
