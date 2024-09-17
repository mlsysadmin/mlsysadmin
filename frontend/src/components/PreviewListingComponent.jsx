import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/previewListing.css";

// import ApplicationDetailModal from "./layout/ApplicationDetails/ApplicationDetailsModal";
import PreviewListLeftContent from "./PreviewListLeftContent";
import PreviewListRightSideContent from "./PreviewListRightSideContent";
import MLBROKERAGEAxiosInstance from "../helper/axios";
import { GetPropertiesBySaleStatus,
  GetPublicListingByID,
} from "../api/GetAllPublicListings";
import { LocationFormatter } from "../utils/LocationDateFormatter";
import { GetPhotoFromDB, GetPhotoLength, GetAllPhoto } from "../utils/GetPhoto";
import PropertyListing from "./PropertyListing";
import HomeHighlights from "./HomeHighlights";

const PreviewListing = () => {
  const [amountInPesos, setPesos] = React.useState(500);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [smallImages, setSmallImages] = useState([]);
  const [photoCount, setPhotoCount] = React.useState(); // Initial photo count
  const [stepsGap, setStepsGap] = React.useState(20); // Interest rate in percent
  const [homePrice, setHomePrice] = React.useState(1000000); // Initial home price
  const [downPayment, setDownPayment] = React.useState(100000); // Initial down payment
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const features = [
    {
      title: "Bedrooms",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ffa0b4ae5294fab32f04e2df5bccc9e215b962c4a23b87baa3b3a4f9d11a3bf0?apiKey=e5af2e14d6ff40c0b0f04c88d87330a5&&apiKey=e5af2e14d6ff40c0b0f04c88d87330a5",
      value: "5",
    },
    {
      title: "Bathrooms",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/372723378f9151c6cced3d234ccf4d85735cb0c5bd16df4ca6bac2adaf6189fb?apiKey=e5af2e14d6ff40c0b0f04c88d87330a5&&apiKey=e5af2e14d6ff40c0b0f04c88d87330a5",
      value: "5",
    },
    {
      title: "Garage",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a17243275d0fedc1a93dbce25cd9571671d11f482871f3219644e3e5fe1afa72?apiKey=e5af2e14d6ff40c0b0f04c88d87330a5&&apiKey=e5af2e14d6ff40c0b0f04c88d87330a5",
      value: "3",
    },
    {
      title: "Area",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c279a46ede99c04710deb1142ac34bf9008c0ed800284e2cdc230b0e6a25fc86?apiKey=e5af2e14d6ff40c0b0f04c88d87330a5&&apiKey=e5af2e14d6ff40c0b0f04c88d87330a5",
      value: "300 SqM",
    },
    { title: "Price per SqM", iconSrc: "", value: "" },
  ];

  const term = 30;
  const termInMonths = term * 12;

  const totalHomePrice = homePrice + homePrice * (stepsGap / 100);

  const monthlyPayment = (totalHomePrice - downPayment) / termInMonths;
  const handlePesosChange = (newPesos) => {
    setPesos(newPesos);
  };

  const url = process.env.REACT_APP_STORAGE_BUCKET_URL;
  const objectname = process.env.REACT_APP_OBJECT_NAME;
  const location = useLocation();
  const navigate = useNavigate();
  const [oneListing, setOneListing] = useState(null);

  useEffect(() => {
    const getlistingByID = async () => {
      try {

        console.log(location);
        const onelistingdata = await GetPublicListingByID(location.state);
        const dataresp = onelistingdata.data;

        setOneListing(dataresp);
      } catch (error) {
        console.log(error);
      }
    };
    getlistingByID();
  }, [location.state]);

  console.log("photos", GetAllPhoto());

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
            <PropertyListing oneListing={oneListing} />
            {/* <div className="previewlist-overview">
              <span>OVERVIEW</span>
              <p>Property ID: {oneListing.listings.property_id}</p>
            </div> */}
            <div className="midContent">
              <PreviewListLeftContent oneListing={oneListing} />
              <PreviewListRightSideContent />
            </div>
            <HomeHighlights oneListing={oneListing} />
          </div>
        )}  
      </div>
      
    </div>
  );
};

export default PreviewListing;
