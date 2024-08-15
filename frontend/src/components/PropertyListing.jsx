import React, { useState } from "react";
import styles from '../styles/ViewListing.module.css';
import redcamera from "../assets/icons/previewlisting/redcamera.png";
import viewlist from '../assets/images/viewlist.png';
import { GetPhotoFromDB, GetPhotoLength } from "../utils/GetPhoto";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const PropertyListing = ({ oneListing }) => {
  // List of images for the carousel
  const images = [
    GetPhotoFromDB(oneListing.listings.photos.photo),
    viewlist
  ];

  // State to keep track of the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to go to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

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
        <span className={styles.number}>{GetPhotoLength(oneListing.listings.photos.photo)}</span>
      </div>
      <div className={styles.carouselControls}>
        <LeftOutlined className={styles.leftIcon} onClick={prevImage} />
        <RightOutlined className={styles.rightIcon} onClick={nextImage} />
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
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0092cbb7221afbe64a740a834468c2dbcd416871a92c3642d9091fd0ade42c36?apiKey=e5af2e14d6ff40c0b0f04c88d87330a5&&apiKey=e5af2e14d6ff40c0b0f04c88d87330a5"
              className={styles.saveIcon}
              alt=""
            />
            <span className={styles.saveText}>Save</span>
          </button>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/002645e41b4dcbbec7c8028574854f1415da76ea61da78f79880478f20aa6982?apiKey=e5af2e14d6ff40c0b0f04c88d87330a5&&apiKey=e5af2e14d6ff40c0b0f04c88d87330a5"
            className={styles.moreOptionsIcon}
            alt="More options"
          />
        </div>
      </div>
    </article>
  );
}

export default PropertyListing;
