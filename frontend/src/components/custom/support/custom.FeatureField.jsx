import { CaretDownFilled } from "@ant-design/icons";
import { Input, Select } from "antd";
import React, { useState, useEffect } from "react";

const CustomFeatureField = (props) => {
  const labelName = props.labelName;
  const fieldType = props.fieldType;
  const className = props.className;
  const disabled = props.disabled;
  const onChange = props.onChange;
  const indoorAmenities = props.indoorAmenities;
  const outdoorAmenities = props.outdoorAmenities;

  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [listingInformation, setListingInformation] = useState([]);
  const [status, setStatus] = useState([]);

  const handleFeaturesFetch = (e) => {
    console.log("eeee", e);
    setSelectedOption(e);
  };
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    if (labelName === "Indoor Features") {
      const indoor = indoorAmenities.map((amenity, i) => {
        return {
          value: amenity.feature_name,
          label: amenity.feature_name
        }
      })
      setOptions(indoor);
    } else if (labelName === "Outdoor Features") {
      const outdoor = outdoorAmenities.map((amenity, i) => {
        return {
          value: amenity.feature_name,
          label: amenity.feature_name
        }
      })
      setOptions(outdoor);
    }
  }, [labelName]);

  return (
    <div className="FeaturesFields">
      {fieldType === "select" ? (
        <Select
          name={labelName}
          className={className}
          defaultValue=""
          onChange={onChange}
          disabled={disabled}
          options={options}
          suffixIcon={<CaretDownFilled/>}
        >
        </Select>
      ) : (
        <Input
          status={status}
          type="text"
          value={selectedOption}
          onChange={onChange}
          placeholder="Enter Feature"
          className={className} //"ammenitiesInputField"
          disabled={disabled}
          size="large"
        />
      )}
    </div>
  );
};
export default CustomFeatureField;
