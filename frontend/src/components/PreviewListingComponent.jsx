import React, { useState } from "react";
// import Navigation from "./layout/NavigationComponent";
import Footer from "./MY Drafts/Components/FooterComponent";
import "../styles/previewListing.css";
import bedroom from "../assets/images/image1.png";
import livingroom from "../assets/images/image2.png";
import bathroom from "../assets/images/image3.png";
import fabackward from "../assets/images/fabackward.png";
import image701 from "../assets/images/image701.png";
import image702 from "../assets/images/image702.png";
import image703 from "../assets/images/image703.png";
import image704 from "../assets/images/image704.png";
import image705 from "../assets/images/image705.png";
import filter_alt from "../assets/icons/previewlisting/filter_alt.png";
import share from "../assets/icons/previewlisting/share.png";
import printer from "../assets/icons/previewlisting/printer.png";
import location from "../assets/icons/previewlisting/location.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import camera from "../assets/icons/previewlisting/camera.png";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
// import ApplicationDetailModal from "./layout/ApplicationDetails/ApplicationDetailsModal";
import PreviewListLeftContent from "./PreviewListLeftContent";
import PreviewListRightSideContent from "./PreviewListRightSideContent";




const PreviewListing = () => {
  const [amountInPesos, setPesos] = React.useState(500);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [smallImages, setSmallImages] = React.useState([livingroom, bathroom]); // Initial small images
  const [photoCount, setPhotoCount] = React.useState(); // Initial photo count
  const [stepsGap, setStepsGap] = React.useState(20); // Interest rate in percent
  const [homePrice, setHomePrice] = React.useState(1000000); // Initial home price
  const [downPayment, setDownPayment] = React.useState(100000); // Initial down payment

  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const handleButtonClick = () => {
    setShowApplicationModal(true);
  };

  const handleCloseModal = () => {
    setShowApplicationModal(false);
  };

  const term = 30; // Fixed term in years
  const termInMonths = term * 12; // Convert term to months

  // Calculate total home price with interest
  const totalHomePrice = homePrice + homePrice * (stepsGap / 100);

  // Calculate monthly payment
  const monthlyPayment = (totalHomePrice - downPayment) / termInMonths;
  const handlePesosChange = (newPesos) => {
    setPesos(newPesos);
  };

  //sa Kadtu nig pag next sa mga photo
  const images = [
    bedroom,
    livingroom,
    bathroom,
    image701,
    image702,
    image703,
    image704,
    image705,
  ];

  const previousImage = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    updateSmallImages(newIndex);
  };
  

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    updateSmallImages(newIndex);
  };

  const updateSmallImages = (newIndex) => {
    // Get the next 2 main images after the current index
    const nextIndex1 = (newIndex + 1) % images.length;
    const nextIndex2 = (newIndex + 2) % images.length;

    const newSmallImages = [images[nextIndex1], images[nextIndex2]];
    setSmallImages(newSmallImages);

    // Update photo count based on new index
    const newPhotoCount = getPhotoCountForMainImage(newIndex);
    setPhotoCount(newPhotoCount);
  };

  const getPhotoCountForMainImage = (index) => {
    // Add logic to get the photo count for each main image
    // For example, you can have an object that maps image index to photo count
  };

  //pag add sa paborito
  const [isFavorite, setIsFavorite] = React.useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };



  return (
    <div className="previewlist">
      {/* <Navigation /> */}

      <div
        className="contentContainer"
        style={{ display: "flex", width: "100%", gap: "1rem" }}
      >
        <div className="real-estate-listing-card">
          <div className="galleryComponent">
            <div className="gallery">
              <div className="image-container-large">
                <img
                  src={images[currentIndex]}
                  alt="Preview"
                  className="all-images"
                />

                <div className="centered">PHP 120,000,000</div>

                <div className="icns">
  <div className="bottom-right">
    <div className="icon-circle" onClick={toggleFavorite}>
      <div className={`heart-icon ${isFavorite ? "favorite" : ""}`}>
        <span className="material-symbols-outlined">
          {isFavorite ? "favorite" : "favorite_border"}
        </span>
      </div>
    </div>
  </div>
  <div className="right">
    <div className="icon-circle">
      <img src={filter_alt} className="fas fa-filter" alt="Filter" />
    </div>
  </div>
  <div className="Printer">
    <div className="icon-circle">
      <img src={printer} alt="Printer" />
    </div>
  </div>
  <div className="share">
    <div className="icon-circle">
      <img src={share} alt="Share" />
    </div>
  </div>
</div>

                <div className="prev-next">
                  <div className="backward" onClick={previousImage}>
                    <img
                      src={fabackward}
                      width="40"
                      height="40"
                      alt="Previous"
                    />
                  </div>

                  <div className="fanext" onClick={nextImage}>
                    <FontAwesomeIcon icon={faPlay} />
                  </div>
                </div>

                <div className="preview-list-property-details">
                  <div className="pl-for-sale">For Sale</div>
                  <h2>5 Bedroom House for Rent in Maria Luisa Park</h2>
                  <div className="location">
                    <img src={location} alt="Location" /> Maria Luisa Estate
                    Park, Banilad, Cebu City
                  </div>
                </div>
              </div>
              <div className="small-images">
                {smallImages.map((src, idx) => (
                  <div key={idx} className="small-image">
                    <img
                      src={src}
                      alt={`Small ${idx + 1}`}
                      className="small-img"
                    />
                  </div>
                ))}
                <div className="camera-info">
                  <img src={camera} alt="Camera Icon" className="camera" />
                  <h2>{currentIndex + 1} </h2>
                  <p className="photos">{photoCount} Photos</p>
                </div>
              </div>
            </div>
          </div>
          <div className="previewlist-overview">
            <span>OVERVIEW</span>
            <p>Property ID: 123456789</p>
          </div>
          <div className="midContent">
           < PreviewListLeftContent/>
           < PreviewListRightSideContent/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PreviewListing;
