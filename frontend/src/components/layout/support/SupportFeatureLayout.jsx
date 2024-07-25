import React, { useImperativeHandle, forwardRef, useState, useEffect } from "react";
import CustomFeatureField from "../../custom/support/custom.FeatureField";
import FileUpload from "../../custom/support/custom.DrogDropImages";
import { Button, Image, Upload } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { GetAllAmenities } from "../../../api/GetAllAmenities";

const { Dragger } = Upload;

const SupportFeatureLayout = forwardRef((props, ref) => {
  const { 
    labelname, classname, 
    beforeUpload, onRemoved, fileList, onPreview, 
    previewImage, previewOpen, setPreviewImage,
    setPreviewOpen
   } = props;

  const [numFieldsIndoor, setNumFieldsIndoor] = useState(4);
  const [numFieldsOutdoor, setNumFieldsOutdoor] = useState(4);
  const [numFieldsAmmenities, setNumFieldsAmmenities] = useState(2);
  const [numFieldsIncludes, setNumFieldsIncludes] = useState(2);

  const [indoorAmenities, setIndoorAmenities] = useState([]);
  const [outdoorAmenities, setOutdoorAmenities] = useState([]);

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

  const handleFieldChange = (index, value, setValues) => {
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

  const draggerProps = {
    action: '',
    name: 'file',
    multiple: true,
    onRemove: onRemoved,
    beforeUpload: beforeUpload,
    onPreview: onPreview,
    fileList,
    listType: 'picture-card',
    accept: "image/png, image/jpeg"
  };

  const GetAmenities = async () => {
    try {
      const amenities = await GetAllAmenities();

      setIndoorAmenities(amenities.indoor);
      setOutdoorAmenities(amenities.outdoor);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
     GetAmenities();
   }, [])

  return (
    <div className="features">
      <div className="featureText">Features</div>

      {/* Indoor Features */}
      <div className="support--features">
        <div className="IndoorFeatures">
          <div className="indoorFeaturesText">Indoor Features</div>
          <div className="featuresButton">
            <Button
              onClick={() =>
                handleAddField(
                  "indoor",
                  setNumFieldsIndoor,
                  numFieldsIndoor,
                  setSelectedValuesIndoor
                )
              }
              className="support--add-btn"
            >
              Add +
            </Button>
            <Button
              onClick={() =>
                handleRemoveField(
                  "indoor",
                  setNumFieldsIndoor,
                  numFieldsIndoor,
                  4
                )
              }
              disabled={numFieldsIndoor <= 4}
              className="support--subtract-btn"
            >
              Remove
            </Button>
          </div>
        </div>
        <div className="inputFieldss">
          {[...Array(numFieldsIndoor)].map((_, index) => (
            <div key={index}>
              <CustomFeatureField
                labelName="Indoor Features"
                onChange={(value) =>
                  handleFieldChange(index, value, setSelectedValuesIndoor)
                }
                indoorAmenities={indoorAmenities}
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
      </div>

      {/* Outdoor Features */}
      <div className="support--features">
        <div className="OutdoorFeatures">
          <div className="outdoorFeaturesText">Outdoor Features</div>
          <div className="featuresButton">
            <Button
              onClick={() =>
                handleAddField(
                  "outdoor",
                  setNumFieldsOutdoor,
                  numFieldsOutdoor,
                  setSelectedValuesOutdoor
                )
              }
              className="support--add-btn"
            >
              Add +
            </Button>
            <Button
              onClick={() =>
                handleRemoveField(
                  "outdoor",
                  setNumFieldsOutdoor,
                  numFieldsOutdoor,
                  4
                )
              }
              disabled={numFieldsOutdoor <= 4}
              className="support--subtract-btn"
            >
              Remove
            </Button>
          </div>
        </div>
        <div className="inputFieldss">
          {[...Array(numFieldsOutdoor)].map((_, index) => (
            <div key={index}>
              <CustomFeatureField
                labelName="Outdoor Features"
                onChange={(value) =>
                  handleFieldChange(index, value, setSelectedValuesOutdoor)
                }
                outdoorAmenities={outdoorAmenities}
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
      </div>

      {/* Features and Ammenities Features */}
      <div className="support--features">
        <div className="featuresAndAmmenities">
          <div className="featuresAndAmenitiesText">Features and Amenities</div>
          <div className="featuresButton">
            <Button
              onClick={() =>
                handleAddField(
                  "ammenities",
                  setNumFieldsAmmenities,
                  numFieldsAmmenities,
                  setSelectedValuesAmmenities
                )
              }
              className="support--add-btn"
            >
              Add +
            </Button>
            <Button
              onClick={() =>
                handleRemoveField(
                  "ammenities",
                  setNumFieldsAmmenities,
                  numFieldsAmmenities,
                  2
                )
              }
              disabled={numFieldsAmmenities <= 2}
              className="support--subtract-btn"
            >
              Remove
            </Button>
          </div>
        </div>
        <div className="ammenitiesFields">
          {[...Array(numFieldsAmmenities)].map((_, index) => (
            <div key={index}>
              <CustomFeatureField
                labelName="Ammenities Features"
                onChange={(value) =>
                  handleFieldChange(index, value, setSelectedValuesAmmenities)
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
      </div>

      <div className="support--features">
        <div className="includes">
          <div className="includesText">Includes</div>
          <div className="featuresButton">
            <Button
              onClick={() =>
                handleAddField(
                  "includes",
                  setNumFieldsIncludes,
                  numFieldsIncludes,
                  setSelectedValuesIncludes
                )
              }
              className="support--add-btn"
            >
              Add +
            </Button>
            <Button
              onClick={() =>
                handleRemoveField(
                  "includes",
                  setNumFieldsIncludes,
                  numFieldsIncludes,
                  2
                )
              }
              disabled={numFieldsIncludes <= 2}
              className="support--subtract-btn"
            >
              Remove
            </Button>
          </div>
        </div>
        <div className="includesFields">
          {[...Array(numFieldsIncludes)].map((_, index) => (
            <div key={index}>
              <CustomFeatureField
                labelName="Includes Features"
                onChange={(value) =>
                  handleFieldChange(index, value, setSelectedValuesIncludes)
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
      </div>

      <div className="support--upload-photos">
        <h2 className="uploadPhotosText">Uploaded Photos</h2>
        <Dragger {...draggerProps} ref={ref} className="drag-upload">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single upload. Strictly prohibited from uploading company data or other
            banned files.
          </p>
        </Dragger>
        {previewImage && (
          <Image
            wrapperStyle={{
              display: 'none',
              cursor: 'pointer'
            }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(''),
            }}
            src={previewImage}
          />
        )}
        {/* <div className="uploadPhotos">
          <FileUpload />
        </div> */}
      </div>
    </div>
  );
});

export default SupportFeatureLayout;
