import React from "react";
import "../styles/rent.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
	CameraFilled,
	HeartOutlined,
	ControlOutlined,
	CalculatorOutlined,
	MessageOutlined
} from "@ant-design/icons";
import Card from "../components/custom/cards/Card";
import property from "../images/Guest/property.png";
import Pagination from "../components/custom/pagination/Pagination";
import {
	FooterComponent,
	CustomMlFooter,
	ListingSearch,
	MainLayout,
	SearchPropertiesSoration,
} from "../components";
import {
	GetPropertiesBySaleStatus,
	GetUnitPhotos,
} from "../api/GetAllPublicListings";
import { GetPhotoWithUrl, GetPhotoLength } from "../utils/GetPhoto";
import {
	CapitalizeEachWord,
	CapitalizeString,
	CapitalizeStringwithSymbol,
	FillLocationFilter,
	TruncateText,
	GetPropertyTitle,
	SortListings,
} from "../utils/StringFunctions.utils";
import { AmountFormatterGroup } from "../utils/AmountFormatter";
import DefaultPropertyImage from "../asset/fallbackImage.png";
import { CardSkeleton } from "../components/Skeleton";
import NoDataAvailable from "../components/NoDataFoundComponent";
import LoginMessageModal from "../components/modals/LoginMessageModal";
import { getCookieData } from "../utils/CookieChecker";
import { Breadcrumb, FloatButton } from "antd";
import {FloatBtnGroup} from "../components";
import ContactUsWidget from "../components/modals/ContactUsWidget";
import CalculatorWidgetModal from "../components/modals/CalculatorWidgetModal";

const ReadyForOccupancy = () => {
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();
	const location = useLocation();

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
			property_no: "",
			isFeatured: "",
			sale_type: "",
			no_of_beds: "",
			property_type: "",
			city: "",
		},
	]);
	const accountDetails = getCookieData();

	let number = accountDetails?.mobileNumber || null;
	const [propertyType, setPropertyType] = useState("house-and-lot");
	const [currentPage, setCurrentPage] = useState(1);
	const [showLoginMessage, setShowLoginMessage] = useState(false);
	const cardsPerPage = 9;
	const [filterLocation, setFilterLocation] = useState([]);
	const [headerText, setHeaderText] = useState("House and Lot For Sale");
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
	const [breadCrumbItems, setBreadCrumbItems] = useState([
		{
			title: "Ready For Occupancy",
		},
		{
			title: "House and Lot",
		},
	]);

	const [isContactUsFormVisible, setContactUsFormVisible] = useState(false);
	const [isCalculatorVisible, setCalculatorVisible] = useState(false);
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
	const handleShowLoginModal = () => {
		setShowLoginMessage(true);
	};

	const allPublicListing = async (property_type) => {
		try {
			const res = await GetPropertiesBySaleStatus();

			const dataresp = res;
			console.log(dataresp);
			

			if (dataresp.length == 0) {
				setPublicListing([]);
			} else {
				const removeSpecialChar = (ch) => {
					return ch.toLowerCase().replace(/[_-]/g, " ");
				};
				console.log(
					"data",
					dataresp.filter((listing) =>
						["ready for occupancy"].includes(listing.SaleType.toLowerCase())
					)
				);

				const listingRes = dataresp.filter(
					(listing) =>
						["Ready for Occupancy"].includes(listing.SaleType.toLowerCase()) &&
						listing.PropertyType.toLowerCase()
							.replace(/[-_]/g, " ")
							.includes(property_type.toLowerCase().replace(/[-_]/g, " "))
				);

				if (listingRes.length !== 0) {
					const newListing = await Promise.all(
						listingRes.map(async (item, i) => {
							const getPhotoGallery = await GetUnitPhotos(item.id);

							const gallery = getPhotoGallery.data;

							const image = GetPhotoWithUrl(item.Photo);

							return {
								id: item.id,
								title: CapitalizeString(item.UnitName),
								price: `PHP ${AmountFormatterGroup(item.Price)}`,
								status: "Ready for occupancy",
								pics: image ? gallery.length + 1 : 0,
								img: image,
								no_of_bathrooms: item.BathRooms,
								lot: item.LotArea,
								property_no: item.PropertyNo,
								isFeatured: item.IsFeatured,
								sale_type: CapitalizeString(item.SaleType),
								no_of_beds: item.BedRooms,
								property_type:
									item.PropertyType === "hotel/resort"
										? CapitalizeStringwithSymbol(item.PropertyType)
										: item.PropertyType,
								city: item.City,
								date: item.created_at,
								vendorId: item.VendorId,
							};
						})
					);
					const location = FillLocationFilter(dataresp);
					setFilterLocation(location);
					setPublicListing(newListing);
					setLoading(false);
				} else {
					setPublicListing([]);
					setLoading(false);
				}
			}
		} catch (error) {
			console.error("ERROROR", error);
			setPublicListing([]);
			setLoading(false);
		}
	};

	useEffect(() => {
		const search = location.search;
		console.log("search", search);

		const queryParams = new URLSearchParams(search);
		const getPropertyType = queryParams.get("property_type");

		if (queryParams.size !== 0) {
			let title = "";

			getPropertyType
				.trim()
				.replace(/[\/_-]/g, " ")
				.split(" ")
				.forEach((st) => {
					title += CapitalizeString(st) + " ";
				});
			title.trim();

			allPublicListing(getPropertyType);
			setPropertyType(getPropertyType);
			setHeaderText(`${title} Ready for occupancy`);
			setBreadCrumbItems([{ title: "Ready for occupancy" }, { title: title }]);
		} else {
			allPublicListing("house-and-lot");
			setPropertyType("house-and-lot");
			setHeaderText("House and Lot Ready for occupancy");
		}
	}, []);

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

	return (
		<div className="rent">
			<div className="rent-page-content">
				<div className="topbar">
					<ListingSearch
						location={filterLocation}
						searchParams={searchParams}
						setSearchFilters={setSearchParams}
					/>
				</div>
				<div className="rentContainer">
					<Breadcrumb
						separator=">"
						items={breadCrumbItems}
						className="rent-h1 breadcrumb--search"
					/>
					<span className="rent-h1">{headerText}</span>
					{/* <span className="rent-h1">{headerText}</span> */}
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
										beds={data.no_of_beds}
										baths={data.no_of_bathrooms}
										size={data.lot}
										likes={data.pics}
										forsale={data.status}
										subtitle={`${CapitalizeString(
											data.property_type
										)} For ${CapitalizeString(data.sale_type)}`}
										handleClick={() => handleCardClick(data.property_no)}
										propertyNo={data.property_no}
										vendorId={data.vendorId}
										number={number}
										handleShowLoginModalMessage={handleShowLoginModal}
									/>
								))}
								{showLoginMessage && (
									<LoginMessageModal
										setShowLoginMessage={setShowLoginMessage}
									/>
								)}
							</div>
						) : (
							<NoDataAvailable
								message={`No available ${CapitalizeEachWord(
									propertyType
								)} For Rent`}
							/>
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
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						paginate={setCurrentPage}
					/>
				</div>
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

export default ReadyForOccupancy;
