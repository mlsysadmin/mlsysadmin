import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/All.css";
import Card from "../components/custom/cards/Card";
import property from "../images/Guest/property.png";
import { CardSkeleton } from "../components/Skeleton";
import Pagination from "../components/custom/pagination/Pagination";
import {
	FooterComponent,
	CustomMlFooter,
	ListingSearch,
	MainLayout,
	SearchPropertiesSoration,
} from "../components";
import {
	GetPropertiesByDeveloperId,
	GetPropertiesBySaleStatus,
	GetUnitPhotos,
} from "../api/GetAllPublicListings";
import { GetAllFeaturesByPropertyNo } from "../api/GetAllAmenities";
import { GetPhotoWithUrl, GetPhotoLength } from "../utils/GetPhoto";
import {
	CapitalizeString,
	FillLocationFilter,
	GetPropertyTitle,
	isPastAMonth,
	SortListings,
	CapitalizeStringwithSymbol
} from "../utils/StringFunctions.utils";
import NoListingAvailable from "../components/custom/custom.NoListingAvailable";

import DefaultPropertyImage from "../asset/fallbackImage.png";
import { GetAllListing } from "../api/GetAllPublicListings";
import { AmountFormatterGroup } from "../utils/AmountFormatter";
import NoDataAvailable from "../components/NoDataFoundComponent";
import { capitalize } from "@mui/material";
import { Breadcrumb, FloatButton } from "antd";
import { MessageOutlined, CalculatorOutlined } from "@ant-design/icons";
import { FloatBtnGroup } from "../components";
import CalculatorWidgetModal from "../components/modals/CalculatorWidgetModal";
import ContactUsWidget from "../components/modals/ContactUsWidget";

