import React, { useState, useEffect } from "react";

const CustomSelectTypeField = (props) => {
  const labelName = props.labelName;
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [listingInformation, setListingInformation] = useState([]);
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    if (labelName === "Property Type") {
      setOptions([
        { value: "serviceOffice", label: "Service Office" },
        { value: "shopRetail", label: "Shop/Retail" },
        { value: "commercialLandLot", label: "Commercial Land/ Lot" },
        { value: "condominium", label: "Condominium" },
        { value: "houseLot", label: "House & Lot" },
        { value: "townhouse", label: "Townhouse" },
        { value: "warehouse", label: "Warehouse" },
        { value: "farmLot", label: "Farm Lot" },
        { value: "hotelResort", label: "Hotel/Resort" },
      ]);
    } else if (labelName === "Listing Type") {
      setOptions([
        { value: "forRent", label: "For Rent" },
        { value: "forSale", label: "For Sale" },
        { value: "pre-selling", label: "Pre-selling" },
      ]);
    } else if (labelName === "Furnishing") {
      setOptions([
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "semi", label: "Semi" },
      ]);
    } else if (labelName === "Classification") {
      setOptions([
        { value: "brandNew", label: "Brand New" },
        { value: "resale", label: "Resale" },
      ]);
    } else if (
      labelName === "Beds" ||
      labelName === "Bathrooms" ||
      labelName === "Parking" ||
      labelName === "No of Floors"
    ) {
      setOptions([
        { value: `${labelName}Is1`, label: "1" },
        { value: `${labelName}Is2`, label: "2" },
        { value: `${labelName}Is3`, label: "3" },
        { value: `${labelName}Is4`, label: "4" },
        { value: `${labelName}Is5`, label: "5" },
        { value: `${labelName}Is6`, label: "6" },
        { value: `${labelName}Is7`, label: "7" },
        { value: `${labelName}Is8`, label: "8" },
        { value: `${labelName}Is9`, label: "9" },
        { value: `${labelName}Is10`, label: "10" },
        { value: `${labelName}Is11`, label: "11" },
        { value: `${labelName}Is12`, label: "12" },
        { value: `${labelName}Is13`, label: "13" },
        { value: `${labelName}Is14`, label: "14" },
        { value: `${labelName}Is15`, label: "15" },
        { value: `${labelName}Is16`, label: "16" },
        { value: `${labelName}Is17`, label: "17" },
        { value: `${labelName}Is18`, label: "18" },
        { value: `${labelName}Is19`, label: "19" },
        { value: `${labelName}Is20`, label: "20" },
      ]);
    }
  }, [labelName]);

  return (
    <div className="select-field">
      <label htmlFor={labelName} className="labelClassName">
        {labelName}
      </label>
      <br />
      <select
        name={labelName}
        className="fieldClassName"
        defaultValue=""
        onChange={handleSelectChange}
      >
        <option value="" disabled hidden className="optionsClassName">
          {labelName === "Listing Type"
            ? `Select ${labelName}`
            : labelName === "Beds" ||
              labelName === "Bathrooms" ||
              labelName === "Parking" ||
              labelName === "No of Floors"
            ? "Select number"
            : labelName === "Furnishing" || labelName === "Classification"
            ? "Select Type"
            : `Select ${labelName}`}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default CustomSelectTypeField;
