import React, { useState } from "react";
import ActiveListSteps from "../MY Drafts/ActiveListSteps";
import { useDropzone } from "react-dropzone";
import Resizer from "react-image-file-resizer";
import "../../styles/listing-form.css";
import Footer from "./Components/FooterComponent";
import PropertyDetailsComponent from "../PropertyDetailsComponent";
import UnitDetailsComponent from "../UnitDetailsComponent";
import LocationDetailsComponent from "../LocationDetailsComponent";
import DescriptionDetailsComponent from "../DecriptionDetailsComponent";
import UploadPhotosComponent from "../UploadPhotosComponent";
import FeaturedComponents from "../FeatureListComponents";
import ActiveListBanner from "./ActiveListBanner";

export const ActiveListingDetails = () => {
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

  const [currentStep, setCurrentStep] = useState(0);
  const [isPropertyDetailsCompleted, setIsPropertyDetailsCompleted] =
    useState(false);

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
  const handleSellingPriceClick = (price) => {
    setSelectedSellingPrice(price);
  };

  const handleClassificationClick = (classification) => {
    setSelectedClassification(classification);
  };

  const handleNumberInputChange = (e) => {
    const { value } = e.target;
    if (validateNumberInput(value, setNumberInputError)) {
      setSelectedSellingPrice(value); // Update state with the valid numeric input
    }
  };
  const handleModalClose = () => {
    setShowSuccessfulMsgModal(false);
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

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const handlePropertyTabClick = (tab) => {
    setSelectedPropertyTab(tab);
  };

  const handleListingTabClick = (tab) => {
    setSelectedListingTab(tab);
  };

  return (
    <>
      <div className="ContentContainer">
        <div>
          <ActiveListBanner/>
        </div>

        <div className="listing-application">
          <div className="listing-steps">
            <ActiveListSteps />
          </div>

          <div className="listing-form">
            <div className="listing-form-application">
              <PropertyDetailsComponent
                onComplete={handlePropertyDetailsCompletion}
              />
              <UnitDetailsComponent
                handleSellingPriceClick={handleSellingPriceClick} // pass the function as prop
                selectedSellingPrice={selectedSellingPrice} // pass any relevant state or props
              />

              <LocationDetailsComponent />

              <DescriptionDetailsComponent />

              <UploadPhotosComponent />

              <FeaturedComponents />

              <p style={{ fontWeight: "500" }}>
                By proceeding, I agree and review that all information are
                correct.
              </p>
              {/* <div className="buttonSubmit">
                <button
                  type="submit"
                  onClick={() => setShowSuccessfulMsgModal(true)}
                >
                  Submit Application
                </button>
              </div>
              {showSuccessfulMsgModal && (
                <div className="modal-overlay" onClick={handleModalClose}>
                  <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2 className="modalsuccess-header">
                      Successfully Submitted!
                    </h2>
                    <div className="success-details">
                      <p>
                        Waiting for Approval. Your listing has been submitted
                        and will undergo screening.
                      </p>
                      <button className="buttonkyc" onClick={handleModalClose}>
                        Preview Listing
                      </button>
                    </div>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
