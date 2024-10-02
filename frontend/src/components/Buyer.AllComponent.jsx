import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/All.css";
import Card from "./custom/cards/Card";
import property from "../images/Guest/property.png";
import Pagination from "./custom/pagination/Pagination";
import { FooterComponent, CustomMlFooter, ListingSearch, MainLayout, SearchPropertiesSoration } from "../components";
import { GetPropertiesBySaleStatus, GetUnitPhotos } from "../api/GetAllPublicListings";
import { GetPhotoWithUrl, GetPhotoLength } from "../utils/GetPhoto"
import { CapitalizeString, GetPropertyTitle, isPastAMonth } from "../utils/StringFunctions.utils";
import NoListingAvailable from "./custom/custom.NoListingAvailable";

import DefaultPropertyImage from "../asset/fallbackImage.png";
import { GetAllListing } from "../api/GetAllPublicListings";
import { AmountFormatterGroup } from "../utils/AmountFormatter";
import NoDataAvailable from "./NoDataFoundComponent";
import { capitalize } from "@mui/material";

const AllComponent = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [loading, setLoading] = useState(false);
	const [saleType, setSaleType] = useState("sale");

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
			no_of_beds: '',
			property_type: ''
		}
	]);

	const handleCardClick = (id) => {
		navigate(`/previewListing/?id=${id}`, { state: id });
	};

	const getlistings = async (sale_type) => {
		try {
			const res = await GetPropertiesBySaleStatus();

			const dataresp = res.data;

			if (dataresp.length == 0) {
				setPublicListing([])
			} else {

				const listingRes = dataresp.filter((listing) => sale_type == 'all' ? 
					["sale", "rent"].includes(listing.SaleType.toLowerCase()) : [sale_type].includes(listing.SaleType.toLowerCase())
				);

				if (listingRes.length !== 0) {
					const newListing = await Promise.all(listingRes.map(async (item, i) => {

						const getPhotoGallery = await GetUnitPhotos(item.id);

						const gallery = getPhotoGallery.data;

						const image = GetPhotoWithUrl(item.Photo);

						return {
							id: item.id,
							title: CapitalizeString(item.UnitName),
							price: AmountFormatterGroup(item.Price),
							status: `For ${CapitalizeString(item.SaleType)}`,
							pics: image ? gallery.length + 1 : 0,
							img: image,
							no_of_bathrooms: item.BathRooms,
							lot: item.LotArea,
							property_no: item.PropertyNo,
							isFeatured: item.IsFeatured,
							sale_type: CapitalizeString(item.SaleType),
							no_of_beds: item.BedRooms,
							property_type: item.PropertyType
						}
					}))
					setPublicListing(newListing);

				} else {
					setPublicListing([]);
				}

			}
		} catch (error) {
			console.error("Error fetching public listings:", error);
			setPublicListing([]);
		}

	}

	useEffect(() => {
		// allPublicListing()
		// getlistings()
		const search = location.search;
		console.log(search);

		const queryParams = new URLSearchParams(search);
		const getSaleType = queryParams.get("sale_type");
		
		if (queryParams.size !== 0) {

			getlistings(getSaleType);
			setSaleType(getSaleType);
		} else {
			getlistings('all');
			setSaleType('Rent/Sale');
		}

	}, [])

	const indexOfLastCard = currentPage * cardsPerPage;
	const indexOfFirstCard = indexOfLastCard - cardsPerPage;
	const currentCards = publiclisting.slice(indexOfFirstCard, indexOfLastCard);

	const totalPages = Math.ceil(publiclisting?.length / cardsPerPage);
	return (
		<div className="all-container">
			<div className="all-searchcomponent">
				<ListingSearch />
			</div>
			<div className="all-page-container">
				<span className="all-h1">Properties For {capitalize(saleType)}</span>
				{
					currentCards.length !== 0 ? (
						<>
							<SearchPropertiesSoration properties_count={publiclisting.length} current_properties_count={currentCards.length}/>
							<div className="card-container">
								{
									currentCards.map((data, index) => (
										<Card
											key={index}
											id={data.id}
											title={data.title}
											price={`PHP ${data.price}`}
											imgSrc={data.img}
											beds={data.no_of_beds}
											baths={data.no_of_bathrooms}
											size={data.lot}
											likes={data.pics}
											forsale={data.status}
											subtitle={`${CapitalizeString(data.property_type)} For ${CapitalizeString(data.sale_type)}`}
											handleClick={() => handleCardClick(data.property_no)}
										/>
									))

								}
							</div>
						</>
					)
						:
						<NoDataAvailable
							message={`No available properties for Rent/Sale`}
						/>
				}

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
