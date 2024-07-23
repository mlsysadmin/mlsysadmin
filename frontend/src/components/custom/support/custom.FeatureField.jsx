import React, { useState, useEffect } from "react";

const CustomFeatureField = (props) => {
  const labelName = props.labelName;
  const fieldType = props.fieldType;
  const className = props.className;
  const disabled = props.disabled;
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [listingInformation, setListingInformation] = useState([]);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    if (labelName === "Indoor Features") {
      setOptions([
        { value: "alarmSystem", label: "Alarm System" },
        { value: "airConditioning", label: "Air Conditioning" },
        { value: "attic", label: "Attic" },
        { value: "balcony", label: "Balcony" },
        { value: "bar", label: "Bar" },
        { value: "basement", label: "Basement" },
        {
          value: "broadbandInternetAvailable",
          label: "Broadband Internet Available",
        },
        { value: "builtInWardrobes", label: "Built-in wardrobes" },
        { value: "cctv", label: "CCTV" },
        { value: "centralAirConditioning", label: "Central Air Conditioning" },
        { value: "ductedCooling", label: "Ducted Cooling" },
        { value: "ductedVacuumSystem", label: "Ducted Vaccum System" },
        { value: "driverRoom", label: "Driver Room" },
        { value: "ensuite", label: "Ensuite" },
        { value: "entertainmentRoom", label: "Entertainment Room" },
        { value: "fireAlarm", label: "Fire Alarm" },
        { value: "fireplace", label: "Fireplace" },
        { value: "floorboards", label: "Floorboards" },
        { value: "gym", label: "Gym" },
        { value: "jacuzzi", label: "Jacuzzi" },
        { value: "laundryRoom", label: "Laundry Room" },
        { value: "lawn", label: "Lawn" },
        { value: "library", label: "Library" },
        { value: "lounge", label: "Lounge" },
        { value: "maidRoom", label: "Maid Room" },
        { value: "payTvAccess", label: "Pay TV Access" },
        { value: "powderRoom", label: "Powder Room" },
        { value: "sauna", label: "Sauna" },
        { value: "serviceArea", label: "Service Area" },
        { value: "serviceKitchen", label: "Service Kitchen" },
        { value: "smokeDetector", label: "Smoke Detector" },
        { value: "splitSystemHeating", label: "Split System Heating" },
        { value: "storageRoom", label: "Storage Room" },
        { value: "studyRoom", label: "Study Room" },
        { value: "terrace", label: "Terrace" },
        { value: "wifi", label: "Wifi" },
      ]);
    } else {
      setOptions([
        { value: "badmintonCourt", label: "Badminton Court" },
        { value: "balcony", label: "Balcony" },
        { value: "basketballCourt", label: "Basketball Court" },
        { value: "carport", label: "Carport" },
        { value: "clubhouse", label: "Clubhouse" },
        { value: "courtyard", label: "Courtyard" },
        { value: "fullyFenced", label: "Fully Fenced" },
        { value: "functionArea", label: "Function Area" },
        { value: "garage", label: "Garage" },
        { value: "garden", label: "Garden" },
        { value: "gazebos", label: "Gazebos" },
        { value: "jacuzzi", label: "Jacuzzi" },
        { value: "joggingPath", label: "Jogging Path" },
        { value: "lanai", label: "Lanai" },
        { value: "landscapedGarden", label: "Landscaped Garden" },
        { value: "multiPurposeLawn", label: "Multi-purpose Lawn" },
        { value: "openCarSpaces", label: "Open Car Spaces" },
        { value: "parks", label: "Parks" },
        { value: "parkingLot", label: "Parking Lot" },
        { value: "playground", label: "Playground" },
        { value: "remoteGarage", label: "Remote Garage" },
        { value: "secureParking", label: "Secure Parking" },
        { value: "showerRooms", label: "Shower Rooms" },
        { value: "sportsFacilities", label: "Sports Facilities" },
        { value: "swimmingPool", label: "Swimming Pool" },
        { value: "tenninsCourt", label: "Tennis Court" },
        { value: "247Security", label: "24/7 Security" },
      ]);
    }
  }, [labelName]);

  return (
    <div className="FeaturesFields">
      {fieldType === "select" ? (
        <select
          name={labelName}
          className={className}
          defaultValue=""
          onChange={handleSelectChange}
          disabled={disabled}
        >
          <option value="" disabled hidden>
            {"Select Type"}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={selectedOption}
          onChange={handleSelectChange}
          placeholder="Enter value"
          className={className} //"ammenitiesInputField"
          disabled={disabled}
        />
      )}
    </div>
  );
};
export default CustomFeatureField;
