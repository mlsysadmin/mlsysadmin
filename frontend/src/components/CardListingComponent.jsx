import { Button, Card, FloatButton, Row, Tag } from "antd";
import React, { useEffect, useState } from "react";
import "../styles/cardListing.css";
import CustomImage from "./custom/images/Image.custom";
import Sqm from "../asset/icons/meters.png";
import Shower from "../asset/icons/showerhead.png";
import HotelBed from "../asset/icons/hotelbed.png";
import FilterIcon from "../asset/icons/slider.png";
import CustomTag from "./custom/tags/Tags.custom";
import { GetPropertiesBySaleStatus } from "../api/GetAllPublicListings";
import { Tooltip } from "antd";
import { GetPhotoWithUrl, GetPhotoLength } from "../utils/GetPhoto";
import { CameraFilled, HeartFilled, HeartOutlined } from "@ant-design/icons";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";
import ShortcutOutlined from "@mui/icons-material/ShortcutOutlined";
import { DeleteOutlined } from "@ant-design/icons";
import { AddSavedProperty, DeleteSavedProperty } from "../api/PostListings";
import { notification } from "antd";
import PreviewLoadingModal from "./modals/PreviewLoadingModal";
import { GetSavedPropertiesBySellerNo } from "../api/Public/SavedProperties.api";
import { getCookieData } from "../utils/CookieChecker";
import { useAuth } from "../Context/AuthContext";
import { TruncateText } from "../utils/StringFunctions.utils";

