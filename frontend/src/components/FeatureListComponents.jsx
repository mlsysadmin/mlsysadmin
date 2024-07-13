import React, { useState } from "react";
import FeatureList from "./custom/custom.featureLists"; // Adjust the import path accordingly
import AddFeature from "./custom/custom.featureLists";
import "../styles/listing-form.css";

const FeaturedComponents = () => {
  const [selectedFeatures, setSelectedFeatures] = useState([]);

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
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((item) => item !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };
  return (
    <div className="featureList">
      <h2>Features</h2>
      <p>
        Why is your property so great? Tell us more about your property so that
        property seekers can learn even more about your offer.
      </p>
      <div className="features">
        <FeatureList title="Indoor Features" features={indoorFeatures} />
        <FeatureList title="Outdoor Features" features={outdoorFeatures} />
      </div>
      <AddFeature />
    </div>
  );
};

export default FeaturedComponents;
