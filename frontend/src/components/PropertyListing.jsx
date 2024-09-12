import React, { useState, useEffect } from "react";
import styles from "../styles/ViewListing.module.css";
import redcamera from "../assets/icons/previewlisting/redcamera.png";
import viewlist from "../assets/images/viewlist.png";
import CustomTag from "./custom/tags/Tags.custom";
import { GetAllPublicListing } from "../api/GetAllPublicListings";

import { GetPhotoFromDB, GetPhotoLength } from "../utils/GetPhoto";
import {
  LeftOutlined,
  RightOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";

const PropertyListing = ({ oneListing }) => {
  // List of images for the carousel

  const [publiclisting, setPublicListing] = useState([]);

  const allPublicListing = async () => {
    const res = await GetAllPublicListing();
    const dataresp = res.data;
    setPublicListing(dataresp);
    console.log("public listing:", dataresp);
  };

  useEffect(() => {
    allPublicListing();
  }, []);

  const images = publiclisting.map((data) =>
    GetPhotoFromDB(data.listings.photos.photo)
  );

  console.log("this is all", images);
  const [checked, setIsChecked] = useState(false);
  const [likes, setLikes] = useState([]);
  const handleChange = (isChecked, tag) => {
    // console.log("tag", tag);
    // console.log("check", isChecked);
    // setIsChecked(isChecked);

    const id = tag._owner.memoizedProps.listingId;

    const nextSelectedTags =
      isChecked && !likes.includes(id)
        ? [...likes, id]
        : likes.filter((t) => t !== id);

    setLikes(nextSelectedTags);
    setIsChecked(isChecked);
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  const isNextDisabled =
    images.length === 0 || currentImageIndex === images.length - 1;

  const isPrevDisabled = images.length === 0 || currentImageIndex === 0;

  return (
    <article className={styles.propertyCard}>
      <img
        loading="lazy"
        src={images[currentImageIndex]}
        className={styles.backgroundImage}
        alt="Property background"
      />
      <div className={styles.logoImage}>
        <img src={redcamera} className={styles.cameraImage} alt="Camera Icon" />
        <span className={styles.number}>
          {GetPhotoLength(oneListing.listings.photos.photo)}
        </span>
      </div>
      <div className={styles.carouselControls}>
        <LeftOutlined
          className={`${styles.leftIcon} ${
            isPrevDisabled ? styles.disabled : ""
          }`}
          onClick={!isPrevDisabled ? prevImage : null}
        />
        <RightOutlined
          className={`${styles.rightIcon} ${
            isNextDisabled ? styles.disabled : ""
          }`}
          onClick={!isNextDisabled ? nextImage : null}
        />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.statusPriceContainer}>
          <div className={styles.statusBadge}>
            {oneListing.listings.listing_type.listing_type}
          </div>
          <div className={styles.priceTag}>
            PHP {oneListing.listings.unit_details.price}
          </div>
        </div>
        <div className={styles.actionContainer}>
          <button className={styles.saveButton}>
            <CustomTag
              tagLabel={checked ? <HeartFilled /> : <HeartOutlined />}
              style={{
                fontSize: "23px",
                fontSize: "23px",
                color: "var(--red)",
                backgroundColor: checked ? "transparent" : "",
                padding: "0px 0px 0px 5px",
              }}
              className="circle-tags heart"
              checkable={true}
              checked={checked}
              handleChange={handleChange}
            />{" "}
            {/* <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0092cbb7221afbe64a740a834468c2dbcd416871a92c3642d9091fd0ade42c36?apiKey=e5af2e14d6ff40c0b0f04c88d87330a5&&apiKey=e5af2e14d6ff40c0b0f04c88d87330a5"
              className={styles.saveIcon}
              alt=""
            /> */}
            <span
              className={styles.saveText}
              style={{
                color: "var(--red",
                fontSize: "18px",
                padding: "0px 10px 0px 0px",
                fontWeight: "600",
              }}
            >
              Save
            </span>
          </button>
          {/* <img
						loading="lazy"
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/002645e41b4dcbbec7c8028574854f1415da76ea61da78f79880478f20aa6982?apiKey=e5af2e14d6ff40c0b0f04c88d87330a5&&apiKey=e5af2e14d6ff40c0b0f04c88d87330a5"
						className={styles.moreOptionsIcon}
						alt="More options"
					/> */}
        </div>
      </div>
    </article>
  );
};

export default PropertyListing;
