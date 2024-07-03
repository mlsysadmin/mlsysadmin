import React, { useState } from "react";
import "../../styles/additionalFeature.css";
import { MinusCircleOutlined } from '@ant-design/icons';

const AddFeature = () => {
  const initialFeatures = [
    "Landscaped Parks with picnic grounds",
    "Jogging Trails",
    "The Highland Park and Clubhouse",
    "The Emerald Lake Valley",
    "Basketball and Tennis Court",
    "Children Playground",
    "Water and Electric facilities",
    "State of the art communications facilities",
    "5 Bedroom House for Rent in Maria Luisa Park",
  ];

  const initialIncludes = [
    "Living Room with Dining Area",
    "Kitchen Area",
    "Master Bedroom with walk-in closet, toilet",
    "Four (4) Bedrooms each with toilet and bath",
    "Lanai",
    "Landscaped Garden",
    "Maid's Room",
    "Service Kitchen",
    "Service Area",
  ];

  const [features, setFeatures] = useState(initialFeatures);
  const [includes, setIncludes] = useState(initialIncludes);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedIncludes, setSelectedIncludes] = useState([]);
  const [newFeature, setNewFeature] = useState("");
  const [newInclude, setNewInclude] = useState("");
  const [addingFeature, setAddingFeature] = useState(false);
  const [addingInclude, setAddingInclude] = useState(false);




  const addNewItem = (item, setItems, setNewItem, setAdding) => {
    if (item.trim()) {
      setItems((prevItems) => [...prevItems, item]);
      setNewItem("");
      setAdding(false);
    }
  };

  const removeItem = (index, setItems) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <div className="AddFeature">
      <FeatureList
        title="Features and Amenities"
        items={features}
        selectedItems={selectedFeatures}
        setSelectedItems={setSelectedFeatures}
        newItem={newFeature}
        setNewItem={setNewFeature}
        addingItem={addingFeature}
        setAddingItem={setAddingFeature}
        addNewItem={() =>
          addNewItem(newFeature, setFeatures, setNewFeature, setAddingFeature)
        }
        removeItem={(index) => removeItem(index, setFeatures)}
      />
      <FeatureList
        title="Includes"
        items={includes}
        selectedItems={selectedIncludes}
        setSelectedItems={setSelectedIncludes}
        newItem={newInclude}
        setNewItem={setNewInclude}
        addingItem={addingInclude}
        setAddingItem={setAddingInclude}
        addNewItem={() =>
          addNewItem(newInclude, setIncludes, setNewInclude, setAddingInclude)
        }
        removeItem={(index) => removeItem(index, setIncludes)}
      />
    </div>
  );
};

const FeatureList = ({
  title,
  items,
  selectedItems,
  newItem,
  setNewItem,
  addingItem,
  setAddingItem,
  addNewItem,
  removeItem,
}) => (
  <div className="addFeatureList">
    <div className="top">
      <div className="titles">
      <h2>{title}</h2>
      <p>Enter text that is not found in the options above</p>
      </div>
      {!addingItem && (
        <button className="add-button" onClick={() => setAddingItem(true)}>
          Add +
        </button>
      )}
    </div>
    <div className="features">
      {items.map((item, index) => (
        <ul key={index}>
          <li>
            <div className="feature-item-container">
              <span
                className={`feature-item ${
                  selectedItems.includes(item) ? "selected" : ""
                }`}
              >
                {item}
              </span>
              <button onClick={() => removeItem(index)}><MinusCircleOutlined  style={{ fontSize: '24px', color: '#d90000' }} /></button>
            </div>
          </li>
        </ul>
      ))}
      {addingItem && (
        <div className="add-new-item">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={`Enter text that is not found in the options above`}
            onBlur={addNewItem}
            autoFocus
          />
        </div>
      )}
    </div>
  </div>
);

export default AddFeature;
