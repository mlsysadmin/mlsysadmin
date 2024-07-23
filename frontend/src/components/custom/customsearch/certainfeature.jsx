import React, { useEffect, useState } from "react";
import { getFeatureItems } from "../../../utils/CertainFeature.utils";
import { GetAllAmenities } from "../../../api/GetAllAmenities";
import "../../../styles/custom.css";

const CertainFeatureMenu = () => {
    const [allFeatures, setAllFeatures] = useState([]);
    const [labeledItems, setLabeledItems] = useState([]);
    const [checkedStates, setCheckedStates] = useState({});
  
    const getAllFeaturedAmenities = async () => {
      const res = await GetAllAmenities();
      let indoor = res.indoor.sort((a, b) => {
        const aString =
          typeof a === "string" ? a.toLowerCase() : a.toString().toLowerCase();
        const bString =
          typeof b === "string" ? b.toLowerCase() : b.toString().toLowerCase();
        return aString.localeCompare(bString);
      });
  
      let outdoor = res.outdoor.sort((a, b) => {
        const aString =
          typeof a === "string" ? a.toLowerCase() : a.toString().toLowerCase();
        const bString =
          typeof b === "string" ? b.toLowerCase() : b.toString().toLowerCase();
        return aString.localeCompare(bString);
      });
  
      const initialCheckedStates = {
        INDOOR: indoor.map(() => false),
        OUTDOOR: outdoor.map(() => false),
      };
  
      setCheckedStates(initialCheckedStates);
      setAllFeatures([...indoor, ...outdoor]);
      setLabeledItems([
        { label: "INDOOR", items: indoor },
        { label: "OUTDOOR", items: outdoor },
      ]);
    };

    const handleCheckboxChange = (index, label) => {
        setCheckedStates((prevState) => ({
        ...prevState,
        [label]: prevState[label].map((state, i) =>
        i === index ? !state : state
        ),
        }));
        };
    useEffect(() => {
      getAllFeaturedAmenities();
    }, []);
  
    return (
       <div className="certain-feature-menu-container">
      {labeledItems.map(({ label, items }, index) => (
        <div className="search-certain-features" key={index}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <br />
            <div
              style={{
                fontWeight: "bold",
                color: "var(--red)",
                fontSize: "20px",
              }}
            >
              {label}
            </div>

            <div className="item-group-search" style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
            {items.map((feature, itemIndex) => (
              <div
                key={itemIndex}
                style={{
                  margin: "10px",
                  borderRadius: "4px",
                  color: "black",
                  display: "flex",
                  fontSize:"20px",
                  alignItems: "center",
                }}
              >
                &nbsp; &nbsp; &nbsp;
                <input
                  type="checkbox"
                  checked={checkedStates[label][itemIndex]}
                  onChange={() => handleCheckboxChange(itemIndex, label)}
                />
                <span className="feature-name">{feature.feature_name}</span>
              </div>
            ))}
            </div>
          </div>
        </div>
      ))}
    </div>
    );
  };

export default CertainFeatureMenu;
