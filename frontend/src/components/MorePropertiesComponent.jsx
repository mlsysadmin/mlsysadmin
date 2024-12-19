import { Button, Card, Tooltip } from "antd";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import {
	GetPropertiesBySaleStatus,
	GetUnitPhotos,
} from "../api/GetAllPublicListings";

import "../styles/moreProperties.css";
import {
	CapitalizeEachWord,
	CapitalizeString,
} from "../utils/StringFunctions.utils";

import { useNavigate, createSearchParams } from "react-router-dom";
import PropertyCard from "./custom/cards/PropertyCard";
import LoginMessageModal from "./modals/LoginMessageModal";

const MorePropertiesComponent = ({
	title,
	subtitle,
	propertyType,
	saleType,
	filterValue,
	filterProperty,
	searchProperty,
	isPaginated,
	isNavigated,
	isEffectCoverFlow,
}) => {
	const navigate = useNavigate();
	const [showLoginMessage, setShowLoginMessage] = useState(false);

	const [properties, setProperties] = useState([
		{
			title: "",
			photo: "",
			price: "",
			subtitle: "",
			area: "",
			bathrooms: "",
			bedrooms: "",
			isFeatured: false,
			saleType: "",
			imageCount: 0,
			city: "",
			propertyNo: "",
		},
	]);

	useEffect(() => {
		getListingByPropertyType();
	}, []);
	const handleShowLoginModal = () => {
		setShowLoginMessage(true);
	};
	const getListingByPropertyType = async () => {
		try {
			const getListingByPropertyType = await GetPropertiesBySaleStatus();

			const URL = process.env.REACT_APP_IGOT_API_URL;

			if (getListingByPropertyType.length > 0) {
				let filteredListing;

				filterProperty.forEach((fp) => {
					filteredListing = getListingByPropertyType.filter(
						(fList) => filterValue == fList[fp]
					);
				});

				filteredListing = filteredListing
					.filter(
						(listing) =>
							listing.PropertyType == propertyType &&
							listing.SaleType == saleType
					)
					.slice(0, 6);
				const listing = await Promise.all(
					filteredListing.map(async (list, i) => {
						const formatPrice = Number(list.Price).toLocaleString();
						const isRent = list.SaleType == "rent" || list.SaleType == "Rent";

						const getPhotoGallery = await GetUnitPhotos(list.id);

						const gallery = getPhotoGallery.data;

						return {
							title: CapitalizeString(list.UnitName),
							photo: `${URL}/${list.Photo}`,
							price: `PHP ${formatPrice}${isRent ? "/mo." : ""}`,
							subtitle: `${CapitalizeEachWord(
								list.PropertyType
							)} For ${CapitalizeString(list.SaleType)}`,
							area: list.LotArea,
							bathrooms: list.BathRooms,
							bedrooms: list.BedRooms,
							isFeatured: list.IsFeatured,
							saleType: `For ${CapitalizeString(list.SaleType)}`,
							imageCount: list.Photo ? gallery.length + 1 : 1,
							city: list.City,
							propertyNo: list.PropertyNo,
						};
					})
				);

				setProperties(listing);
			} else {
				setProperties([]);
			}
		} catch (error) {
			console.log(error);
			setProperties([]);
		}
	};

	const HandleCardClick = (listingId) => {
		console.log("dsfdgd", listingId);

		// navigate({
		//     pathname: `/previewListing/`,
		//     search: createSearchParams({
		//         id: listingId
		//     }).toString(),
		// })
		navigate(`/previewListing/?id=${listingId}`);
		navigate(0);
	};

	const PropertiesByPropertyType = () => {
		return properties.map((item, k) => {
			return (
				<div className="properties--group-card__card" key={k}>
					<PropertyCard
						item={item}
						HandleCardClick={HandleCardClick}
						handleShowLoginModalMessage={handleShowLoginModal}
					/>
				</div>
			);
            
		});

	};

	const SwiperCarouselProperties = () => {
		return (
			<Swiper
				slidesPerView={"auto"}
				centeredSlides={true}
				spaceBetween={30}
				effect={"coverflow"}
				grabCursor={true}
				coverflowEffect={{
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: false,
				}}
				navigation={isNavigated}
				pagination={isPaginated}
				modules={[EffectCoverflow, Pagination, Navigation]}
				className="mySwiper"
			>
				{properties.map((item, index) => (
					<SwiperSlide key={index} virtualIndex={index}>
						<div className="properties--group-card__card" key={index}>
							<PropertyCard item={item} HandleCardClick={HandleCardClick} />
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		);
	};

	const HandleClickView = () => {
		let params = "";

		searchProperty.forEach((item, i) => {
			if (i == 0) {
				params += `${item.key}=${item.value}`;
			} else {
				params += `&${item.key}=${item.value}`;
			}
		});

		navigate(`/search/?${params}`);
	};

	return (
		<>
			{properties.length > 0 && (
				<div className="properties--group-card">
					<div className="properties--group-card__header">
						<div className="properties--group-card__title">
							<h2>{title}</h2>
						</div>
						<div className="properties--group-card__sub-title">
							<p>{subtitle}</p>
						</div>
					</div>
					<div className="properties--group-card__cards properties__grid">
						<PropertiesByPropertyType />
						{showLoginMessage && (
							<LoginMessageModal setShowLoginMessage={setShowLoginMessage} />
						)}
					</div>
					<div className="properties--group-card__cards properties__swiper">
						<SwiperCarouselProperties />
					</div>
					<div className="properties--group-card__button">
						<Button
							size="large"
							className="properties--group-card__button"
							onClick={HandleClickView}
						>
							View more properties
						</Button>
					</div>
				</div>
			)}
		</>
	);
};

export default MorePropertiesComponent;
