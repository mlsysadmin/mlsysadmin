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
import NoDataAvailable from "./NoDataFoundComponent";
import { CapitalizeEachWord } from "../utils/StringFunctions.utils";

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
}) => {
  const [checked, setIsChecked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
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

  const handleChange = (isChecked, tag, listingId) => {
    const id = listingId;

    const nextSelectedTags =
      isChecked && !likes.includes(id)
        ? [...likes, id]
        : likes.filter((t) => t !== id);

    setLikes(nextSelectedTags);
    setIsChecked(isChecked);
    if (isChecked) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 800);
    }
  };
  const toPascalCase = (str) => {
    return str
      .split(" ") // Split the string into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
      .join(""); // Join the words back together
  };
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
            {isSavedProperties.atSavedPropertiesPage ? (
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
            <Tooltip
              color="var(--red)"
              title="Added to favorites"
              visible={showTooltip}
              placement="top"
            ></Tooltip>
            <CustomTag
              tagLabel={checked ? <HeartFilled /> : <HeartOutlined />}
              style={{ fontSize: "23px", color: "#333333" }}
              className="circle-tags heart"
              checkable={true}
              checked={checked}
              handleChange={handleChange}
              listingId={listingId}
            />{" "}
            {/* <CustomTag tagLabel={<Filter />} className="circle-tags" /> */}
          </div>
        </div>
        <div className="card-content" onClick={handleClick}>
          <div className="card-content--title">
            <p>{title}</p>
          </div>
          <div className="card-content--sub">
            <h5>{subtitle}</h5>
          </div>
          <Row className="card-content--subtitle">
            <p className="price">
              {price}
              {sale_status.toLowerCase() == "rent" ? "/month" : ""}
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
