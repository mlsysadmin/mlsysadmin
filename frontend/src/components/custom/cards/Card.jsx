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
import { getCookieData } from "../../../utils/CookieChecker";

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
	number,
}) => {
	// const isFeatured = forsale.toLowerCase() === "featured";
	const [isHeartFilled, setIsHeartFilled] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);
	const [properties, setProperties] = useState([]);
	const [isDeleted, setIsDeleted] = useState(false);
	const [savedProperties, setSavedProperties] = useState([]);
	const [savedPropertyId, setSavedPropertyId] = useState([]);
	const [userDetails, setUserDetails] = useState(null);

	const loadProperties = async () => {
		try {
			const fetchedProperties = await GetSavedPropertiesBySellerNo(number);
			setProperties(fetchedProperties.data);
			console.log("Fetched properties:", fetchedProperties.data);
			return fetchedProperties.data;
		} catch (error) {
			console.error("Failed to load properties:", error);
		}
	};

	const handleDeleteClick = async () => {
		try {
			const resApi = await DeleteSavedProperty(id);
			notification.success({
				message: "Property Deleted",
				description:
					"This property has been successfully deleted from your saved list.",
				placement: "topLeft",
			});
			if (showDeleteIcon) {
				await loadProperties();
				window.location.reload();	
			} else {
				console.log("No reload triggered because showDeleteIcon is false.");
			}
			console.log("Successfully deleted", resApi);

			setIsDeleted(true);
		} catch (error) {
			console.error("Failed to delete the property", error);
		}
	};

	useEffect(() => {
		if (isDeleted) {
			loadProperties();
		}
	}, [isDeleted]);

	const handleHeartClick = async () => {
		const accountDetails = getCookieData();
		const contactNum = accountDetails?.mobileNumber;
		setIsHeartFilled(!isHeartFilled);
		if (!contactNum) {
			console.log("Reacted but items are not saved.");
			return;
		}

		if (!isHeartFilled) {
			if (number && propertyNo) {
				const save = await AddSavedProperty(contactNum, propertyNo);
				// setSavedProperties(save.data);
				console.log("Saved properties after save:", save);
				setSavedPropertyId(save.id);
				console.log("Saved property id after save:", save.id);

				setShowTooltip(true);
				setTimeout(() => setShowTooltip(false), 800);
			} else {
				alert("Reacted but items are not saved.");
				return;
			}
		} else if (number && propertyNo) {
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
				{/* {
					isFeatured ? <p className="featured feature-tag">Featured</p> : <></>
				} */}
				<div className="likes">
					<CameraAltIcon />
					<b>{likes}</b>
				</div>
				<div className="bottomicns">
					<div
						className="icon"
						onClick={handleHeartClick}
						style={{ display: "flex", flexDirection: "column" }}
					>
						<Tooltip
							color="var(--red)"
							title="Added to favorites"
							open={showTooltip}
							placement="top"
						></Tooltip>
						{isHeartFilled ? <HeartFilled /> : <HeartOutlined />}
					</div>

					{/* <div className="icon">
            <TuneIcon />
          </div> */}
				</div>
			</div>
			<div className="card-content" onClick={handleClick}>
				<div className="card-listing-title-public">
					<h3>{title}</h3>
				</div>
				<div className="card-listing-subtitle-public">
					<h4>{subtitle}</h4>
				</div>

				<div className="bot">
					<p>{price}</p>
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
