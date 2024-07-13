import React, { useEffect, useState } from 'react';
import BedsInputSlider from "./Slider/BedSlider";
import ParkingInputSlider from "./Slider/ParkingSlider";
import BathroomInputSlider from "./Slider/BathroomsSlider";
import NoOfFloorsInputSlider from "./Slider/NoOfFloors";
import "../styles/listing-form.css";
import floorlogo from "../assets/images/floorlogo.png";
// import prop_id from "../assets/images/prop_id.png"



const UnitDetailsComponent = ({
  onComplete,
  priceInputError,
  setPriceInputError,
  selectedSellingPrice,
  handleSellingPriceClick,
  floorAreaInputError,
  setFloorAreaInputError,
  pricePerSqmInputError,
  setPricePerSqmInputError,
  discPriceInputError,
  setDiscPriceInputError,
 
  lotAreaInputError,
  setLotAreaInputError,
  propIdInputError,
  setPropIdInputError,

  
}) => {
 
  const [selectedUnitTab, setSelectedUnitTab] = useState ('');
  const [selectedListingTab, setSelectedListingTab] = useState ('');


  useEffect (() => {
    if (selectedUnitTab === 'unitDetails') {
      setSelectedListingTab ('')
      }
  })



  const [selectedClassification, setSelectedClassification] = React.useState(null);

  const handleClassificationClick = (tab) => {
    setSelectedClassification(tab);
  };

  const validateNumberInput = (value) => {
    // Your validation logic here
    if (isNaN(value)) {
      Error('Please enter a valid number.');
    } else {
      Error('');
    }
  }
  
  
    
  return (
    <div className="listing-unit-details">
      <div className="listing-unit-details-label">Unit Details</div>
      <div className="listing-unit-details-div">
        <div className="listing-unit-details-left">
          {/* Selling Price */}
          <div className="form-group">
            <div className="text-wrapper-37">Selling Price</div>
            <div className="listing-unit-input-group">
              <label className="text-wrapper-38" htmlFor="selling-price">
                What is the selling price of the unit?
              </label>
              <div className="input-container">
                <div className="currency-prefix">PHP</div>
                <input
                  id="price-input"
                  className={`price-input ${priceInputError ? 'error-input' : ''}`}
                  type="number"
                 
                />
              </div>
              {priceInputError && <div className="error">{priceInputError}</div>}
            </div>
          </div>

          {/* Furnishing */}
          <div className="form-group">
            <div className="text-wrapper-37">Furnishing</div>
            <div className="listing-unit-input-group">
              <label className="text-wrapper-38" htmlFor="furnish-tabs">
                Is the unit fully furnished?
              </label>
              <div className="tab-category">
                <div className="tab-wrapper">
                  <div className="furnish-tabs">
                    {["Yes", "No", "Semi"].map((tab) => (
                      <div
                        key={tab}
                        className={`furnish-tab ${selectedSellingPrice === tab ? "selected" : ""}`}
                        onClick={() => handleSellingPriceClick(tab)}
                      >
                        {tab}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Beds */}
          <div className="form-group">
            <div className="text-wrapper-37">Beds</div>
            <div className="listing-unit-input-group">
              <label className="text-wrapper-38" htmlFor="beds">
                How many beds?
              </label>
              <div className="beds-listing-unit-input-group">
                <div className="overlap-10">
                  <div className="beds-number">
                    <BedsInputSlider />
                  </div>
                  <img
                    className="beds-logo"
                    alt="Beds logo"
                    src="https://cdn.animaapp.com/projects/64e41d552340cba66b90f01a/releases/665420ac7606a0cc15aa6b94/img/hotel-bed-2--bed-double-bedroom-bedrooms-queen-king-full-hotel-h-5@2x.png"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Parking */}
          <div className="form-group">
            <div className="text-wrapper-37">Parking</div>
            <div className="listing-unit-input-group">
              <label className="text-wrapper-38" htmlFor="parking">
                How many parking slots?
              </label>
              <div className="parking-listing-unit-input-group">
                <div className="overlap-10">
                  <div className="parking-number">
                    <ParkingInputSlider />
                  </div>
                  <img
                    className="parking-logo"
                    alt="Parking logo"
                    src="https://cdn.animaapp.com/projects/64e41d552340cba66b90f01a/releases/665e706f7ae3ba3a45818d90/img/parking-sign--discount-coupon-parking-price-prices-hotel.svg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Floor Area */}
          <div className="form-group">
            <div className="text-wrapper-37">Floor Area</div>
            <div className="listing-unit-input-group">
              <label className="text-wrapper-38" htmlFor="floor-area">
                What is the floor area of the unit?
              </label>
              
              <div className="floor-input-container">
                <div className="floor-logo">
                  <img
                    className="floor-logo-img"
                    alt="floor-logo"
                    src={floorlogo}
                  />
                </div>
                <input
            id="floorarea-input"
            className={`floorarea-input ${floorAreaInputError ? 'error-input' : ''}`}
            type="number"
            onChange={(e) => validateNumberInput(e.target.value)}
          />
          <div className="sqm-prefix">sqm</div>
        </div>
        {floorAreaInputError && (
          <div className="error">{floorAreaInputError}</div>
        )}
      </div>
    </div>

          {/* Price per sqm */}
          <div className="form-group">
            <div className="text-wrapper-37">Price per sqm</div>
            <div className="listing-unit-input-group">
              <label className="text-wrapper-38" htmlFor="pricepersqm">
                What is the selling price per sqm?
              </label>
              <div className="input-container">
                <div className="currency-prefix">PHP</div>
                <input
                  id="pricepersqm"
                  className={`pricepersqm-input ${pricePerSqmInputError ? 'error-input' : ''}`}
                  type="number"
                  onChange={(e) =>
                    validateNumberInput(e.target.value, setPricePerSqmInputError)
                  }
                />
              </div>
              {pricePerSqmInputError && (
                <div className="error">{pricePerSqmInputError}</div>
              )}
            </div>
          </div>
        </div>

        <div className="listing-unit-details-right">
          {/* Discounted Selling Price */}
          <div className="form-group">
            <div className="text-wrapper-37">Discounted Selling Price</div>
            <div className="listing-unit-input-group">
              <label className="text-wrapper-38" htmlFor="disc-selling-price">
                What is the discounted selling price of the unit?
              </label>
              <div className="input-container">
              <div className="currency-prefix">PHP</div>
          <input
            id="disc-price-input"
            className={`disc-price-input ${discPriceInputError ? 'error-input' : ''}`}
            type="number"
            onChange={(e) => validateNumberInput(e.target.value, setDiscPriceInputError)}
          />
        </div>
        {discPriceInputError && <div className="error">{discPriceInputError}</div>}
            
            </div>
          </div>

          {/* Classification */}
          <div className="form-group">
      <div className="text-wrapper-37">Classification</div>
      <div className="listing-unit-input-group">
        <label className="text-wrapper-38" htmlFor="classification">
          What is the classification of the unit?
        </label>
        <div className="tab-category">
          <div className="tab-wrapper">
            <div className="classification-tabs">
              {["BrandNew", "Retail"].map((tab) => (
                <div
                  key={tab}
                  className={`classification-tab ${selectedClassification === tab ? "selected" : ""}`}
                  onClick={() => handleClassificationClick(tab)}
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
          {/* Bathrooms */}
          <div className="form-group">
            <div className="text-wrapper-37">Bathrooms</div>
            <div className="listing-unit-input-group">
              <label className="text-wrapper-38" htmlFor="bathrooms">
                How many bathrooms?
              </label>
              <div className="bathroom-listing-unit-input-group">
                <div className="overlap-10">
                  <div className="bathroom-number">
                    <BathroomInputSlider />
                  </div>
                  <img
                    className="bathroom-logo"
                    alt="bathroom-logo"
                    src="https://cdn.animaapp.com/projects/64e41d552340cba66b90f01a/releases/665e706f7ae3ba3a45818d90/img/hotel-shower-head--bathe-bath-bathroom-shower-water-head-hotel@2x.png"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* No. of Floors */}
          <div className="form-group">
            <div className="text-wrapper-37">No. of Floors</div>
            <div className="listing-unit-input-group">
              <label className="text-wrapper-38" htmlFor="nofloors">
                How many floors?
              </label>
              <div className="nofloors-listing-unit-input-group">
                <div className="overlap-10">
                  <div className="nofloors-number">
                    <NoOfFloorsInputSlider />
                  </div>
                  <img
                    className="nofloors-logo"
                    alt="nofloors-logo"
                    src="https://cdn.animaapp.com/projects/64e41d552340cba66b90f01a/releases/665e706f7ae3ba3a45818d90/img/descending-number-order-1@2x.png"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Lot Area */}
          <div className="form-group">
            <div className="text-wrapper-37">Lot Area</div>
            <div className="listing-unit-input-group">
              <label className="text-wrapper-38" htmlFor="lot-area">
                What is the lot area of the unit?
              </label>
              <div className="lot-area-input-container">
                <div className="lot-area-logo">
                  <img
                    className="lot-area-logo-img"
                    alt="lot-area-logo"
                    src={floorlogo}
                  />
                </div>
                <input
                  id="lot-area-input"
                  className={`lot-area-input ${lotAreaInputError ? 'error-input' : ''}`}
                  type="number"
                  onChange={(e) =>
                    validateNumberInput(e.target.value, setLotAreaInputError)
                  }
                />
                <div className="sqm-prefix">sqm</div>
              </div>
              {lotAreaInputError && (
                <div className="error">{lotAreaInputError}</div>
              )}
            </div>
          </div>

          {/* Property ID Number */}
          <div className="form-group">
            <div className="text-wrapper-37">Property ID No</div>
            <div className="listing-unit-input-group">
              <label className="text-wrapper-38" htmlFor="prop-id">
                What is the property ID number?
              </label>
              <div className="propid-input-container">
                <div className="propid-logo">
                  {/* <PropIdLogo className="propid-logo-img" /> */}
                </div>
                <input
                  id="propid-input"
                  className={`propid-input ${propIdInputError ? 'error-input' : ''}`}
                  type="number"
                  onChange={(e) =>
                    validateNumberInput(e.target.value, setPropIdInputError)
                  }
        
                />
              </div>
              {propIdInputError && (
                <div className="error">{propIdInputError}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitDetailsComponent;
