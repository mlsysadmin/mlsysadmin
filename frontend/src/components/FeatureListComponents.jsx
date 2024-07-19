import React, { useState, useEffect } from "react";
import AddFeature from "./custom/custom.featureLists";
import "../styles/listing-form.css";

const FeatureList = ({ title, features, selectedFeatures, toggleFeature }) => (
  <div className="featureCards">
    <h2>{title}</h2>
    <div className="features">
      {features.map((feature) => (
        <span
          key={feature}
          className={`feature-list-item ${
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
const FeaturedComponents = ({ onComplete }) => {
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const indoorFeatures = [
    "Alarm System",
    "Air Conditioning",
    "Attic",
    "Balcony",
    "Bar",
    "Basement",
    "Broadband Internet Available",
    "Built-in Wardrobes",
    "CCTV",
    "Central Air Conditioning",
    "Ducted Cooling",
    "Ducted Vacuum System",
    "Driver Room",
    "Ensuite",
    "Entertainment Room",
    "Fire Alarm",
    "Fireplace",
    "Floorboards",
    "Gym",
    "Jacuzzi",
    "Laundry Room",
    "Lawn",
    "Library",
    "Lounge",
    "Maid Room",
    "Pay TV Access",
    "Powder Room",
    "Sauna",
    "Service Area",
    "Service Kitchen",
    "Smoke Detector",
    "Split System Heating",
    "Storage Room",
    "Study Room",
    "Terrace",
    "Wifi",
  ];

  const outdoorFeatures = [
    "Badminton Court",
    "Basketball Court",
    "Carport",
    "Clubhouse",
    "Courtyard",
    "Fully Fenced",
    "Function Area",
    "Garage",
    "Garden",
    "Gazebos",
    "Jogging Path",
    "Lanai",
    "Landscaped Garden",
    "Multi-purpose Lawn",
    "Open Car Spaces",
    "Parks",
    "Parking Lot",
    "Playground",
    "Remote Garage",
    "Secure Parking",
    "Shower Rooms",
    "Sports Facilities",
    "Swimming Pool",
    "Tennis Court",
    "24/7 Security",
  ];


  const toggleFeature = (feature) => {
    setSelectedFeatures((prevSelectedFeatures) =>
      prevSelectedFeatures.includes(feature)
        ? prevSelectedFeatures.filter((item) => item !== feature)
        : [...prevSelectedFeatures, feature]
    );
  };

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
          features={indoorFeatures}
          selectedFeatures={selectedFeatures}
          toggleFeature={toggleFeature}
        />
        <FeatureList
          title="Outdoor Features"
          features={outdoorFeatures}
          selectedFeatures={selectedFeatures}
          toggleFeature={toggleFeature}
        />
      </div>
      <AddFeature />
    </div>
  );
};

export default FeaturedComponents;
