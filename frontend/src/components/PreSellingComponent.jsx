import React from "react";
import "../styles/preselling.css";
import {
	FooterComponent,
	CustomMlFooter,

} from "../components";
import { useState } from "react";
import { Select } from "antd";
import Pagination from "./custom/pagination/Pagination";
import developers from "../utils/DevelopersMockData";

const PreSellingComponent = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const cardsPerPage =15;
	const indexOfLastCard = currentPage * cardsPerPage;
	const indexOfFirstCard = indexOfLastCard - cardsPerPage;

	let currentCards = developers.slice(indexOfFirstCard, indexOfLastCard);
	const totalPages = Math.ceil(developers?.length / cardsPerPage);

	return (
		<div className="pre-selling-container">
			<div className="pre-selling-content">
				<div className="pre-selling-header">
					<h2>Discover Real Estate Developers</h2>
					<span>Explore trusted partners shaping your dream properties.</span>
				</div>
				<div className="preselling-search-bar">
					<div className="search-bar-content">
						<div className="search-input-options">
							<input
								className="search-real-estate-developer"
								type="text"
								placeholder="Search Real Estate Developer"
							/>
						</div>
						<div className="search-select-options">
							<Select placeholder="Location" allowClear>
								<Select.Option value="All">All</Select.Option>
							</Select>
							<Select placeholder="listing Type" allowClear>
								<Select.Option value="All">All</Select.Option>
							</Select>
						</div>
					</div>
					<div className="preselling-search-button">
						<button>Search</button>
					</div>
				</div>
				<div className="preselling-developers-card">
					{currentCards.map((developer, index) => (
						<div key={index} className="developers-card">
							<div className="developers-logo">
								<img
									src={developer.icon}
									alt={`${developer.developers} Logo`}
								/>
							</div>
							<div className="developers-info">
								<div className="developers-name">
									<span>{developer.developers}</span>
								</div>
								<div className="developers-properties-stat">
									<div className="developers-properties-number">
										{developer.properties} properties
									</div>
									<div className="developers-status">{developer.status}</div>
								</div>
							</div>
						</div>
					))}
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
export default PreSellingComponent;
