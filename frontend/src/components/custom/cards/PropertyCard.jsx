import React, { useState } from "react";
import "../../../styles/propertiesCard.css";

// COMPONENTS
import { Tooltip, Card } from "antd";
import { CustomTag } from "../../index";

// ICONS
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";
import ShortcutOutlinedIcon from "@mui/icons-material/ShortcutOutlined";
import {
	CameraFilled,
	CameraOutlined,
	HeartFilled,
	HeartOutlined,
} from "@ant-design/icons";
import { AddSavedProperty, DeleteSavedProperty } from "../../../api/PostListings";
import { getCookieData } from "../../../utils/CookieChecker";
import { useAuth } from "../../../Context/AuthContext";
import {
	CapitalizeString,
	TruncateText,
} from "../../../utils/StringFunctions.utils";

const PropertyCard = ({
	item,
	HandleCardClick,
	handleShowLoginModalMessage,
}) => {
	const [checked, setIsChecked] = useState(false);
	const [tooltipMessage, setTooltipMessage] = useState("Add to favorite");
	const [savedPropertyId, setSavedPropertyId] = useState([]);
	const [likes, setLikes] = useState([]);
	const [showTooltip, setShowTooltip] = useState(false);

	const { userDetails } = useAuth();
	const title = `100sqm House and Lot For Sale in Banilad Cebu City. 
    100sqm House and Lot For Sale in Banilad Cebu City. 
    100sqm House and Lot For Sale in Banilad Cebu City.
    100sqm House and Lot For Sale in Banilad Cebu City. 
    100sqm House and Lot For Sale in Banilad Cebu City.`;

	const Features = (no_of_beds, no_of_bathrooms, lot) => {
		return (
			<div className="properties-card__features">
				{parseInt(no_of_beds) > 0 && (
					<div className="feature-content">
						<>
							<BedOutlinedIcon />
							<p className="feature-detail">{no_of_beds}</p>
						</>
					</div>
				)}
				{parseInt(no_of_bathrooms) > 0 && (
					<div className="feature-content">
						<>
							<ShowerOutlinedIcon />
							<p className="feature-detail">{no_of_bathrooms}</p>
						</>
					</div>
				)}
				{lot && (
					<div className="feature-content">
						{/* <img src={Sqm} alt="sqm" className="feature-icon" /> */}
						<ShortcutOutlinedIcon />
						<p className="feature-detail">{lot} sqm</p>
					</div>
				)}
			</div>
		);
	};

	const HandleHeartChange = async (isChecked, tag, listingId) => {
		const id = listingId;

		let number = userDetails?.mobileNumber || null;

		const nextSelectedTags =
			isChecked && !likes.includes(id)
				? [...likes, id]
				: likes.filter((t) => t !== id);

		setLikes(nextSelectedTags);
		setIsChecked(isChecked);
		if (isChecked) {
			if (number && item.propertyNo) {
				try {
					const save = await AddSavedProperty(number, item.propertyNo);
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
				setTooltipMessage("Added to favorites.");
                
				setShowTooltip(false);
				setTimeout(() => setShowTooltip(false), 800);
				console.log("Reacted but items are not saved.");
			}
		} else if (number && item.propertyNo) {
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

	return (
		<Card className="properties--group-card__card-item">
			<div className="properties--group-card__card-image">
				<img
					src={item.photo}
					alt={`Property photo`}
					onClick={() => HandleCardClick(item.propertyNo)}
				/>
			</div>
			<div className="properties--group-card__card--tags">
				<div className="tag--top">
					<div className="properties--group-card--tag-wrapper">
						<div className="tag-value--text">
							<p>{item.saleType}</p>
						</div>
					</div>
					<div className="properties--group-card--tag-wrapper">
						<div className="tag-icon">
							<CameraFilled className="tag-icon__camera" />
						</div>
						<div className="tag-value">
							<div className="tag-value--text">
								<p>{item.imageCount}</p>
							</div>
						</div>
					</div>
				</div>
				<div className="tag--bottom">
					{userDetails?.mobileNumber ? (
						<Tooltip
							color="var(--red)"
							title={tooltipMessage}
							open={showTooltip}
							placement="top"
						>
							<div
								className="properties--group-card--tag-wrapper tag--heart"
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
								<div className="tag-icon icon-heart">
									<CustomTag
										tagLabel={
											checked ? (
												<HeartFilled style={{ color: "var(--red)" }} />
											) : (
												<HeartOutlined />
											)
										}
										style={{ fontSize: "23px", color: "#333333" }}
										className="circle-tags heart"
										checkable={true}
										checked={checked}
										handleChange={HandleHeartChange}
										listingId={item.propertyNo}
									/>
								</div>
							</div>
						</Tooltip>
					) : (
						<Tooltip
							color="var(--red)"
							title="Add to favorites"
							open={showTooltip}
							placement="top"
						>
							<div
								className="properties--group-card--tag-wrapper tag--heart"
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
								<div className="tag-icon icon-heart">
									<CustomTag
										tagLabel={<HeartOutlined />}
										style={{ fontSize: "23px", color: "#333333" }}
										className="circle-tags heart"
										checkable={true}
										checked={checked}
										handleChange={HandleHeartChange}
										listingId={item.propertyNo}
									/>
								</div>
							</div>
						</Tooltip>
					)}
				</div>
			</div>
			<div
				className="properties--group-card__details"
				onClick={() => HandleCardClick(item.propertyNo)}
			>
				<div className="properties--group-card__details--top">
					<p>
						{/* {TruncateText(CapitalizeString(title), 65)} */}
						{TruncateText(CapitalizeString(item.title), 100)}
					</p>
					{/* <p>Newly Built and Furnished Condominium dsdsffdsd dsds This is some long text that will not fit in the box.</p> */}
				</div>
				<div className="properties--group-card__details--middle">
					<p>{item.subtitle}</p>
				</div>
				<div className="properties--group-card__details--bottom">
					<div className="properties--group-card__details--bottom-left">
						<p>{item.price}</p>
					</div>
					<div className="properties--group-card__details--bottom-right">
						{Features(item.bedrooms, item.bathrooms, item.area)}
					</div>
				</div>
			</div>
		</Card>
	);
};

export default PropertyCard;
