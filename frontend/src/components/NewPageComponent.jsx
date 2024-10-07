import React, { useEffect, useState } from "react";
import "../styles/newpage.css";
import { useNavigate } from "react-router-dom";
import { FooterComponent, CustomMlFooter, MainLayout } from "../components";
import Card from "./custom/cards/Card";
import { SearchPropertiesSoration } from "../components";
import Pagination from "./custom/pagination/Pagination";
import SortDropdown from "../components/SortDropdownComponent"; // Ensure this path is correct
import { Dropdown, Menu, Space } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { cardData } from "../utils/ListingMockData";
import { CardSkeleton } from "./Skeleton";

import property from "../images/Guest/property.png";
import ListingSearch from "./custom/customsearch/custom.listingsearch";
import { GetPropertiesBySaleStatus, GetUnitPhotos } from "../api/GetAllPublicListings";
import { GetPhotoWithUrl, GetPhotoLength } from "../utils/GetPhoto";
import { AmountFormatterGroup } from "../utils/AmountFormatter";
import { CapitalizeString, FillLocationFilter, GetPropertyTitle, isPastAMonth } from "../utils/StringFunctions.utils";
import DefaultPropertyImage from '../asset/fallbackImage.png';

const NewPageComponent = () => {
	const navigate = useNavigate();
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
			property_type: '',
			city: ''
		}
	]);
const [loading, setLoading] = useState(true);
const [filterLocation, setFilterLocation] = useState([]);
console.log("loading", loading);

	const handleCardClick = (id) => {
		navigate(`/previewListing/?id=${id}`, { state: id });
	};

	const allPublicListing = async () => {

		try {
			const res = await GetPropertiesBySaleStatus();

			const dataresp = res.data;

			if (dataresp.length == 0) {
				setPublicListing([]);
			} else {
				console.log(
					"sale, rent",
					dataresp.filter((item) =>
						["sale", "rent"].includes(item.SaleType.toLowerCase())
					)
				);

				const listingRes = dataresp.filter(
					(listing) =>
						!isPastAMonth(listing.created_at) &&
						["sale", "rent"].includes(listing.SaleType.toLowerCase())
				);

				let listings = [];

				console.log(listingRes);

				if (listingRes?.length !== 0) {
					listings = listingRes;
				} else {
					listings = dataresp;
				}

				const newListing = await Promise.all(
					listings.map(async (item, i) => {
						const getPhotoGallery = await GetUnitPhotos(item.id);

						const gallery = getPhotoGallery.data;

						const image = GetPhotoWithUrl(item.Photo);

						return {
							id: item.id,
							title: CapitalizeString(item.UnitName),
							price: AmountFormatterGroup(item.Price),
							status: "New",
							pics: image ? gallery.length + 1 : 0,
							img: image,
							no_of_bathrooms: item.BathRooms,
							lot: item.LotArea,
							property_no: item.PropertyNo,
							isFeatured: item.IsFeatured,
							sale_type: CapitalizeString(item.SaleType),
							no_of_beds: item.BedRooms,
							property_type: item.PropertyType,
							city: item.City
						};
					})
				);
				const location = FillLocationFilter(newListing);
				setFilterLocation(location);
				setPublicListing(newListing);
				setLoading(false);
			}
		} catch (error) {
			console.error("ERROROR", error);
			setPublicListing([]);
			setLoading(false);
			// setLoading(false);
		} 
	};

	useEffect(() => {
		allPublicListing();
		
	}, []);

	const [currentPage, setCurrentPage] = useState(1);
	const cardsPerPage = 9;

	const indexOfLastCard = currentPage * cardsPerPage;
	const indexOfFirstCard = indexOfLastCard - cardsPerPage;
	console.log(indexOfFirstCard, indexOfLastCard);

	const currentCards = publiclisting?.slice(indexOfFirstCard, indexOfLastCard);

	const totalPages = Math.ceil(publiclisting.length / cardsPerPage);

	return (
		<div className="newpage">
			<div className="newpage-container">
				<div className="newpage-contents">
					<ListingSearch location={filterLocation}/>
					<div className="second-content">
						<h1 className="new-page-label">New Properties For Sale/Rent</h1>
						<SearchPropertiesSoration
							properties_count={publiclisting.length}
							current_properties_count={currentCards.length}
						/>
						{!loading ? currentCards.length > 0 && (
							<div className="card-container">
								
								{currentCards.map((data, index) => (
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
										subtitle={`${CapitalizeString(
											data.property_type
										)} For ${CapitalizeString(data.sale_type)}`}
										handleClick={() => handleCardClick(data.property_no)}
									/>
									
								))}
							</div>

								
						) : (
							<div
									className="card-skeleton-loading"
									style={{
										display: "flex",
										justifyContent: "center",
										gap: "20px",
									}}
								>
									{Array(3)
										.fill(null)
										.map((_, i) => {
											return <CardSkeleton />;
										})}
								</div>
							
						)}

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