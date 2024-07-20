import React, { useEffect, useState } from "react";
import FeatureList from "./custom/custom.featureLists"; // Adjust the import path accordingly
import AddFeature from "./custom/custom.featureLists";
import { GetAllIndoorAmenities, GetAllOutdoorAmenities } from '../api/GetAllAmenities';
import "../styles/listing-form.css";
import axios from "axios";


const FeaturedComponents = ({ onComplete }) => {
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [indooramenities, setIndoorAmenities] = useState([]);
  const [outdooramenities, setOutdoorAmenities] = useState([]);

  const toggleFeature = (feature) => {
    setSelectedFeatures((prevSelectedFeatures) =>
      prevSelectedFeatures.includes(feature)
        ? prevSelectedFeatures.filter((item) => item !== feature)
        : [...prevSelectedFeatures, feature]
    );
  };
  const indoorAmenities = async () => {
    const response = await GetAllIndoorAmenities();
    setIndoorAmenities(response);
    console.log("response", response);
  };
  useEffect(() => {
    indoorAmenities();
    outdoorAmenities();
  }, []);

  const outdoorAmenities = async () => {
    const response = await GetAllOutdoorAmenities();
    setOutdoorAmenities(response);
    console.log("response", response);
  }
  const FeatureList = ({ title, features, selectedFeatures, toggleFeature }) => (
    <div className="featureCards">
      <h2>{title}</h2>
      <div className="features">
      {features?.map((feature, index) => (
          <div key={index}>
            <span
              className={`feature-item ${
                selectedFeatures.includes(feature.feature_name)
                  ? "selected"
                  : ""
              }`}
              onClick={() => toggleFeature(feature.feature_name)}
            >
              {feature.feature_name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    // Assuming form is completed when features are selected
    if (selectedFeatures.length > 0) {
      onComplete(true);  // Indicating completion
    } else {
      onComplete(false); // Indicating not completed
    }
  }, [selectedFeatures, onComplete]);

  return (
    <div className="featureList">
      <h2>Features</h2>
      <p>
        Why is your property so great? Tell us more about your property so that
        property seekers can learn even more about your offer.
      </p>
      <div className="features">
        <FeatureList
          title="Indoor Features"
          features={indooramenities}
          selectedFeatures={selectedFeatures}
          toggleFeature={toggleFeature}
        />
        <FeatureList
          title="Outdoor Features"
          features={outdooramenities}
          selectedFeatures={selectedFeatures}
          toggleFeature={toggleFeature}
        />
      </div>
      <AddFeature />
    </div>
  );
};

export default FeaturedComponents;
