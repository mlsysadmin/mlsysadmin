import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
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
import locationimg from "../assets/icons/previewlisting/location.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import camera from "../assets/icons/previewlisting/camera.png";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
// import ApplicationDetailModal from "./layout/ApplicationDetails/ApplicationDetailsModal";
import PreviewListLeftContent from "./PreviewListLeftContent";
import PreviewListRightSideContent from "./PreviewListRightSideContent";
import MLBROKERAGEAxiosInstance from "../helper/axios";
import GetAllPublicListing, {
  GetPublicListingByID,
} from "../api/GetAllPublicListings";
import { LocationFormatter } from "../utils/LocationDateFormatter";
import { GetPhotoFromDB, GetPhotoLength, GetAllPhoto } from "../utils/GetPhoto";

const PreviewListing = () => {
  const [amountInPesos, setPesos] = React.useState(500);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [smallImages, setSmallImages] = useState([]);
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


  // const {state} = useLocation();
  // const {id} = state;
  // const { new_id } = useParams();
  const url = process.env.REACT_APP_STORAGE_BUCKET_URL;
  const objectname = process.env.REACT_APP_OBJECT_NAME;
  const location = useLocation();
  const navigate = useNavigate();
  const [oneListing, setOneListing] = useState(null);

  useEffect(() => {
    const getlistingByID = async () => {
      try {
        const params = {
          listing_id: location.state,
          property_status: "ACTIVE",
        };

        console.log(params.listing_id);
        const onelistingdata = await GetPublicListingByID(params);
        const dataresp = onelistingdata.data;

        setOneListing(dataresp);
        // console.log(onelistingdata);
      } catch (error) {
        console.log(error);
      }
    };
    getlistingByID();
  }, [location.state]);
  
  console.log("photos", GetAllPhoto());

  // if (oneListing) {
  //   console.log("Title:", oneListing.title);
  //   console.log("Photos:", JSON.parse(oneListing.listings.photos.photo))
  //   console.log("Photos:", images);
  //   ;
  // } else {
  //   console.log("oneListing is undefined");
  // }
  
  let images = (oneListing?.listings?.photos?.photo || []);

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
    const nextIndex1 = (newIndex + 1) % images.length;
    const nextIndex2 = (newIndex + 2) % images.length;
  
    const newSmallImages = [images[nextIndex1], images[nextIndex2]];
    setSmallImages(newSmallImages);
  
    const newPhotoCount = getPhotoCountForMainImage(newIndex);
    setPhotoCount(newPhotoCount);
  };
  
  const getPhotoCountForMainImage = (index) => {
  };


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
        {oneListing && (
          <div className="real-estate-listing-card">
            <div className="galleryComponent">
              <div className="gallery">
                <div className="image-container-large">
                  <img
                    src={GetPhotoFromDB(oneListing.listings.photos.photo)}
                    alt="Preview"
                    className="all-images"
                  />

                  <div className="centered">
                    PHP {oneListing.listings.unit_details.price}
                  </div>

                  <div className="icns">
                    <div className="bottom-right">
                      <div className="icon-circle" onClick={toggleFavorite}>
                        <div
                          className={`heart-icon ${
                            isFavorite ? "favorite" : ""
                          }`}
                        >
                          <span className="material-symbols-outlined">
                            {isFavorite ? "favorite" : "favorite_border"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="right">
                      <div className="icon-circle">
                        <img
                          src={filter_alt}
                          className="fas fa-filter"
                          alt="Filter"
                        />
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
                    <div className="pl-for-sale">
                      {oneListing.listings.listing_type.listing_type}
                    </div>
                    <h2>{oneListing.listings.title}</h2>
                    <div className="location">
                      <img src={locationimg} alt="Location" />{" "}
                      {LocationFormatter(oneListing.listings.location)}
                    </div>
                  </div>
                </div>
                <div className="small-images">
                  {/* {JSON.parse(oneListing.listings.photos.photo).map(
                    (images, idx) => (
                      <div key={idx} className="small-image">
                        <img
                          src={`${url}${objectname}/${images.photo}`}
                          alt={`Small ${idx + 1}`}
                          className="small-img"
                        />
                      </div>
                    ) 
                  )} */}
                  {JSON.parse(oneListing.listings.photos.photo)
                    .slice(0, 2)
                    .map((image, idx) => (
                      <div key={idx} className="small-image">
                        <img
                          src={`${url}${objectname}/${image.photo}`}
                          alt={`Small ${idx + 1}`}
                          className="small-img"
                        />
                      </div>
                    ))}

                  {JSON.parse(oneListing.listings.photos.photo)
                    .slice(2)
                    .map(
                      (image, idx) =>
                        currentIndex > 0 && (
                          <div key={idx + 2} className="small-image">
                            <img
                              src={`${url}${objectname}/${image.photo}`}
                              alt={`Small ${idx + 3}`}
                              className="small-img"
                            />
                          </div>
                        )
                    )}

                  <div className="camera-info">
                    <img src={camera} alt="Camera Icon" className="camera" />
                    <h2>{GetPhotoLength(oneListing.listings.photos.photo)} </h2>
                    <p className="photos"> Photos</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="previewlist-overview">
              <span>OVERVIEW</span>
              <p>Property ID: {oneListing.listings.property_id}</p>
            </div>
            <div className="midContent">
              <PreviewListLeftContent oneListing={oneListing} />
              <PreviewListRightSideContent />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PreviewListing;
