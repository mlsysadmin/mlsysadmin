import React, { useEffect } from "react";
import "../../../styles/Card.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TuneIcon from "@mui/icons-material/Tune";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";
import ShortcutOutlinedIcon from "@mui/icons-material/ShortcutOutlined";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { AddSavedProperty, DeleteSavedProperty } from "../../../api/PostListings";
import { notification } from "antd";
import { GetSavedPropertiesBySellerNo } from "../../../api/Public/SavedProperties.api";
import { searchKyc } from "../../../api/Public/User.api";

import { DeleteOutlined } from "@ant-design/icons";
import { useAuth } from "../../../Context/AuthContext";
import { getCookieData } from "../../../utils/CookieChecker";
import { TruncateText } from "../../../utils/StringFunctions.utils";

const Card = ({
	id,
	title,
	subtitle,
	price,
	imgSrc,
	beds,
	baths,
	size,
	likes,
	forsale,
	handleClick,
	propertyNo,
	isFeatured,
	showDeleteIcon,
	handleShowLoginModalMessage,
}) => {
	// const isFeatured = forsale.toLowerCase() === "featured";
	const [isHeartFilled, setIsHeartFilled] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);
	const [properties, setProperties] = useState([]);
	const [isDeleted, setIsDeleted] = useState(false);

	const [savedProperties, setSavedProperties] = useState([]);
	const [savedPropertyId, setSavedPropertyId] = useState([]);
	// const [userDetails, setUserDetails] = useState(null);

	const { userDetails } = useAuth();

	const loadProperties = async () => {
		try {
			const fetchedProperties = await GetSavedPropertiesBySellerNo(
				userDetails.mobileNumber
			);
			setProperties(fetchedProperties.data);
			console.log("Fetched properties:", fetchedProperties.data);
			return fetchedProperties.data;
		} catch (error) {
			console.error("Failed to load properties:", error);
		}
	};

	useEffect(() => {
		if (isDeleted) {
			loadProperties();
		}
	}, [isDeleted]);

	const handleHeartClick = async () => {
		// const accountDetails = getCookieData();
		const contactNum = userDetails?.mobileNumber || null;
		setIsHeartFilled(!isHeartFilled);
		if (!contactNum) {
			handleShowLoginModalMessage();
			setShowTooltip(false);
			console.log("Reacted but items are not saved.");
			return;
		}

		if (!isHeartFilled) {
			if (contactNum && propertyNo) {
				try {
					const save = await AddSavedProperty(contactNum, propertyNo);
					console.log("Saved properties after save:", save);
					setSavedPropertyId(save.id);
					console.log("Saved property id after save:", save.id);

					setShowTooltip(true);
					setTimeout(() => setShowTooltip(false), 800);
				} catch (error) {
					console.error("Error saving property:", error);
				}
			} else {
				handleShowLoginModalMessage();
				alert("Reacted but items are not saved.");
				return;
			}
		} else if (contactNum && propertyNo) {
			if (savedPropertyId) {
				console.log("Attempting to delete property with ID:", savedPropertyId);
				const resApi = await DeleteSavedProperty(savedPropertyId);
				console.log("Deleted property with ID:", resApi);

				// handleDeleteClick(savedPropertyId);
			} else {
				console.log("Property not ");
			}
		} else {
			console.log("Property not found in saved properties");
		}
	};

	// const navigate = useNavigate();

	// const handleCardClick = () => {
	//   onClick(id);;
	// };

	return (
		<div className="card" style={{ cursor: "pointer" }}>
			<div className="cardImage">
				<img
					src={imgSrc}
					alt={title}
					className="card-img"
					onClick={handleClick}
				/>
			</div>
			<div className="card-tags-listings">
				<div className="card-tags-top">
					<p
						className={isFeatured ? "featured" : ""}
						style={{
							color:
								forsale === "New"
									? "#ffffff"
									: forsale === "For Sale"
									? "#000000"
									: forsale === "For Rent"
									? "#000000"
									: "White",
							backgroundColor:
								forsale === "New"
									? "var(--red)"
									: forsale === "For Sale"
									? "#ffffff"
									: forsale === "For Rent"
									? "#ffffff"
									: "var(--red)",
						}}
					>
						{forsale}
					</p>
					<div className="likes">
						<CameraAltIcon />
						<b>{likes}</b>
					</div>
				</div>
				<div className="card-tags-bottom">
					<div
						className="icon"
						onClick={handleHeartClick}
						style={{ display: "flex", flexDirection: "column" }}
					>
						{userDetails?.mobileNumber ? (
							<Tooltip
								color="var(--red)"
								title={
									isHeartFilled ? "Added to favorites" : "Add to favorites"
								}
								placement="top"
							>
								<div className="heart-icon">
									{isHeartFilled ? (
										<HeartFilled style={{ color: "var(--red)" }} />
									) : (
										<HeartOutlined />
									)}
								</div>
							</Tooltip>
						) : (
							<Tooltip
								color="var(--red)"
								title="Add to favorites"
								placement="top"
							>
								<div className="heart-icon">
										<HeartOutlined />
								</div>
							</Tooltip>
						)}
					</div>

					{/* <div className="icon">
            <TuneIcon />
          </div> */}
				</div>
			</div>

			<div className="card-content" onClick={handleClick}>
				<div className="card-listing-title-public">
					<p>{TruncateText(title)}</p>
				</div>
				<div className="card-listing-subtitle-public">
					<label>{subtitle}</label>
				</div>

				<div className="bot">
					<div className="bot-left-card-text">
						<p>{price}</p>
					</div>

					<div className="card-icons">
						{beds > 0 && (
							<div className="card-icons--feature">
								<BedOutlinedIcon />
								<label id="bed-icon">{beds}</label>
							</div>
						)}

						{baths > 0 && (
							<div className="card-icons--feature">
								<ShowerOutlinedIcon />
								<label htmlFor="">{baths}</label>
							</div>
						)}
						{size > 0 && (
							<div className="card-icons--feature">
								<ShortcutOutlinedIcon />
								<label htmlFor="">{size} SqM</label>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