const CardListingComponent = ({
	loading,
	status,
	pics,
	title,
	price,
	features,
	listingId,
	no_of_bathrooms,
	lot,
	img,
	handleClick,
	subtitle,
	no_of_beds,
	sale_status,
	isSavedProperties,
	showDeleteIcon,
	id,
	handleShowLoginModalMessage,
	propertyNo,
}) => {
	const [checked, setIsChecked] = useState(false);
	const [likes, setLikes] = useState([]);
	const [tooltipMessage, setTooltipMessage] = useState("Add to favorite");
	const [showTooltip, setShowTooltip] = useState(false);
	const [properties, setProperties] = useState([]);
	const [isDeleted, setIsDeleted] = useState(false);
	const [savedProperties, setSavedProperties] = useState([]);
	const [savedPropertyId, setSavedPropertyId] = useState([]);
	const [isDeleting, setIsDeleting] = useState(false);

	const { userDetails } = useAuth();

	const ImageTag = () => (
		<div className="image-tag">
			<CameraFilled />
			<p>{pics}</p>
		</div>
	);

	const Filter = () => (
		<div className="image-tag">
			<img src={FilterIcon} alt="filter-icon" />
		</div>
	);

	const handleChange = async (isChecked, tag, listingId) => {
		const id = listingId;

		let number = userDetails?.mobileNumber || null;

		const nextSelectedTags =
			isChecked && !likes.includes(id)
				? [...likes, id]
				: likes.filter((t) => t !== id);

		setLikes(nextSelectedTags);
		setIsChecked(isChecked);
		if (isChecked) {
			if (number && propertyNo) {
				try {
					const save = await AddSavedProperty(number, propertyNo);
					setSavedPropertyId(save.id);
					console.log("Property saved with ID:", save.id);
					setTooltipMessage("Added to favorites");
					setShowTooltip(true);
					setTimeout(() => setShowTooltip(false), 800);
				} catch (error) {
					console.error("Error saving property:", error);
				}
			} else {
				handleShowLoginModalMessage();
				console.log("Reacted but items are not saved.");
				setTooltipMessage("Added to favorites");
				setShowTooltip(false);
				setTimeout(() => setShowTooltip(false), 800);
			}
		} else if (number && propertyNo) {
			if (savedPropertyId) {
				console.log("Attempting to delete property with ID:", savedPropertyId);
				const resApi = await DeleteSavedProperty(savedPropertyId);
				console.log("Deleted property with ID:", resApi);
			} else {
				console.log("Property not found in saved properties");
			}
		} else {
			console.log("Property not found in saved properties");
		}
	};
	const toPascalCase = (str) => {
		return str
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join("");
	};

	useEffect(() => {
		if (showDeleteIcon && !isDeleted) {
			setIsChecked(true);
		}
	}, [showDeleteIcon, isDeleted]);

	// const loadProperties = async () => {
	// 	try {
	// 		const fetchedProperties = await GetSavedPropertiesBySellerNo(
	// 			userDetails.mobileNumber
	// 		);
	// 		setProperties(fetchedProperties.data);
	// 		console.log("Fetched properties:", fetchedProperties.data);

	// 		return fetchedProperties.data;
	// 	} catch (error) {
	// 		console.error("Failed to load properties:", error);
	// 	}
	// };
	// useEffect(() => {
	// 	loadProperties();
	// }, []);

	const handleDeleteClick = async () => {
		setIsDeleting(true);
		try {
			const resApi = await DeleteSavedProperty(id);

			console.log("Successfully deleted", resApi);

			if (resApi !== null) {
				await GetSavedPropertiesBySellerNo(userDetails.mobileNumber);
				window.location.reload();
				window.addEventListener("load", () => {
					setIsDeleting(false);
				});
				setIsDeleting(false);
				setIsDeleted(true);
			}
		} catch (error) {
			console.error("Failed to delete the property", error);
			setIsDeleting(false);
		}
	};
	// useEffect(() => {
	// 	if (isDeleted) {
	// 		loadProperties();
	// 	}
	// }, [isDeleted]);

	return (
		<div id="card-listing">
			<Card
				// style={{
				//     width: 350,
				// }}
				size="small"
				bordered={false}
				loading={loading}
			>
				<div className="listing-image">
					<img src={img} className="property-img" onClick={handleClick}></img>
					<div className="tags">
						{isSavedProperties?.atSavedPropertiesPage ? (
							isSavedProperties.isRecordStatus === "active" ? (
								<div className="rightTag">
									<CustomTag
										tagLabel="Approved"
										style={{
											backgroundColor: "green",
											borderColor: "green",
											color: "white",
											borderRadius: "25px",
										}}
									/>
									<CustomTag
										tagLabel={isSavedProperties.isAccessType}
										style={{
											backgroundColor: "white",
											borderColor: "white",
											color: "black",
											borderRadius: "25px",
										}}
									/>
								</div>
							) : isSavedProperties.isRecordStatus === "pending" ? (
								<CustomTag
									tagLabel={isSavedProperties.isRecordStatus}
									style={{
										backgroundColor: "#FBBC04",
										borderColor: "#FBBC04",
										color: "white",
										borderRadius: "25px",
									}}
								/>
							) : isSavedProperties.isRecordStatus === "rejected" ? (
								<CustomTag
									tagLabel="Denied"
									style={{
										backgroundColor: "white",
										borderColor: "white",
										color: "red",
										borderRadius: "25px",
									}}
								/>
							) : null
						) : (
							<CustomTag
								tagLabel={status}
								style={{
									backgroundColor: "#d90000",
									borderColor: "#d90000",
									color: "#ffffff",
								}}
							/>
						)}
						<CustomTag tagLabel={<ImageTag />} />
					</div>
					<div
						className="tags-right"
						style={{ display: "flex", flexDirection: "column" }}
					>
						{userDetails?.mobileNumber ? (
							<Tooltip
								color="var(--red)"
								title={tooltipMessage}
								visible={showTooltip}
								placement="top"
							>
								<div
									className="tags-tooltip"
									style={{ display: "flex", flexDirection: "row" }}
									onMouseEnter={() => {
										if (!checked) {
											setTooltipMessage("Add to favorite");
											setShowTooltip(true);
										}
									}}
									onMouseLeave={() => {
										if (!checked) setShowTooltip(false);
									}}
								>
									<CustomTag
										tagLabel={
											checked ? (
												<HeartFilled
													style={{
														color: showDeleteIcon ? "var(--red)" : "var(--red)",
														pointerEvents: showDeleteIcon ? "none" : "auto",
													}}
												/>
											) : (
												<HeartOutlined />
											)
										}
										style={{ fontSize: "23px", color: "#333333" }}
										className="circle-tags heart"
										checkable={true}
										checked={checked}
										handleChange={(newChecked) => {
											if (!showDeleteIcon) {
												setIsChecked(newChecked);
												handleChange(newChecked);
											}
										}}
										listingId={listingId}
									/>{" "}
									{showDeleteIcon && (
										<Tooltip title="Delete Saved Property" placement="top">
											<div
												className="icon"
												onClick={handleDeleteClick}
												style={{ top: "8px" }}
											>
												<DeleteOutlined />
											</div>
										</Tooltip>
									)}
								</div>
							</Tooltip>
						) : (
							<Tooltip
								color="var(--red)"
								title={"Add to favorites"}
								visible={showTooltip}
								placement="top"
							>
								<div
									className="tags-tooltip"
									style={{ display: "flex", flexDirection: "row" }}
									onMouseEnter={() => {
										if (!checked) {
											setTooltipMessage("Add to favorite");
											setShowTooltip(true);
										}
									}}
									onMouseLeave={() => {
										if (!checked) setShowTooltip(false);
									}}
								>
									<CustomTag
										tagLabel={<HeartOutlined />}
										style={{ fontSize: "23px", color: "#333333" }}
										className="circle-tags heart"
										checkable={true}
										checked={checked}
										handleChange={(newChecked) => {
											if (!showDeleteIcon) {
												setIsChecked(newChecked);
												handleChange(newChecked);
											}
										}}
										listingId={listingId}
									/>{" "}
									{showDeleteIcon && (
										<div
											className="icon"
											onClick={handleDeleteClick}
											style={{ top: "8px" }}
										>
											<DeleteOutlined />
										</div>
									)}
								</div>
							</Tooltip>
						)}

						{/* <CustomTag tagLabel={<Filter />} className="circle-tags" /> */}
					</div>
				</div>
				<div className="card-content" onClick={handleClick}>
					<div className="card-content--title">
						<p>{TruncateText(title)}</p>
					</div>
					<div className="card-content--sub">
						<h5>{subtitle}</h5>
					</div>
					<Row className="card-content--subtitle">
						<p className="price">
							{price}
							{/* {sale_status.toLowerCase() == "rent" ? "/month" : ""} */}
						</p>
						<div className="card-features">
							{/* <Features /> */}
							{parseInt(no_of_beds) > 0 && (
								<div className="feature-content">
									<>
										{/* < img
                        src={HotelBed}
                        alt="sqm"
                        className="feature-icon"
                        style={{ color: "#333333" }}
                      /> */}
										<BedOutlinedIcon />
										<p className="feature-detail">{no_of_beds}</p>
									</>
								</div>
							)}
							{parseInt(no_of_bathrooms) > 0 && (
								<div className="feature-content">
									<>
										{/* < img
                        src={ShortcutOutlined}
                        alt="sqm"
                        className="feature-icon"
                        style={{ color: "#333333" }}
                      /> */}
										<ShowerOutlinedIcon />
										<p className="feature-detail">{no_of_bathrooms}</p>
									</>
								</div>
							)}
							{lot && (
								<div className="feature-content">
									{/* <img src={Sqm} alt="sqm" className="feature-icon" /> */}
									<ShortcutOutlined />
									<p className="feature-detail">{lot} SqM</p>
								</div>
							)}
						</div>
					</Row>
				</div>
			</Card>
		</div>
	);
};

export default CardListingComponent;
