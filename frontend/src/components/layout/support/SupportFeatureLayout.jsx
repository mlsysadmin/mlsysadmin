import React, { useImperativeHandle, forwardRef, useState } from "react";
import CustomFeatureField from "../../custom/support/custom.FeatureField";
import FileUpload from "../../custom/support/custom.DrogDropImages";

const SupportFeatureLayout = forwardRef((props, ref) => {
  const { labelname, classname } = props;
  const [numFieldsIndoor, setNumFieldsIndoor] = useState(4);
  const [numFieldsOutdoor, setNumFieldsOutdoor] = useState(4);
  const [numFieldsAmmenities, setNumFieldsAmmenities] = useState(2);
  const [numFieldsIncludes, setNumFieldsIncludes] = useState(2);

  const [selectedValuesIndoor, setSelectedValuesIndoor] = useState(
    new Array(4).fill("")
  );
  const [selectedValuesOutdoor, setSelectedValuesOutdoor] = useState(
    new Array(4).fill("")
  );
  const [selectedValuesAmmenities, setSelectedValuesAmmenities] = useState(
    new Array(2).fill("")
  );
  const [selectedValuesIncludes, setSelectedValuesIncludes] = useState(
    new Array(2).fill("")
  );

  const [errors, setErrors] = useState({
    indoor: false,
    outdoor: false,
    ammenities: false,
    includes: false,
  });

  useImperativeHandle(ref, () => ({
    validateFields,
  }));

  const handleAddField = (type, setNumFields, numFields, setValues) => {
    setNumFields(numFields + 1);
    setValues((prev) => [...prev, ""]);
  };

  const handleRemoveField = (type, setNumFields, numFields, minFields) => {
    if (numFields > minFields) {
      setNumFields(numFields - 1);
    }
  };

  const handleSelectChange = (index, value, setValues) => {
    setValues((prevValues) => {
      prevValues[index] = value;
      return [...prevValues];
    });
  };

  const validateFields = () => {
    const newErrors = {
      indoor: selectedValuesIndoor.some((value) => value === ""),
      outdoor: selectedValuesOutdoor.some((value) => value === ""),
      ammenities: selectedValuesAmmenities.some((value) => value === ""),
      includes: selectedValuesIncludes.some((value) => value === ""),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  return (
    <div className="features">
      <div className="featureText">Features</div>

      {/* Indoor Features */}
      <div className="IndoorFeatures">
        <div className="indoorFeaturesText">Indoor Features</div>
        <div className="featuresButton">
          <button
            onClick={() =>
              handleAddField(
                "indoor",
                setNumFieldsIndoor,
                numFieldsIndoor,
                setSelectedValuesIndoor
              )
            }
            className="addButton"
          >
            Add +
          </button>
          <button
            onClick={() =>
              handleRemoveField(
                "indoor",
                setNumFieldsIndoor,
                numFieldsIndoor,
                4
              )
            }
            disabled={numFieldsIndoor <= 4}
            className="subtractButton"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="inputFieldss">
        {[...Array(numFieldsIndoor)].map((_, index) => (
          <div key={index}>
            <CustomFeatureField
              labelName="Indoor Features"
              onChange={(value) =>
                handleSelectChange(index, value, setSelectedValuesIndoor)
              }
              value={selectedValuesIndoor[index]}
              fieldType="select"
              className="fieldFeatures"
            />
            {errors.indoor && selectedValuesIndoor[index] === "" && (
              <div className="error">This field is required</div>
            )}
          </div>
        ))}
      </div>

      {/* Outdoor Features */}
      <div className="OutdoorFeatures">
        <div className="outdoorFeaturesText">Outdoor Features</div>
        <div className="featuresButton">
          <button
            onClick={() =>
              handleAddField(
                "outdoor",
                setNumFieldsOutdoor,
                numFieldsOutdoor,
                setSelectedValuesOutdoor
              )
            }
            className="addButton"
          >
            Add +
          </button>
          <button
            onClick={() =>
              handleRemoveField(
                "outdoor",
                setNumFieldsOutdoor,
                numFieldsOutdoor,
                4
              )
            }
            disabled={numFieldsOutdoor <= 4}
            className="subtractButton"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="inputFieldss">
        {[...Array(numFieldsOutdoor)].map((_, index) => (
          <div key={index}>
            <CustomFeatureField
              labelName="Outdoor Features"
              onChange={(value) =>
                handleSelectChange(index, value, setSelectedValuesOutdoor)
              }
              value={selectedValuesOutdoor[index]}
              fieldType="select"
              className="fieldFeatures"
            />
            {errors.outdoor && selectedValuesOutdoor[index] === "" && (
              <div className="error">This field is required</div>
            )}
          </div>
        ))}
      </div>

      {/* Features and Ammenities Features */}
      <div className="featuresAndAmmenities">
        <div className="featuresAndAmenitiesText">Features and Amenities</div>
        <div className="featuresButton">
          <button
            onClick={() =>
              handleAddField(
                "ammenities",
                setNumFieldsAmmenities,
                numFieldsAmmenities,
                setSelectedValuesAmmenities
              )
            }
            className="addButton"
          >
            Add +
          </button>
          <button
            onClick={() =>
              handleRemoveField(
                "ammenities",
                setNumFieldsAmmenities,
                numFieldsAmmenities,
                2
              )
            }
            disabled={numFieldsAmmenities <= 2}
            className="subtractButton"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="ammenitiesFields">
        {[...Array(numFieldsAmmenities)].map((_, index) => (
          <div key={index}>
            <CustomFeatureField
              labelName="Ammenities Features"
              onChange={(value) =>
                handleSelectChange(index, value, setSelectedValuesAmmenities)
              }
              value={selectedValuesAmmenities[index]}
              fieldType="text"
              className="ammenitiesInputField"
            />
            {errors.ammenities && selectedValuesAmmenities[index] === "" && (
              <div className="error">This field is required</div>
            )}
          </div>
        ))}
      </div>

      <div className="includes">
        <div className="includesText">Includes</div>
        <div className="featuresButton">
          <button
            onClick={() =>
              handleAddField(
                "includes",
                setNumFieldsIncludes,
                numFieldsIncludes,
                setSelectedValuesIncludes
              )
            }
            className="addButton"
          >
            Add +
          </button>
          <button
            onClick={() =>
              handleRemoveField(
                "includes",
                setNumFieldsIncludes,
                numFieldsIncludes,
                2
              )
            }
            disabled={numFieldsIncludes <= 2}
            className="subtractButton"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="includesFields">
        {[...Array(numFieldsIncludes)].map((_, index) => (
          <div key={index}>
            <CustomFeatureField
              labelName="Includes Features"
              onChange={(value) =>
                handleSelectChange(index, value, setSelectedValuesIncludes)
              }
              value={selectedValuesIncludes[index]}
              fieldType="text"
              className="includesInputField"
            />
            {errors.includes && selectedValuesIncludes[index] === "" && (
              <div className="error">This field is required</div>
            )}
          </div>
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
});

export default SupportFeatureLayout;
