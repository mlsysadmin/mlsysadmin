import React, { useState } from "react";
import { useEffect } from "react";
import { WarningOutlined } from "@ant-design/icons";

import SearchIcon from "../assets/icons/SearchIcon/SearchIcon";
import ListingSteps from "./layout/ListingSteps";
import ListingBanner from "./layout/ListingBanner";

import { useDropzone } from "react-dropzone";
import Resizer from "react-image-file-resizer";
import "../styles/listing-form.css";
import { useNavigate } from 'react-router-dom';

import Footer from "./MY Drafts/Components/FooterComponent";
import PropertyDetailsComponent from "./PropertyDetailsComponent";
import UnitDetailsComponent from "./UnitDetailsComponent";
import LocationDetailsComponent from "./LocationDetailsComponent";
import DescriptionDetailsComponent from "./DecriptionDetailsComponent";
import UploadPhotosComponent from "./UploadPhotosComponent";
import FeaturedComponents from "./FeatureListComponents";

export const ListingForm = () => {
  const [selectedPropertyTab, setSelectedPropertyTab] = useState(null);
  const [selectedListingTab, setSelectedListingTab] = useState(null);

  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [showSuccessfulMsgModal, setShowSuccessfulMsgModal] = useState(false);
  const [selectedSellingPrice, setSelectedSellingPrice] = useState("");
  const [selectedClassification, setSelectedClassification] = useState(null);
  const [priceInputError, setPriceInputError] = useState("");
  const [discPriceInputError, setDiscPriceInputError] = useState("");
  const [floorAreaInputError, setFloorAreaInputError] = useState("");
  const [pricePerSqmInputError, setPricePerSqmInputError] = useState("");
  const [lotAreaInputError, setLotAreaInputError] = useState("");
  const [propIdInputError, setPropIdInputError] = useState("");
  const [numberInputError, setNumberInputError] = useState("");
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPropertyDetailsCompleted, setIsPropertyDetailsCompleted] =
    useState(false);





    const [isPropertyDetailsComplete, setIsPropertyDetailsComplete] = useState(false);
    const [isUnitDetailsComplete, setIsUnitDetailsComplete] = useState(false);
    const [isLocationDetailsComplete, setIsLocationDetailsComplete] = useState(false);
    const [isDescriptionDetailsComplete, setIsDescriptionDetailsComplete] = useState(false);
    const [isPhotosUploaded, setIsPhotosUploaded] = useState(false);
    const [isFeaturesSelected, setIsFeaturesSelected] = useState(false);
    const [isFormComplete, setIsFormComplete] = useState(false);
  

    const handleComplete = () => {
      if (currentStep === 1) {
        // I-set ang currentStep ngadto sa step nga angay lang i-check
        setCurrentStep( 2);
      } else {
        setCurrentStep(currentStep + 1);
      }
    };
  const handleSellingPriceClick = (price) => {
    setSelectedSellingPrice(price);
  };
    // Update these state variables in the corresponding form component callbacks
   const handlePropertyDetailsCompletion = (completed) => {
    setIsPropertyDetailsCompleted(completed);
    if (completed && currentStep === 0) {
      setCurrentStep(1);
    }
  };






  


  

  const validateNumberInput = (value, setError) => {
    if (isNaN(value) || value <= 0) {
      setError("Please enter a valid number");
    } else {
      setError("");
    }
  };


  const handleClassificationClick = (classification) => {
    setSelectedClassification(classification);
  };



  const handleModalClose = () => {
    setShowSuccessfulMsgModal(false);
  };

  const handlePreviewListing = () => {
    navigate('/previewlisting');
  };



  const toggleFeature = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((item) => item !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const FeatureList = ({ title, features }) => (
    <div className="featureCards">
      <h2>{title}</h2>
      <div className="features">
        {features.map((feature) => (
          <span
            key={feature}
            className={`feature-item ${
              selectedFeatures.includes(feature) ? "selected" : ""
            }`}
            onClick={() => toggleFeature(feature)}
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      if (validateFile(file)) {
        Resizer.imageFileResizer(
          file,
          800,
          600,
          "JPEG",
          100,
          0,
          (uri) => {
            setUploadedPhotos((prev) => [...prev, { file, preview: uri }]);
          },
          "base64"
        );
      }
    });
  };

  const validateFile = (file) => {
    const maxFileSize = 15 * 1024 * 1024; // 15 MB
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!allowedTypes.includes(file.type)) {
      alert("Only JPEG, PNG, and GIF files are allowed.");
      return false;
    }

    if (file.size > maxFileSize) {
      alert("File size should not exceed 15 MB.");
      return false;
    }

    return true;
  };



  const handleListingTabClick = (tab) => {
    setSelectedListingTab(tab);
  };

  return (
    <>
      <div className="ContentContainer">
        <div>
          <ListingBanner />
        </div>

        <div className="listing-application">
          <div className="listing-steps">
            <ListingSteps current={currentStep} setCurrent={setCurrentStep} />
          </div>

          <div className="listing-form">
            <div className="listing-form-application">
            <PropertyDetailsComponent
          onComplete={handlePropertyDetailsCompletion}
          isComplete={isPropertyDetailsComplete}
        />
               <UnitDetailsComponent
        onComplete={handleComplete}
        priceInputError={priceInputError}
        setPriceInputError={setPriceInputError}
        selectedSellingPrice={selectedSellingPrice}
        handleSellingPriceClick={handleSellingPriceClick}
        floorAreaInputError={floorAreaInputError}
        setFloorAreaInputError={setFloorAreaInputError}
        pricePerSqmInputError={pricePerSqmInputError}
        setPricePerSqmInputError={setPricePerSqmInputError}
        discPriceInputError={discPriceInputError}
        setDiscPriceInputError={setDiscPriceInputError}
        lotAreaInputError={lotAreaInputError}
        setLotAreaInputError={setLotAreaInputError}
        propIdInputError={propIdInputError}
        setPropIdInputError={setPropIdInputError}
      />
<LocationDetailsComponent isComplete={isLocationDetailsComplete} />

<DescriptionDetailsComponent isComplete={isDescriptionDetailsComplete} />

<UploadPhotosComponent isComplete={isPhotosUploaded} />

<FeaturedComponents isComplete={isFeaturesSelected} />

              <p style={{ fontWeight: "500" }}>
                By proceeding, I agree and review that all information are
                correct.
              </p>
               <div className="buttonSubmit">
      <button type="submit" onClick={() => setShowSuccessfulMsgModal(true)}>
        Submit Application
      </button>
      {showSuccessfulMsgModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modalsuccess-header">Successfully Submitted!</h2>
            <div className="success-details">
              <p>
                Waiting for Approval. Your listing has been submitted
                and will undergo screening.
              </p>
              <a href="/previewListing">
              <button className="buttonkyc" onClick={handleModalClose}>
                Preview Listing
              </button>
              </a>
              
            </div>
          </div>
        </div>
      )}
    </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
