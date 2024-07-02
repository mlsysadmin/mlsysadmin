import React from "react";
import "../../../styles/Card.css";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TuneIcon from "@mui/icons-material/Tune";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import ShowerOutlinedIcon from '@mui/icons-material/ShowerOutlined';
import ShortcutOutlinedIcon from '@mui/icons-material/ShortcutOutlined';

const Card = ({
  title,
  subtitle,
  price,
  imgSrc,
  beds,
  baths,
  size,
  likes,
  forsale,
}) => {
  const isFeatured = forsale.toLowerCase() === "featured";

  return (
    <div className="card">
      <div className="cardImage">
        <img src={imgSrc} alt={title} className="card-img" />
        <p
          className={isFeatured ? "featured" : ""}
          style={{
            color:
              forsale === "New"
                ? "green"
                : forsale === "For Sale"
                  ? "red"
                  : forsale === "For Rent"
                    ? "orange"
                    :forsale === "For Lease"
                      ?"blue"
                      : "inherit",
          }}
        >
          {forsale}
        </p>
        <div className="likes">
          <CameraAltIcon />
          <b>{likes}</b>
        </div>
        <div className="bottomicns">
          <div className="icon">
            <FavoriteBorderOutlinedIcon />
          </div>
          <div className="icon">
            <TuneIcon />
          </div>
        </div>
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <h4>{subtitle}</h4>
        <div className="bot">
          <div className="card-price-detail">
            <p>{price}</p>
          </div>
          <div className="card-icons">
            <p>
              {beds} <span  id="bed-icon"><BedOutlinedIcon/></span> • {baths} <span><ShowerOutlinedIcon /></span> • <span><ShortcutOutlinedIcon /></span> {size} SqM
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Card;
