import React, { useState } from "react";
import "../styles/newpage.css";
import { useNavigate } from "react-router-dom";
import { FooterComponent, CustomMlFooter, MainLayout } from "../components";
import Card from "./custom/cards/Card";
import Pagination from "./custom/pagination/Pagination";
import SortDropdown from "../components/SortDropdownComponent"; // Ensure this path is correct
import { cardData } from "../utils/ListingMockData";
import ListingSearch from "./custom/customsearch/custom.listingsearch";

export const NewPageComponent = () => {
	const navigate = useNavigate();

	const handleCardClick = (data) => {
		navigate("/previewListing", { state: data });
	};

	const [currentPage, setCurrentPage] = useState(1);
	const cardsPerPage = 9;

	const indexOfLastCard = currentPage * cardsPerPage;
	const indexOfFirstCard = indexOfLastCard - cardsPerPage;
	const currentCards = cardData.slice(indexOfFirstCard, indexOfLastCard);

	const totalPages = Math.ceil(cardData.length / cardsPerPage);

	return (
		<div className="newpage">
			<div className="newpage-container">
				<div className="newpage-contents">
					<ListingSearch />
					<div className="second-content">
						<h1 className="new-page-label">New Properties For Sale/Rent</h1>
						<div className="header">
							<div className="entry-count">
								Showing {indexOfFirstCard + 1} to {indexOfLastCard} of{" "}
								{cardData.length} entries
							</div>
							<SortDropdown />
						</div>
						<div className="card-container">
							{currentCards.map((data, index) => (
								<Card
									key={index}
									title={data.title}
									price={data.price}
									imgSrc={data.imgSrc}
									beds={data.beds}
									baths={data.baths}
									size={data.size}
									likes={data.likes}
									forsale={data.forsale}
									subtitle={data.subtitle}
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
