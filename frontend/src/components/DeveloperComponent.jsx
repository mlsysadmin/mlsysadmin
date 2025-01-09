import React from "react";
import "../styles/preselling.css";
import { FooterComponent, CustomMlFooter } from ".";
import { useState, useEffect } from "react";
import { Select } from "antd";
import Pagination from "./custom/pagination/Pagination";
import developers from "../utils/DevelopersMockData";
import { GetPhotoWithUrl } from "../utils/GetPhoto";
import { getDevelopers } from "../api/GetDevelopers";

const PreSellingComponent = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [developersData, setDevelopersData] = useState([]);
	const [developerName, setDeveloperName] = useState("");
	const [developerLogo, setDeveloperLogo] = useState("");

	const fetchDevelopers = async () => {
		const developers = await getDevelopers();
		const data = developers.data;
		console.log("dev", data);

		const developersListings = data.map((developer) => {
			const img = GetPhotoWithUrl(developer.LogoPath);
			const updatedAt = new Date(developer.updated_at);
			const currentTime = new Date();
			const timeDifferenceInSeconds = Math.floor(
				(currentTime - updatedAt) / 1000
			);

			let updated = "";
		if (timeDifferenceInSeconds < 60) {
			updated = `${timeDifferenceInSeconds}s`;
		} else if (timeDifferenceInSeconds < 3600) {
			updated = `${Math.floor(timeDifferenceInSeconds / 60)}m`;
		} else if (timeDifferenceInSeconds < 86400) {
			updated = `${Math.floor(timeDifferenceInSeconds / 3600)}h`;
		} else if (timeDifferenceInSeconds < 432000) {
			updated = `${Math.floor(timeDifferenceInSeconds / 86400)}d`;
		} else {
			const dateOptions = { year: "numeric", month: "short", day: "numeric" };
			updated = updatedAt.toLocaleDateString(undefined, dateOptions);
		}

			return {
				id: developer.VendorId,
				logo: img,
				developerName: developer.VendorName,
				properties: developer.TotalUnits,
				updated: updated,
			};
		});

		setDevelopersData(developersListings);
	};
	useEffect(() => {
		fetchDevelopers();
	}, []);

	const cardsPerPage = 15;
	const indexOfLastCard = currentPage * cardsPerPage;
	const indexOfFirstCard = indexOfLastCard - cardsPerPage;

	let currentCards = developersData?.slice(indexOfFirstCard, indexOfLastCard);
	const totalPages = Math.ceil(developersData?.length / cardsPerPage);

	console.log("currectCards", currentCards);

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
							<Select placeholder="Listing Type" allowClear>
								<Select.Option value="All">For Sale</Select.Option>
								<Select.Option value="All">Pre Selling</Select.Option>
							</Select>
						</div>
					</div>
					<div className="preselling-search-button">
						<button>Search</button>
					</div>
				</div>
				<div className="preselling-developers-card">
					{currentCards?.map((developer, index) => (
						<div key={index} className="developers-card">
							<div className="developers-logo">
								<img
									src={developer.logo}
									alt={`${developer.developerName} Logo`}
								/>
							</div>
							<div className="developers-info">
								<div className="developers-name">
									<span>{developer.developerName}</span>
								</div>
								<div className="developers-properties-stat">
									<div className="developers-properties-number">
										{developer.properties} properties
									</div>
									<div className="developers-status">{developer.updated}</div>
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
