import React, { useEffect, useState } from "react";
import FeatureList from "./custom/custom.featureLists"; // Adjust the import path accordingly
import AddFeature from "./custom/custom.featureLists";
import GetAllIndoorAmenities from "../api/GetAllAmenities";
import GetAllOutdoorAmenities from "../api/GetAllAmenities";
import "../styles/listing-form.css";
import axios from "axios";

const FeaturedComponents = () => {
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [indooramenities, setIndoorAmenities] = useState([]);
  const [outdooramenities, setOutdoorAmenities] = useState([]);

  // const indoorFeatures = [
  //   "Alarm System",
  //   "Air Conditioning",
  //   "Attic",
  //   "Balcony",
  //   "Bar",
  //   "Basement",
  //   "Broadband Internet Available",
  //   "Built-in Wardrobes",
  //   "CCTV",
  //   "Central Air Conditioning",
  //   "Ducted Cooling",
  //   "Ducted Vacuum System",
  //   "Driver Room",
  //   "Ensuite",
  //   "Entertainment Room",
  //   "Fire Alarm",
  //   "Fireplace",
  //   "Floorboards",
  //   "Gym",
  //   "Jacuzzi",
  //   "Laundry Room",
  //   "Lawn",
  //   "Library",
  //   "Lounge",
  //   "Maid Room",
  //   "Pay TV Access",
  //   "Powder Room",
  //   "Sauna",
  //   "Service Area",
  //   "Service Kitchen",
  //   "Smoke Detector",
  //   "Split System Heating",
  //   "Storage Room",
  //   "Study Room",
  //   "Terrace",
  //   "Wifi",
  // ];

  // const outdoorFeatures = [
  //   "Badminton Court",
  //   "Basketball Court",
  //   "Carport",
  //   "Clubhouse",
  //   "Courtyard",
  //   "Fully Fenced",
  //   "Function Area",
  //   "Garage",
  //   "Garden",
  //   "Gazebos",
  //   "Jogging Path",
  //   "Lanai",
  //   "Landscaped Garden",
  //   "Multi-purpose Lawn",
  //   "Open Car Spaces",
  //   "Parks",
  //   "Parking Lot",
  //   "Playground",
  //   "Remote Garage",
  //   "Secure Parking",
  //   "Shower Rooms",
  //   "Sports Facilities",
  //   "Swimming Pool",
  //   "Tennis Court",
  //   "24/7 Security",
  // ];
  const toggleFeature = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((item) => item !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
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

  const FeatureList = ({ title, features }) => (
    <div className="featureCards">
      <h2>{title}</h2>
      <div className="features">
        {Object.values(features)?.map((feature, index) => (
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

  return (
    <div className="featureList">
      <h2>Features</h2>
      <p>
        Why is your property so great? Tell us more about your property so that
        property seekers can learn even more about your offer.
      </p>
      <div className="features">
        <FeatureList title="Indoor Features" features={indooramenities} />
        <FeatureList title="Outdoor Features" features={outdoorFeatures} />
      </div>
      <AddFeature />
    </div>
  );
};

export default FeaturedComponents;
