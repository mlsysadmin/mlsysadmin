import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import RoundSelect from "./custom/selects/RoundSelect.custom";
import CardListingComponent from "./CardListingComponent";
import DefaultPropertyImage from "../asset/fallbackImage.png";
import { CardSkeleton, FeaturesSkeleton } from "./Skeleton";
import SemiRoundBtn from "./custom/buttons/SemiRoundBtn.custom";
import { getCookieData } from "../utils/CookieChecker";
import { GetSavedPropertiesBySellerNo } from "../api/Public/SavedProperties.api";
import { PropertyListing } from "../api/Public/PropertyListing.api";
import { GetPhotoWithUrl } from "../utils/GetPhoto";
import { AmountFormatterGroup } from "../utils/AmountFormatter";
import { GetUnitPhotos } from "../api/GetAllPublicListings";
import Pagination from "./custom/pagination/Pagination";
import NoDataAvailable from "./NoDataFoundComponent";
import { CustomMlFooter, FooterComponent } from "../components";
import { useLocation } from "react-router-dom";
import {
	CapitalizeEachWord,
	CapitalizeString,
	CapitalizeStringwithSymbol,
} from "../utils/StringFunctions.utils";
import { GetVendorByNumber } from "../api/PostListings";
import "../styles/seller-broker/saved-properties.css";

