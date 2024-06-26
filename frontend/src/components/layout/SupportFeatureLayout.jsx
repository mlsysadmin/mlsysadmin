import React, { useState } from "react";
import CustomFeatureField from "../custom/custom.FeatureField";
import CustomTextField from "../custom/custom.TextField";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useFilePreview from "./useFilePreview";
import FileUpload from "../custom/custom.DrogDropImages";

const SupportFeatureLayout = (props) => {
  const { labelname, classname } = props;
  const [numFieldsIndoor, setNumFieldsIndoor] = useState(4);
  const [numFieldsOutdoor, setNumFieldsOutdoor] = useState(4);
  const [numFieldsAmmenities, setNumFieldsAmmenities] = useState(2);
  const [numFieldsIncludes, setNumFieldsIncludes] = useState(2);

  const [selectedValuesIndoor, setSelectedValuesIndoor] = useState([]);
  const [selectedValuesOutdoor, setSelectedValuesOutdoor] = useState([]);
  const [selectedValuesAmmenities, setSelectedValuesAmmenities] = useState([]);
  const [selectedValuesIncludes, setSelectedValuesIncludes] = useState([]);

  const allSelectedValuesIndoor = selectedValuesIndoor;
  const allSelectedValuesOutdoor = selectedValuesOutdoor;
  const allSelectedValuesAmmenities = selectedValuesAmmenities;
  const allSelectedValuesIncludes = selectedValuesIncludes;

  const handleAddFieldIndoor = () => {
    setNumFieldsIndoor(numFieldsIndoor + 1);
    console.log(allSelectedValuesIndoor);
  };

  const handleRemoveFieldIndoor = () => {
    if (numFieldsIndoor > 4) {
      setNumFieldsIndoor(numFieldsIndoor - 1);
    }
  };
  const handleSelectChangeIndoor = (index, value) => {
    console.log("Handle Select Change: ", index, " and Value: ", value);
    // update the selectedValues array when a selection is made
    setSelectedValuesIndoor((prevValues) => {
      prevValues[index] = value;
      return [...prevValues];
    });
  };

  const handleAddFieldOutdoor = () => {
    setNumFieldsOutdoor(numFieldsOutdoor + 1);
    console.log(allSelectedValuesOutdoor);
  };
  const handleRemoveFieldOutdoor = () => {
    if (numFieldsOutdoor > 4) {
      setNumFieldsOutdoor(numFieldsOutdoor - 1);
    }
  };
  const handleSelectChangeOutdoor = (index, value) => {
    console.log("Handle Select Change: ", index, " and Value: ", value);
    // update the selectedValues array when a selection is made
    setSelectedValuesOutdoor((prevValues) => {
      prevValues[index] = value;
      return [...prevValues];
    });
  };
  const handleAddFieldAmmenities = () => {
    setNumFieldsAmmenities(numFieldsAmmenities + 1);
    console.log(allSelectedValuesAmmenities);
  };
  const handleRemoveFieldAmmenities = () => {
    if (numFieldsAmmenities > 2) {
      setNumFieldsAmmenities(numFieldsAmmenities - 1);
    }
  };
  const handleSelectChangeAmmenities = (index, value) => {
    console.log("Handle Select Change: ", index, " and Value: ", value);
    // update the selectedValues array when a selection is made
    setSelectedValuesAmmenities((prevValues) => {
      prevValues[index] = value;
      return [...prevValues];
    });
  };
  const handleAddFieldIncludes = () => {
    setNumFieldsIncludes(numFieldsIncludes + 1);
    console.log(allSelectedValuesIncludes);
  };
  const handleRemoveFieldIncludes = () => {
    if (numFieldsIncludes > 2) {
      setNumFieldsIncludes(numFieldsIncludes - 1);
    }
  };
  const handleSelectChangeIncludes = (index, value) => {
    console.log("Handle Select Change: ", index, " and Value: ", value);
    // update the selectedValues array when a selection is made
    setSelectedValuesIncludes((prevValues) => {
      prevValues[index] = value;
      return [...prevValues];
    });
  };

  return (
    <div className="features">
      <div className="featureText">Features</div>

      {/* Indoor Features */}
      <div className="IndoorFeatures">
        <div className="indoorFeaturesText">Indoor Features</div>
        <div className="featuresButton">
          <button onClick={handleAddFieldIndoor} className="addButton">
            Add +
          </button>
          <button
            onClick={handleRemoveFieldIndoor}
            disabled={numFieldsIndoor <= 4}
            className="subtractButton"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="inputFieldss">
        {[...Array(numFieldsIndoor)].map((_, index) => (
          <CustomFeatureField
            key={index}
            labelName="Indoor Features"
            onChange={(value) => handleSelectChangeIndoor(index, value)}
            value={selectedValuesOutdoor[index]}
            fieldType="select"
            className="fieldFeatures"
          />
        ))}
      </div>

      {/* Outdoor Features */}
      <div className="OutdoorFeatures">
        <div className="outdoorFeaturesText">Outdoor Features</div>
        <div className="featuresButton">
          <button onClick={handleAddFieldOutdoor} className="addButton">
            Add +
          </button>
          <button
            onClick={handleRemoveFieldOutdoor}
            disabled={numFieldsOutdoor <= 4}
            className="subtractButton"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="inputFieldss">
        {[...Array(numFieldsOutdoor)].map((_, index) => (
          <CustomFeatureField
            key={index}
            labelName="Outdoor Features"
            onChange={(value) => handleSelectChangeOutdoor(index, value)}
            value={selectedValuesOutdoor[index]}
            fieldType="select"
            className="fieldFeatures"
          />
        ))}
      </div>

      {/* Features and Ammenites Features */}
      <div className="featuresAndAmmenities">
        <div className="featuresAndAmenitiesText">Features and Amenities</div>
        <div className="featuresButton">
          <button onClick={handleAddFieldAmmenities} className="addButton">
            Add +
          </button>
          <button
            onClick={handleRemoveFieldAmmenities}
            disabled={numFieldsAmmenities <= 2}
            className="subtractButton"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="ammenitiesFields">
        {[...Array(numFieldsAmmenities)].map((_, index) => (
          <CustomFeatureField
            key={index}
            labelName="Ammenities Features"
            onChange={(value) => handleSelectChangeAmmenities(index, value)}
            value={selectedValuesAmmenities[index]}
            fieldType="text"
            className="ammenitiesInputField"
          />
        ))}
      </div>

      <div className="includes">
        <div className="includesText">Includes</div>
        <div className="featuresButton">
          <button onClick={handleAddFieldIncludes} className="addButton">
            Add +
          </button>
          <button
            onClick={handleRemoveFieldIncludes}
            disabled={numFieldsIncludes <= 2}
            className="subtractButton"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="includesFields">
        {[...Array(numFieldsIncludes)].map((_, index) => (
          <CustomFeatureField
            key={index}
            labelName="Ammenities Features"
            onChange={(value) => handleSelectChangeIncludes(index, value)}
            value={selectedValuesIncludes[index]}
            fieldType="text"
            className="includesInputField"
          />
        ))}
      </div>

      <div className="uploadPhotos">
        <div className="uploadPhotosText">Uploaded Photos</div>
        <div className="uploadPhotos">
          <FileUpload />
        </div>
      </div>
    </div>
  );
};
export default SupportFeatureLayout;
