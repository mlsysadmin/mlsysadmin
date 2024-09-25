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

import property from "../images/Guest/property.png";
import ListingSearch from "./custom/customsearch/custom.listingsearch";
import { GetPropertiesBySaleStatus } from "../api/GetAllPublicListings";
import { GetPhotoWithUrl, GetPhotoLength } from "../utils/GetPhoto";
import { AmountFormatterGroup } from "../utils/AmountFormatter";
import { CapitalizeString, GetPropertyTitle, isPastAMonth } from "../utils/StringFunctions.utils";

const NewPageComponent = () => {
	const navigate = useNavigate();
	const [publiclisting, setPublicListing] = useState([]);

	const handleCardClick = (id) => {
		navigate(`/previewListing/?id=${id}`, { state: id });
	};

	const allPublicListing = async () => {
		const res = await GetPropertiesBySaleStatus();
		const dataresp = res.data;
		setPublicListing(dataresp);
	};

	useEffect(() => {
		allPublicListing();
	}, []);

	const [currentPage, setCurrentPage] = useState(1);
	const cardsPerPage = 9;

	const indexOfLastCard = currentPage * cardsPerPage;
	const indexOfFirstCard = indexOfLastCard - cardsPerPage;
	console.log(indexOfFirstCard, indexOfLastCard);
	
	const currentCards = publiclisting.slice(indexOfFirstCard, indexOfLastCard);

	const totalPages = Math.ceil(cardData.length / cardsPerPage);
	return (
		<div className="newpage">
			<div className="newpage-container">
				<div className="newpage-contents">
					<ListingSearch />
					<div className="second-content">
						<h1 className="new-page-label">New Properties For Sale/Rent</h1>
						<SearchPropertiesSoration properties_count={publiclisting.length} current_properties_count={currentCards.length}/>
						<div className="card-container">
							{currentCards.map((data, index) => {
								if (["sale", "rent"].includes(data.SaleType.toLowerCase())) {

									return (
										<Card
											key={index}
											id={data.PropertyNo}
											title={GetPropertyTitle(data.ProjectName, data.UnitName)}
											price={`PHP ${AmountFormatterGroup(data.Price)}`}
											imgSrc={GetPhotoWithUrl(data.Photo)}
											beds={data.BedRooms}
											baths={data.BathRooms}
											size={data.LotArea}
											likes={GetPhotoLength(data.id) + 1}
											forsale={isPastAMonth(data.created_at) ? CapitalizeString(data.SaleType) : "New"}
											subtitle={`${CapitalizeString(data.PropertyType)} For ${CapitalizeString(data.SaleType)}`}
											handleClick={() => handleCardClick(data.PropertyNo)}
										/>
									)
								}
							}
							)}
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