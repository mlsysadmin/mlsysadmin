import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/All.css";
import Card from "./custom/cards/Card";
import property from "../images/Guest/property.png";
import Pagination from "./custom/pagination/Pagination";
import { FooterComponent, CustomMlFooter, ListingSearch, MainLayout, SearchPropertiesSoration } from "../components";
import { GetPropertiesBySaleStatus } from "../api/GetAllPublicListings";
import { GetPhotoWithUrl, GetPhotoLength } from "../utils/GetPhoto"
import { CapitalizeString, GetPropertyTitle, isPastAMonth } from "../utils/StringFunctions.utils";
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
			property_no: '',
			isFeatured: '',
			sale_type: '',
			property_type: '',
			no_of_beds: ''
		}
	]);


	const handleCardClick = (propertyNo) => {
		console.log("id", propertyNo);
		// window.location.href = `/previewListing/${id}`;
		navigate(`/previewListing/?id=${propertyNo}`, { state: propertyNo });
	};

	const getlistings = async () => {
		try {
			const res = await GetPropertiesBySaleStatus();

			const dataresp = res.data;

			const listing = dataresp.filter((listing) => !isPastAMonth(listing.created_at)).map((item, i) => {

				console.log('listing', item);

				const getLength = GetPhotoLength(item.id);

				const image = GetPhotoWithUrl(item.Photo);

				return {
					id: item.id,
					title: GetPropertyTitle(item.ProjectName, item.UnitName),
					price: AmountFormatterGroup(item.Price),
					status: "New",
					pics: image ? getLength + 1 : getLength,
					img: image,
					no_of_bathrooms: item.BathRooms,
					lot: item.LotArea,
					property_no: item.PropertyNo,
					isFeatured: "yes",
					sale_type: CapitalizeString(item.SaleType),
					no_of_beds: item.BedRooms,
					property_type: item.PropertyType
					// isFeatured: item.IsFeatured
				}
			});
		} catch (error) {
			console.error("Error fetching public listings:", error);
			setPublicListing([]);
		}

	}

	// console.log( GetPhotoFromDB())
	console.log("getlength", GetPhotoLength())

	useEffect(() => {
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
								title={item.title}
								subtitle={`${CapitalizeString(item.property_type)} For ${CapitalizeString(item.sale_type)}`}
								price={`PHP ${AmountFormatterGroup(item.price)}`}
								status={item.sale_type}
								pics={item.pics}
								img={item.img}
								no_of_bathrooms={item.no_of_bathrooms}
								lot={item.lot}
								bed={item.no_of_beds}
								key={index}
								loading={loading}
								handleClick={() => handleCardClick(item.property_no)}
							/>
						))
					) : (
						<NoListingAvailable />
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
