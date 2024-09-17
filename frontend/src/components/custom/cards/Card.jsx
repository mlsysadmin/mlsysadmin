import React from "react";
import "../../../styles/Card.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TuneIcon from "@mui/icons-material/Tune";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import ShowerOutlinedIcon from '@mui/icons-material/ShowerOutlined';
import ShortcutOutlinedIcon from '@mui/icons-material/ShortcutOutlined';
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const Card = ({
	loading,
	status,
	pics,
	title,
	price,
	features,
	listingId,
	no_of_bathrooms,
	bed,
	subtitle,
	lot,
	img,
	handleClick,
}) => {
	const isFeatured = status === "featured";
	const [isHeartFilled, setIsHeartFilled] = useState(false);

	const handleHeartClick = () => {
		setIsHeartFilled(!isHeartFilled);
	};
	// const navigate = useNavigate();

	// const handleCardClick = () => {
	//   onClick(id);;
	// };

	return (
		<div className="card" style={{ cursor: "pointer" }}>
			<div className="cardImage">
				<img
					src={img}
					alt={title}
					className="card-img"
					onClick={handleClick}
					loading={loading}
				/>
				<p
					className={isFeatured ? "featured" : ""}
					style={{
						color:
							status === "New"
								? "#ffffff"
								: status === "For Sale"
								? "#000000"
								: status === "For Rent"
								? "#000000"
								: "White",
						backgroundColor:
							status === "New"
								? "var(--red)"
								: status === "For Sale"
								? "#ffffff"
								: status === "For Rent"
								? "#ffffff"
								: "var(--red)",
					}}
				>
					{status}
				</p>
				<div className="likes">
					<CameraAltIcon />
					<b>{pics}</b>
				</div>
				<div className="bottomicns">
					<div className="icon" onClick={handleHeartClick}>
						{isHeartFilled ? <HeartFilled /> : <HeartOutlined />}
					</div>
					{/* <div className="icon">
            <TuneIcon />
          </div> */}
				</div>
			</div>
			<div className="card-content" onClick={handleClick}>
				<h3>{title}</h3>
				<h4>{subtitle}</h4>
				<div className="bot">
					<div className="card-price-detail">
						<p>{price}/month</p>
					</div>
					<div className="card-icons">
						<p>
							<span>
								<BedOutlinedIcon />

								<label id="bed-icon">{bed}</label>
								<ShowerOutlinedIcon />
							</span>{" "}
							{no_of_bathrooms}
							<span></span>
							<span>
								<ShortcutOutlinedIcon />
							</span>{" "}
							{lot} SqM
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
