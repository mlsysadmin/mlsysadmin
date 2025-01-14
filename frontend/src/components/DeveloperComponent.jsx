import React from "react";
import "../styles/preselling.css";
import { FooterComponent, CustomMlFooter } from ".";
import { useState, useEffect } from "react";
import { Input, Select } from "antd";
import Pagination from "./custom/pagination/Pagination";
import developers from "../utils/DevelopersMockData";
import { GetPhotoWithUrl } from "../utils/GetPhoto";
import { getDevelopers } from "../api/GetDevelopers";

import noDevFound from "../asset/no-developer-found.png";
import { useNavigate } from "react-router-dom";
import { FillLocationFilter } from "../utils/StringFunctions.utils";
import { GetPropertiesByDeveloperId } from "../api/GetAllPublicListings";
import { DevelopersCardsSkeleton } from "./Skeleton";

const PreSellingComponent = () => {
	const navigate = useNavigate();

	const [currentPage, setCurrentPage] = useState(1);
	const [developersData, setDevelopersData] = useState([]);
	const [filteredDevelopers, setFilteredDevelopers] = useState(developersData);
	const [developerName, setDeveloperName] = useState("");
	const [developerLogo, setDeveloperLogo] = useState("");
	const [searchParams, setSearchParams] = useState({
		SaleType: null,
		ProvinceState: null,
		VendorName: "",
	});
	const [location, setLocation] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const falsy = [null, undefined, ""];

	const TruncateDeveloperName = (text) => {
		const length = 35;
		if (!text) return "";
		return text.length > length ? text.substring(0, length) + "..." : text;
	};

	const fetchDevelopers = async () => {
		try {

			const developers = await getDevelopers();
			const data = developers.data;

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
					const month = updatedAt.getMonth() + 1;
					const day = updatedAt.getDate();
					const year = updatedAt.getFullYear();
					updated = `${month}-${day}-${year}`;
				}

				const isUpdatedBackground = timeDifferenceInSeconds < 86400;
				return {
					id: developer.VendorId,
					logo: img,
					developerName: developer.VendorName,
					properties: developer.TotalUnits,
					updated: updated,
					updatedAt,
					isUpdatedBackground,
					ProvinceState: developer.ProvinceState,
					VendorName: developer.VendorName
				};

			});

			const sorteddata = developersListings.sort(
				(a, b) => b.updatedAt - a.updatedAt
			);

			setDevelopersData(sorteddata);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};
	useEffect(() => {
		fetchDevelopers();
	}, []);

	useEffect(() => {
		setFilteredDevelopers(developersData);
		if (developersData) {
			const location = FillLocationFilter(developersData);
			setLocation(location);
		}
	}, [developersData])

	const cardsPerPage = 15;
	const indexOfLastCard = currentPage * cardsPerPage;
	const indexOfFirstCard = indexOfLastCard - cardsPerPage;

	let currentCards = filteredDevelopers?.slice(indexOfFirstCard, indexOfLastCard);
	const totalPages = Math.ceil(filteredDevelopers?.length / cardsPerPage);

	const handleDeveloperListing = (developerId, developerName) => {
		const params = {
			d_id: developerId,
			d_name: developerName
		};

		const values = Object.keys(params);

		let searchParams = "";
		const falsy = ["", "null", null, undefined];

		values.forEach((p, i) => {

			if (!falsy.includes(params[p]) && i === 0) {
				searchParams += `${p}=${params[p]}`
			} else if (!falsy.includes(params[p])) {
				searchParams += `&${p}=${params[p]}`
			}
		});

		navigate(`/developer/?${searchParams}`);
	}

	const handleSearchDeveloper = (e, name) => {
		console.log(e, name);

		setSearchParams((prevState) => ({
			...prevState,
			[name]: e,
		}));

	}

	const handleSearchClick = async () => {
		try {
			setIsLoading(true);

			let remainingParams = searchParams;
			const searchKeys = Object.keys(remainingParams);


			searchKeys.forEach((k, i) => {
				if (falsy.includes(remainingParams[k])) {
					delete remainingParams[k];
				}
			});

			let filteredDev = developersData

			let remainingKeys = Object.keys(remainingParams);

			//DONE
			searchVendorName()

			function searchVendorName() {
				if (remainingKeys.includes("VendorName")) {
					filteredDev = filteredDev.filter((developer) => {
						return developer.developerName.toLowerCase().includes(remainingParams["VendorName"].toLowerCase());
					})
				}
			}

			// Filter listing from the rest search params
			if (remainingKeys.includes("ProvinceState")) {
				const location = remainingParams["ProvinceState"];

				if (location.toLowerCase() !== "all") {
					filteredDev = filteredDev.filter((developer) => location.toLowerCase() == developer.ProvinceState.toLowerCase());
				} else {
					searchVendorName()
				}
			}

			let finalFilteredDevelopers = [];

			if (remainingKeys.includes("SaleType")) {
				for (const dev of filteredDev) {
					const properties = await GetPropertiesByDeveloperId(dev.id);
					if (properties.length > 0) {
						const matchingProperties = properties.filter(
							(property) =>
								property.SaleType.toLowerCase().replace(/-/g, "") === searchParams.SaleType.toLowerCase().replace(/-/g, "")
						);

						if (matchingProperties.length > 0) {
							finalFilteredDevelopers.push(dev);
						}
					}
				}

				// Remove duplicates based on developer ID (case-insensitive)
				finalFilteredDevelopers = finalFilteredDevelopers.filter(
					(value, index, self) =>
						index === self.findIndex((t) => t.id.toLowerCase() === value.id.toLowerCase())
				);

				console.log("Filtered data:", finalFilteredDevelopers);
				setFilteredDevelopers(finalFilteredDevelopers);
				setIsLoading(false);
			}

		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	}

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
								value={searchParams.VendorName}
								placeholder="Search Real Estate Developer"
								onChange={(e) => handleSearchDeveloper(e.target.value, "VendorName")}
							/>
						</div>
						<div className="search-select-options">
							<Select placeholder="Location" onChange={(e) => handleSearchDeveloper(e, "ProvinceState")}
								value={searchParams.ProvinceState}
								className="developer-search select--location"
							>
								<Select.Option value="All">All</Select.Option>
								{
									location.map((l, i) => {
										return <Select.Option key={i} value={l.value}>{l.label}</Select.Option>;
									})
								}
							</Select>
							<Select placeholder="Listing Type" onChange={(e) => handleSearchDeveloper(e, "SaleType")} value={searchParams.SaleType} className="developer-search select--listing-type">
								<Select.Option value="pre-selling">Pre Selling</Select.Option>
								<Select.Option value="ready for occupancy">
									Ready for Occupancy
								</Select.Option>
							</Select>
						</div>
					</div >
					<div className="preselling-search-button" onClick={handleSearchClick}>
						<button style={{ cursor: 'pointer' }}>Search</button>
					</div>
				</div >
				{
					!isLoading ?
						<>
							{
								currentCards.length > 0 ? (
									<div className="preselling-developers-card">
										{currentCards?.map((developer, index) => (
											<div
												key={index}
												className="developers-card"
												onClick={() =>
													handleDeveloperListing(developer.id, developer.developerName)
												}
											>
												<div className="developers-logo">
													<img
														src={developer.logo}
														alt={`${developer.developerName} Logo`}
													/>
												</div>
												<div className="developers-info">
													<div className="developers-name">
														<span>
															{TruncateDeveloperName(developer.developerName)}
														</span>
													</div>
													<div className="developers-properties-stat">
														<div className="developers-properties-number">
															Properties:{developer.properties}
														</div>
														<div
															className="developers-status"
															style={{
																backgroundColor: developer.isUpdatedBackground
																	? "#E3FFF0"
																	: "#f7f7f7",
																color: developer.isUpdatedBackground ? "#007C14" : "#A4A1A1"
															}}
														>
															Updt {developer.updated}
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								) : (
									<div className="no-developers-found">
										<div className="no-dev-found__image-wrapper">
											<img src={noDevFound} alt="No Developers Found" />
										</div>
										<div className="no-dev-found__message">
											<p>No Real Estate Developers Available</p>
										</div>
									</div>
								)
							}
						</>
						:
						<div className="preselling-developers-card developers-card--skeleton-wrapper">
							{Array(5)
								.fill(null)
								.map((_, i) => (
									<DevelopersCardsSkeleton key={i} />
								))}
						</div>
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
export default PreSellingComponent;
