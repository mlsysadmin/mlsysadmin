import React from "react";
import "../styles/preselling.css";
import { FooterComponent, CustomMlFooter } from ".";
import { useState, useEffect } from "react";
import { Select } from "antd";
import Pagination from "./custom/pagination/Pagination";
import developers from "../utils/DevelopersMockData";
import { GetPhotoWithUrl } from "../utils/GetPhoto";
import { getDevelopers } from "../api/GetDevelopers";
import noDevFound from '../asset/no-developer-found.png';
import { useNavigate } from "react-router-dom";
import { FillLocationFilter } from "../utils/StringFunctions.utils";
import { GetPropertiesByDeveloperId } from "../api/GetAllPublicListings";

const PreSellingComponent = () => {
	const navigate = useNavigate();

	const [currentPage, setCurrentPage] = useState(1);
	const [developersData, setDevelopersData] = useState([]);
	const [filteredDevelopers, setFilteredDevelopers] = useState(developersData);
	const [developerName, setDeveloperName] = useState("");
	const [developerLogo, setDeveloperLogo] = useState("");
	const [searchParams, setSearchParams] = useState({
		saleType: null,
		location: null,
		searchKey: "",
	});
	const [location, setLocation] = useState([]);

	const falsy = [null, undefined, ""];

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
					const dateOptions = { year: "numeric", month: "short", day: "numeric" };
					updated = updatedAt.toLocaleDateString(undefined, dateOptions);
				}

				return {
					id: developer.VendorId,
					logo: img,
					developerName: developer.VendorName,
					properties: developer.TotalUnits,
					updated: updated,
					ProvinceState: developer.ProvinceState
				};

			});

			setDevelopersData(developersListings);

		} catch (error) {
			console.error(error);
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
		const falsy = ["", "null", null, undefined]

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
	const handleDeveloperSearch = (event) => {

		const value = event.target.value;
		setDeveloperName(value);

		if (falsy.includes(value)) {
			setFilteredDevelopers(developersData); // Reset to original data when input is empty
		} else {

			const filtered = developersData.filter((developer) => {
				return developer.developerName.toLowerCase().includes(value.toLowerCase());
			})

			setFilteredDevelopers(filtered);
		}
	}

	const handleSearchClick = async () => {
		try {

			console.log("search", searchParams);
			const searchKeys = Object.values(searchParams);
			let searchData = [];

			if (!falsy.includes(searchParams.saleType)) {
				developersData.forEach(async (dev, i) => {
					let data = [];
					const properties = await GetPropertiesByDeveloperId(dev.id);
					if (properties.length > 0) {
						
						properties.forEach(element => {
							console.log("Dsdsfdgd");
							if (element.SaleType.toLowerCase().replace(/-/g, "") == searchParams.saleType.toLowerCase().replace(/-/g, "")) {
								data.push(dev);
							}
						});
					}
					console.log("data", data);
					searchData.push(data);
					
				})
				console.log("searchData", searchData);
				
			}

		} catch (error) {
			console.log(error);

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
								value={searchParams.searchKey}
								placeholder="Search Real Estate Developer"
								onChange={(e) => handleSearchDeveloper(e.target.value, "searchKey")}
							/>
						</div>
						<div className="search-select-options">
							<Select placeholder="Location" allowClear onChange={(e) => handleSearchDeveloper(e, "location")}
								value={searchParams.location}
							>
								<Select.Option value="All">All</Select.Option>
								{
									location.map((l, i) => {
										return <Select.Option key={i} value={l.value}>{l.label}</Select.Option>;
									})
								}
							</Select>
							<Select placeholder="Listing Type" allowClear onChange={(e) => handleSearchDeveloper(e, "saleType")} value={searchParams.saleType}>
								<Select.Option value="pre-selling">Pre Selling</Select.Option>
								<Select.Option value="ready for occupancy">Ready for Occupancy</Select.Option>
							</Select>
						</div>
					</div>
					<div className="preselling-search-button" onClick={handleSearchClick}>
						<button>Search</button>
					</div>
				</div>
				{
					currentCards.length > 0 ?
						<div className="preselling-developers-card">
							{
								currentCards?.map((developer, index) => (
									<div key={index} className="developers-card"
										onClick={() => handleDeveloperListing(developer.id, developer.developerName)}
									>
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
								))
							}
						</div>
						: <div className="no-developers-found">
							<div className="no-dev-found__image-wrapper">
								<img src={noDevFound} alt="No Developers Found" />
							</div>
							<div className="no-dev-found__message">
								<p>No Real Estate Developers Available</p>
							</div>
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