const SavedPropertiesComponent = () => {
	const [selectedSort, setSelectedSort] = useState("dateAdded");
	const [tabOpened, setTabOpened] = useState("savedProperties");
	const [loading, setLoading] = useState(true);
	const [recordStatus, setIsRecordStatus] = useState("");
	const [SortTypes, setSortTypes] = useState([
		{
			label: "Date Added",
			value: "dateAdded",
		},
		{
			label: "Highest Price",
			value: "highestPrice",
		},
		{
			label: "Lowest Price",
			value: "lowestPrice",
		},
	]);

	const [filteredAndSortedListings, setFilteredAndSortedListings] = useState([
		{
			id: 0,
			title: "",
			price: 0,
			status: "",
			pics: 0,
			img: DefaultPropertyImage,
			no_of_bathrooms: 0,
			lot: 0,
			property_no: "",
			isFeatured: "",
			sale_type: "",
			no_of_beds: "",
			city: "",
			property_type: "",
		},
	]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 6;

	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentItems = filteredAndSortedListings.slice(
		startIndex,
		startIndex + itemsPerPage
	);

	// Calculate total pages
	const totalPages = Math.ceil(
		filteredAndSortedListings?.length / itemsPerPage
	);

	const location = useLocation();
	const isSavedPropertiesRoute =
		location.pathname.includes("/saved-properties");
	const isSavedPropertiesTab = tabOpened === "savedProperties";
	console.log("location:", location.pathname);
	const accountDetails = getCookieData();

	let number = accountDetails.mobileNumber;

	const onChange = (key) => {
		console.log("key: ", key);
		setTabOpened(key);
		if (key === "propertyListings") {
			setSelectedSort("allListings");
			setSortTypes([
				{
					label: "All Listing",
					value: "allListings",
				},
				{
					label: "Pending Listings",
					value: "pendingListings",
				},
				{
					label: "Approved Listings",
					value: "approvedListings",
				},
				{
					label: "Denied Listings",
					value: "deniedListings",
				},
			]);
		} else if (key === "savedProperties") {
			setSelectedSort("dateAdded");
			setSortTypes([
				{
					label: "Date Added",
					value: "dateAdded",
				},
				{
					label: "Highest Price",
					value: "highestPrice",
				},
				{
					label: "Lowest Price",
					value: "lowestPrice",
				},
			]);
		}
	};

	useEffect(() => {
		const fetchSavedProperties = async () => {
			setLoading(true);
			try {
				if (tabOpened === "savedProperties") {
					console.log("vendordetails:", number);
					const savedProperties = await GetSavedPropertiesBySellerNo(number);
					const dataresp = savedProperties.data;
					console.log("dataresp: ", dataresp);

					if (!Array.isArray(dataresp)) {
						console.error("Error: dataresp is not an array");
						setFilteredAndSortedListings([]);
						return;
					}

					if (dataresp.length === 0) {
						setFilteredAndSortedListings([]);
						setLoading(false);
					} else {
						let listingRes = [...dataresp];
						console.log("listingRes:", listingRes);

						if (listingRes.length === 0) {
							console.log("No Data Found");
						} else {
							console.log("Filtered and Sorted Listings: ", listingRes);

							if (selectedSort === "dateAdded") {
								listingRes.sort(
									(a, b) => new Date(b.updated_at) - new Date(a.updated_at)
								);
							} else if (selectedSort === "oldest") {
								listingRes.sort(
									(a, b) => new Date(a.updated_at) - new Date(b.updated_at)
								);
							} else if (selectedSort === "highestPrice") {
								listingRes.sort((a, b) => b.Price - a.Price);
							} else if (selectedSort === "lowestPrice") {
								listingRes.sort((a, b) => a.Price - b.Price);
							} else {
								console.warn("Unknown sorting option selected:", selectedSort);
								listingRes = [];
							}

							if (listingRes.length === 0) {
								console.log("No Data Found after sorting");
								setFilteredAndSortedListings([]);
							} else {
								console.log("Filtered and Sorted Listings:", listingRes);
							}

							const newListing = await Promise.all(
								listingRes.map(async (item) => {
									const getPhotoGallery = await GetUnitPhotos(item.id);
									const gallery = getPhotoGallery.data;
									const image = GetPhotoWithUrl(item.Photo);

									return {
										id: item.id,
										title: CapitalizeString(item.UnitName),
										price: AmountFormatterGroup(item.Price),
										status: "New",
										pics: image ? gallery.length + 1 : 1,
										img: image,
										no_of_bathrooms: item.BathRooms,
										lot: item.LotArea,
										property_no: item.PropertyNo,
										isFeatured: "yes",
										sale_type: CapitalizeString(item.SaleType),
										no_of_beds: item.BedRooms,
										property_type: item.PropertyType,
										city: item.City,
										province: item.ProvinceState,
									};
								})
							);

							setFilteredAndSortedListings(newListing);
							setLoading(false);
						}
					}
				} else {
					const vendorDetails = await GetVendorByNumber(number);
					console.log("detais: ", vendorDetails);
					

					if (vendorDetails.data) {
						const vendorDataId = vendorDetails.data.VendorId;
						const propertyListing = await PropertyListing(vendorDataId);
						const dataresp = propertyListing;
						console.log("dataresp: ", dataresp);
						if (dataresp.length == 0) {
							setFilteredAndSortedListings([]);
						} else {
							let listingRes = [...dataresp];
							if (selectedSort === "allListings") {
								listingRes = listingRes
									.filter((item) => item.updated_at) // No filtering; retain all listings
									.sort(
										(a, b) => new Date(b.updated_at) - new Date(a.updated_at)
									);
							} else if (selectedSort === "pendingListings") {
								listingRes = listingRes
									.filter((item) => item.RecordStatus === "pending")
									.sort(
										(a, b) => new Date(b.updated_at) - new Date(a.updated_at)
									);
							} else if (selectedSort === "approvedListings") {
								listingRes = listingRes
									.filter((item) => item.RecordStatus === "active")
									.sort(
										(a, b) => new Date(b.updated_at) - new Date(a.updated_at)
									);
							} else if (selectedSort === "deniedListings") {
								listingRes = listingRes
									.filter((item) => item.RecordStatus === "rejected")
									.sort(
										(a, b) => new Date(b.updated_at) - new Date(a.updated_at)
									);
							} else {
								listingRes = [];
							}
							listingRes.forEach((listing) => {
								console.log(
									`Details: ${listing.UnitName},\n RecordStatus: ${listing.RecordStatus}`
								);
							});

							if (listingRes.length === 0) {
								setFilteredAndSortedListings([]);
							} else {
								// console.log("listingRes: ", listingRes);
								const newListing = await Promise.all(
									listingRes.map(async (item, i) => {
										setIsRecordStatus(item.RecordStatus);
										const getPhotoGallery = await GetUnitPhotos(item.id);

										const gallery = getPhotoGallery.data;

										const image = GetPhotoWithUrl(item.Photo);

										return {
											id: item.id,
											title: CapitalizeString(item.UnitName),
											price: AmountFormatterGroup(item.Price),
											status: "New",
											pics: image ? gallery.length + 1 : 1,
											img: image,
											no_of_bathrooms: item.BathRooms,
											lot: item.LotArea,
											property_no: item.PropertyNo,
											isFeatured: "yes",
											sale_type: CapitalizeString(item.SaleType),
											no_of_beds: item.BedRooms,
											// isFeatured: item.IsFeatured
											property_type: item.PropertyType,
											city: item.City,
											province: item.ProvinceState,
											recordStatus: item.RecordStatus,
											accessType: item.AccessType,
										};
									})
								);

								setFilteredAndSortedListings(newListing);
								setLoading(false);
							}
						}
					}
				}
			} catch (error) {
				console.error("Error fetching saved properties:", error);
			}
		};
		fetchSavedProperties();
	}, [selectedSort, tabOpened]);

	const navigate = useNavigate();
	const handleCardClick = (id) => {
		// window.location.hasdref = `/previewListing/${id}`;
		navigate(`/previewListing/?id=${id}`, { state: id });
	};
	const handleSelect = (value) => {
		console.log("vlaue: ", value);

		setSelectedSort(value);
		console.log("Selected sort type:", value);
	};
	const getListingLabel = (selectedSort) => {
		return selectedSort === "allListings"
			? "All Listings"
			: selectedSort === "pendingListings"
			? "Pending Lists"
			: selectedSort === "approvedListings"
			? "Approved Lists"
			: selectedSort === "deniedListings"
			? "Denied Lists"
			: "Unknown Listing";
	};

	const items = [
		{
			key: "savedProperties",
			label: "Saved Properties",
			children: (
				<div className="savedPropertiesContent">
					<p id="myPropertiesTextHeader">My Saved Properties</p>
					<p id="myPropertiesTextSubHeader">
						Access and manage your favorite properties in one place.
					</p>
					<RoundSelect
						options={SortTypes}
						size="middle"
						classname="card-item field"
						suffixIcon={<CaretDownOutlined />}
						value={selectedSort}
						onSelectionChange={(e) => handleSelect(e)}
					></RoundSelect>
					<div className="cardBackgroundSavedProperties">
						<div className="cardBackgroundPerRows">
							{!loading ? (
								filteredAndSortedListings.length > 0 && (
									<div className="listing-carousel-saved-properties">
										{filteredAndSortedListings.map((item, i) => {
											return (
												<CardListingComponent
													showDeleteIcon={
														isSavedPropertiesRoute && isSavedPropertiesTab
													}
													title={item.title}
													price={`PHP ${item.price}`}
													status={item.status}
													pics={item.pics}
													img={item.img}
													no_of_bathrooms={item.no_of_bathrooms}
													no_of_beds={item.no_of_beds}
													lot={item.lot}
													key={i}
													loading={loading}
													subtitle={`${
														item.property_type === "hotel/resort"
															? CapitalizeStringwithSymbol(item.property_type)
															: CapitalizeEachWord(item.property_type)
													} For ${CapitalizeString(item.sale_type)}`}
													listingId={item.property_no}
													handleClick={() => handleCardClick(item.property_no)}
													sale_status={item.sale_type}
													id={item.id}
													number={number}
													propertyNo={item.property_no}
												/>
											);
										})}
										<div
											style={{
												display: "none",
												justifyContent: "center",
											}}
											className="carousel--see-all-btn"
										>
											<SemiRoundBtn
												label={"See all new properties"}
												style={{
													borderColor: "#D90000",
													color: "#D90000",
													height: "38px",
													fontWeight: "600",
												}}
												handleClick={() =>
													navigate({
														pathname: "/new",
													})
												}
											/>
										</div>
									</div>
								)
							) : (
								<div
									className="listing-carousel-dashboard"
									style={{
										display: "flex",
									}}
								>
									{Array(3)
										.fill(null)
										.map((_, i) => {
											return <CardSkeleton key={i} />;
										})}
								</div>
							)}
						</div>
					</div>
				</div>
			),
		},
		{
			key: "propertyListings",
			label: "Property Listings",
			children: (
				<div className="savedPropertiesContent">
					<p id="myPropertiesTextHeader">My Property Listings</p>
					<p id="myPropertiesTextSubHeader">
						Easily view and manage all your listings in one place.
					</p>
					<RoundSelect
						options={SortTypes}
						size="middle"
						classname="card-item field"
						suffixIcon={<CaretDownOutlined />}
						value={selectedSort}
						onSelectionChange={(e) => handleSelect(e)}
					></RoundSelect>
					<div className="cardBackgroundSavedProperties">
						{!loading ? (
							filteredAndSortedListings.length !== 0 ? (
								<div className="listing-carousel-saved-properties">
									{currentItems.map((item, i) => {
										return (
											<CardListingComponent
												title={item.title}
												price={`PHP ${item.price}`}
												status={item.status}
												pics={item.pics}
												img={item.img}
												no_of_bathrooms={item.no_of_bathrooms}
												no_of_beds={item.no_of_beds}
												lot={item.lot}
												key={i}
												loading={loading}
												subtitle={`${
													item.property_type === "hotel/resort"
														? CapitalizeStringwithSymbol(item.property_type)
														: CapitalizeEachWord(item.property_type)
												} For ${CapitalizeString(item.sale_type)}`}
												listingId={item.property_no}
												handleClick={() => handleCardClick(item.property_no)}
												sale_status={item.sale_type}
												isSavedProperties={{
													atSavedPropertiesPage: true,
													isRecordStatus: item.recordStatus,
													isAccessType: item.accessType,
												}}
											/>
										);
									})}
								</div>
							) : (
								<NoDataAvailable
									message={`No available Data that was been in ${getListingLabel(
										selectedSort
									)}`}
								/>
							)
						) : (
							<div
								className="listing-carousel-dashboard"
								style={{
									display: "flex",
								}}
							>
								{Array(3)
									.fill(null)
									.map((_, i) => {
										return <CardSkeleton key={i} />;
									})}
							</div>
						)}
						{filteredAndSortedListings.length > 0 && (
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								paginate={setCurrentPage}
							/>
						)}
					</div>
				</div>
			),
		},
	];

	return (
		<>
			<div className="wholeViewSavedProperties">
				<div className="savedPropertiesBackgroundComponent">
					<Tabs defaultActiveKey="1" items={items} onChange={onChange} />
				</div>
			</div>
			<CustomMlFooter />
			<FooterComponent />
		</>
	);
};
export default SavedPropertiesComponent;
