import React from "react";
import "../styles/rent.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
	CameraFilled,
	HeartOutlined,
	ControlOutlined,
} from "@ant-design/icons";
import Card from "./custom/cards/Card";
import property from "../images/Guest/property.png";
import Pagination from "./custom/pagination/Pagination";
import { FooterComponent, CustomMlFooter, ListingSearch, MainLayout, SearchPropertiesSoration } from "../components";
import { GetPropertiesBySaleStatus, GetUnitPhotos } from "../api/GetAllPublicListings";
import { GetPhotoWithUrl, GetPhotoLength } from "../utils/GetPhoto";
import { CapitalizeString, GetPropertyTitle } from "../utils/StringFunctions.utils";
import { AmountFormatterGroup } from "../utils/AmountFormatter";
import DefaultPropertyImage from '../asset/fallbackImage.png';
import NoDataAvailable from "./NoDataFoundComponent";

const RentComponent = () => {

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
			property_no: '',
			isFeatured: '',
			sale_type: '',
			no_of_beds: '',
			property_type: ''
		}
	]);
	const [propertyType, setPropertyType] = useState("house");
	const [currentPage, setCurrentPage] = useState(1);
	const cardsPerPage = 9;

	const handleCardClick = (id) => {
		navigate(`/previewListing/?id=${id}`, { state: id });
	};

	const allPublicListing = async (property_type) => {
		try {
			const res = await GetPropertiesBySaleStatus();

			const dataresp = res.data;

			if (dataresp.length == 0) {
				setPublicListing([])
			} else {

				console.log("rent", dataresp.filter((item) => ["rent"].includes(item.SaleType.toLowerCase())));

				const listingRes = dataresp.filter((listing) =>
					["rent"].includes(listing.SaleType.toLowerCase()) &&
					property_type.toLowerCase() == listing.PropertyType.toLowerCase() &&
					listing.PropertyType.replace('/', " ").includes(property_type)
				);

				if (listingRes.length !== 0) {
					const newListing = await Promise.all(listingRes.map(async (item, i) => {

						const getPhotoGallery = await GetUnitPhotos(item.id);

						const gallery = getPhotoGallery.data;

						const image = GetPhotoWithUrl(item.Photo);

						return {
							id: item.id,
							title: CapitalizeString(GetPropertyTitle(item.ProjectName, item.UnitName)),
							price: AmountFormatterGroup(item.Price),
							status: "For Rent",
							pics: image ? gallery.length + 1 : 0,
							img: image,
							no_of_bathrooms: item.BathRooms,
							lot: item.LotArea,
							property_no: item.PropertyNo,
							isFeatured: item.IsFeatured,
							sale_type: CapitalizeString(item.SaleType),
							no_of_beds: item.BedRooms,
							property_type: item.PropertyType
						}
					}))
					setPublicListing(newListing);

				} else {
					setPublicListing([]);
				}

			}

		} catch (error) {
			console.error("ERROROR", error);
			setPublicListing([]);
		}
	}

	useEffect(() => {

		const search = location.search;
		console.log(search);

		const queryParams = new URLSearchParams(search);
		const getPropertyType = queryParams.get("property_type");

		if (queryParams.size !== 0) {

			allPublicListing(getPropertyType);
			setPropertyType(getPropertyType);
		} else {
			allPublicListing("house");
		}

	}, [])

	const indexOfLastCard = currentPage * cardsPerPage;
	const indexOfFirstCard = indexOfLastCard - cardsPerPage;
	const currentCards = publiclisting.slice(indexOfFirstCard, indexOfLastCard);

	const totalPages = Math.ceil(publiclisting.length / cardsPerPage);

	return (
		<div className="rent">
			<div className="topbar">
				<ListingSearch />
			</div>
			<div className="rentContainer">
				<span className="rent-h1">Properties for Rent</span>

				{
					currentCards.length !== 0 ? (
						<>
							<SearchPropertiesSoration properties_count={publiclisting.length} current_properties_count={currentCards.length} />
							<div className="card-container">
								{
									currentCards.map((data, index) => (
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
											subtitle={`${CapitalizeString(data.property_type)} For ${CapitalizeString(data.sale_type)}`}
											handleClick={() => handleCardClick(data.property_no)}
										/>
									))

								}
							</div>
						</>
					)
						:
						<NoDataAvailable
							message={`No available ${CapitalizeString(propertyType.replace(/[-_]/g, " "))} for rent`}
						/>
				}
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					paginate={setCurrentPage}
				/>
			</div>
			<CustomMlFooter />
			<FooterComponent />

		</div>
	);
}

export default RentComponent;