const DevelopersListing = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [loading, setLoading] = useState(true);
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
			bathrooms: 0,
			lot: 0,
			property_no: "",
			isFeatured: "",
			sale_type: "",
			bedrooms: "",
			property_type: "",
			city: "",
			parking: 0,
			location: "",
		},
	]);
	const [filterLocation, setFilterLocation] = useState([]);
	const [headerText, setHeaderText] = useState("");
	const [breadCrumbItems, setBreadCrumbItems] = useState([
		{
			title: "Developers",
			href: "/developers",
		}
	]);
	const [searchParams, setSearchParams] = useState({
		location: null,
		price_min: 1000,
		price_max: 100000000,
		keyword: null,
		property_type: null,
		bedrooms: null,
		bathrooms: null,
		parking: null,
		sale_type: null,
		lot_area: null,
	});

	const [isContactUsFormVisible, setContactUsFormVisible] = useState(false);
	const [isCalculatorVisible, setCalculatorVisible] = useState(false);
	const [developerId, setDeveloperId] = useState(null);
	const [developerName, setDeveloperName] = useState(null);
	const toggleCalculator = () => {
		setCalculatorVisible(!isCalculatorVisible);
		setContactUsFormVisible(false);
	};
	const closeWidgetCalc = () => {
		setCalculatorVisible(false);
		setContactUsFormVisible(false);
	};
	const toogleContarctUsForm = () => {
		setCalculatorVisible(false);
		setContactUsFormVisible(!isContactUsFormVisible);
	};

	const handleCardClick = (id) => {
		navigate(`/previewListing/?id=${id}`, { state: id });
	};

	useEffect(() => {
		const search = location.search;

		const queryParams = new URLSearchParams(search);
		const getDeveloperId = queryParams.get("d_id");
		const getDeveloperName = queryParams.get("d_name");
		const getSaleType = queryParams.get("sale_type");


		setDeveloperId(getDeveloperId);
		setDeveloperName(getDeveloperName);
		console.log(getSaleType);
		
		const searchHeader = `${getDeveloperName}${getSaleType ? ` For ${CapitalizeStringwithSymbol(getSaleType)}` : ''}`
		setHeaderText(searchHeader);
		setBreadCrumbItems([
			{
				title: "Developers",
				href: "/developers",
			},
			{
				title: getDeveloperName
			}
		])

		let searchQueryParams = {};

		const searchKeys = [
			"sale_type",
			"keyword",
			"property_type",
			"location",
			"indoor",
			"outdoor",
			"price_min",
			"price_max",
			"bathrooms",
			"bedrooms",
			"parking"
		];
		const filtersearchKeys = searchKeys.filter(
			(key, i) => ![undefined, null, "null"].includes(queryParams.get(key))
		);

		filtersearchKeys.forEach((fsKey, i) => {
			if (fsKey == "price_min" || fsKey == "price_max") {
				setSearchParams((prevState) => ({
					...prevState,
					[fsKey]: Number(queryParams.get(fsKey)),
				}));

				searchQueryParams[fsKey] = queryParams.get(fsKey);
			} else {
				setSearchParams((prevState) => ({
					...prevState,
					[fsKey]: queryParams.get(fsKey),
				}));

				searchQueryParams[fsKey] = queryParams.get(fsKey);
			}
		});

		if (searchParams.length !== 0) {
			getlistings(searchQueryParams, getDeveloperId);
		} else {
			getlistings(searchParams, getDeveloperId);
		}
	}, [location]);

	const getlistings = async (renderParams, developerId) => {
		try {

			const res = await GetPropertiesByDeveloperId(developerId);
			const dataresp = res;
			console.log("dataresp", dataresp);

			if (dataresp.length !== 0) {
				const formattedListings = dataresp
					.filter((f) => ![null, undefined, ""].includes(f.ProvinceState))
					.map((listing) => {
						return {
							id: listing.id,
							title: CapitalizeString(listing.UnitName),
							price: listing.Price,
							status: `For ${CapitalizeString(listing.SaleType)}`,
							pics: 0,
							img: listing.Photo,
							bathrooms: listing.BathRooms,
							lot: listing.LotArea,
							property_no: listing.PropertyNo,
							isFeatured: listing.IsFeatured,
							sale_type: CapitalizeString(listing.SaleType),
							bedrooms: listing.BedRooms,
							property_type: listing.PropertyType,
							city: listing.City,
							parking: listing.Parking,
							location: listing.ProvinceState,
						};
					});
				FillLocationFilter(dataresp);

				// CHECK LOCATION AND KEYWORD
				const hasLocation = Object.hasOwn(renderParams, "location");
				const hasKeyword = Object.hasOwn(renderParams, "keyword");

				let listingByLocation = [];

				const keywordMatched = (v) =>
					Object.values(v).some((e, i) =>
						e
							.toString()
							.toLowerCase()
							.replace(/[\/_-]/g, "")
							.includes(
								renderParams["keyword"].toLowerCase().replace(/[\/_-]/g, "")
							)
					);

				if (hasLocation && hasKeyword) {
					const main = ["location", "keyword"];

					formattedListings.forEach((fl) => {
						let byLoc = [];
						if (
							fl.location.toLowerCase() ===
							renderParams["location"].toLowerCase()
						) {
							byLoc.push(fl);
						}

						const bl = byLoc.filter((f) => keywordMatched(f));

						listingByLocation.push(...bl);
					});

					Object.values(main).forEach((fi, i) => {
						delete renderParams[fi];
					});
				} else if (!hasLocation && hasKeyword) {
					formattedListings.forEach((fl) => {
						// const keywordMatched = Object.values(fl).every(e => e.includes('condominium'.toLowerCase()));

						if (keywordMatched(fl)) {
							listingByLocation.push(fl);
						}
					});
					delete renderParams["keyword"];
				} else if (hasLocation && !hasKeyword) {
					formattedListings.forEach((fl) => {
						if (
							fl.location.toLowerCase() ===
							renderParams["location"].toLowerCase()
						) {
							listingByLocation.push(fl);
						}
					});

					delete renderParams["location"];
				} else {
					listingByLocation = formattedListings;
				}

				let filteredListings = listingByLocation;

				const paramsKeys = Object.keys(renderParams);
				if (paramsKeys.length > 0) {
					if (renderParams["price_max"] && renderParams["price_min"]) {
						filteredListings = filteredListings.filter((pr) => {
							const max = parseInt(renderParams["price_max"], 10);
							const min = parseInt(renderParams["price_min"], 10);
							const price = parseInt(pr["price"], 10);

							return price >= min && price <= max;
						});
						delete renderParams["price_max"];
						delete renderParams["price_min"];
					}
				}

				// Get keys from the remaining render params
				const remainingParams = Object.keys(renderParams);

				// Filter listing from the rest search params
				if (remainingParams.length > 0) {
					filteredListings = filteredListings.filter((listing) =>
						remainingParams.every(
							(key) =>
								renderParams[key].toLowerCase().replace(/[-_]/g, " ") ==
								listing[key]?.toLowerCase().replace(/[-_]/g, " ")
						)
					);
				}

				// Get photo gallery and finalize listings
				const finalFilteredListing = await Promise.all(
					filteredListings.map(async (ffl) => {
						const getPhotoGallery = await GetUnitPhotos(ffl.id);
						const gallery = getPhotoGallery.data;
						const image = GetPhotoWithUrl(ffl.img);

						ffl["img"] = image;
						ffl["price"] = AmountFormatterGroup(ffl.price);
						ffl["pics"] = image ? gallery.length + 1 : 0;

						return ffl;
					})
				);

				setPublicListing(finalFilteredListing);
				setLoading(false);
			} else {
				setPublicListing([]);
				setLoading(false);
			}
		} catch (error) {
			setPublicListing([]);
			setLoading(false);
		}
	};

	const [selectedSort, setSelectedSort] = useState("Most relevant");

	const indexOfLastCard = currentPage * cardsPerPage;
	const indexOfFirstCard = indexOfLastCard - cardsPerPage;
	let currentCards = publiclisting.slice(indexOfFirstCard, indexOfLastCard);

	const totalPages = Math.ceil(publiclisting?.length / cardsPerPage);

	const HandleSort = (e) => {
		setSelectedSort(e.domEvent.target.innerText);
		const sortKey = e.key;
		let sortListing;

		sortListing = SortListings(sortKey, sortListing, publiclisting);

		currentCards = sortListing;
	};

	const FillLocationFilter = (listings) => {
		try {
			const falsy = [null, undefined, ""];

			const distinctProvince = listings
				.filter((p) => !falsy.includes(p.ProvinceState))
				.filter(
					(value, index, self) =>
						index ===
						self.findIndex(
							(t) =>
								t.ProvinceState.toLowerCase() ===
								value.ProvinceState.toLowerCase()
						)
				)
				.map((item, i) => {
					return {
						key: i,
						label: CapitalizeString(item.ProvinceState.toLowerCase()),
						value: item.ProvinceState.toLowerCase(),
					};
				})
				.sort((a, b) => a.value.localeCompare(b.value));

			setFilterLocation(distinctProvince);
		} catch (error) {
			return;
		}
	};
	return (
		<div className="all-container">
			<div className="all-searchcomponent">
				<ListingSearch
					location={filterLocation}
					searchParams={searchParams}
					setSearchFilters={setSearchParams}
				/>
			</div>
			<div className="all-page-container">
				<Breadcrumb
					separator=">"
					items={breadCrumbItems}
					className="all-h1 breadcrumb--search"
				/>
				<span className="all-h1-p">{headerText}</span>
				{currentCards.length !== 0 ? (
					<>
						<SearchPropertiesSoration
							properties_count={publiclisting.length}
							current_properties_count={currentCards.length}
							selectedSort={selectedSort}
							setSelectedSort={setSelectedSort}
							HandleSort={HandleSort}
						/>
						{!loading ? (
							currentCards.length !== 0 ? (
								<div className="card-container">
									{currentCards.map((data, index) => (
										<Card
											key={index}
											id={data.id}
											title={data.title}
											price={`PHP ${data.price}`}
											imgSrc={data.img}
											beds={data.bedrooms}
											baths={data.bathrooms}
											size={data.lot}
											likes={data.pics}
											forsale={data.status}
											isFeatured={data.isFeatured}
											subtitle={`${CapitalizeString(
												data.property_type
											)} For ${CapitalizeString(data.sale_type)}`}
											handleClick={() => handleCardClick(data.property_no)}
										/>
									))}
								</div>
							) : (
								<NoDataAvailable message={`No Results Found`} />
							)
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
									.map((_, i) => (
										<CardSkeleton key={i} />
									))}
							</div>
						)}
					</>
				) : (
					<NoDataAvailable message={`No Results Found`} />
				)}

				{currentCards.length > 0 && (
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						paginate={setCurrentPage}
					/>
				)}
			</div>
			<div className="listing__contact--form-btns-sticky">
				<FloatBtnGroup
					children={
						<>
							<a href="#contact-form">
								<FloatButton
									icon={
										<MessageOutlined className="message-float__icon--icon" />
									}
									tooltip={isContactUsFormVisible ? "" : "Message us"}
									className="float__icon message-float__icon"
									onClick={toogleContarctUsForm}
								/>
							</a>
							<FloatButton
								icon={<CalculatorOutlined className="calculator-float__icon" />}
								tooltip={isCalculatorVisible ? "" : "Calculator"}
								className="float__icon calculator-float__icon"
								onClick={toggleCalculator}
							// onClick={() => navigate("/discover-home#calculator")}
							/>
						</>
					}
				/>
			</div>
			{isCalculatorVisible && (
				<CalculatorWidgetModal
					toggleCalculator={toggleCalculator}
					closeWidgetCalc={closeWidgetCalc}
				/>
			)}
			{isContactUsFormVisible && (
				<ContactUsWidget closeWidgetCalc={closeWidgetCalc} />
			)}

			<CustomMlFooter />
			<FooterComponent />
		</div>
	);
};

export default DevelopersListing;
