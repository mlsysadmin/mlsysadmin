import React, { useState } from "react";
import { WarningOutlined } from "@ant-design/icons";
import PropIdLogo from "../assets/icons/PropertyId/PropIdLogo";
import floorlogo from "../assets/images/floorlogo.png";
import SearchIcon from "../assets/icons/SearchIcon/SearchIcon";
import ListingSteps from "./layout/ListingSteps";
import ListingBanner from "./layout/ListingBanner";
import BedsInputSlider from "./Slider/BedSlider";
import ParkingInputSlider from "./Slider/ParkingSlider";
import BathroomInputSlider from "./Slider/BathroomsSlider";
import NoOfFloorsInputSlider from "./Slider/NoOfFloors";
import { useDropzone } from "react-dropzone";
import Resizer from "react-image-file-resizer";
import "../styles/listing-form.css";
import AddFeature from "./custom/custom.featureLists";
import Footer from "./MY Drafts/Components/FooterComponent";


export const ListingForm = () => {
  const [selectedPropertyTab, setSelectedPropertyTab] = useState(null);
  const [selectedListingTab, setSelectedListingTab] = useState(null);
  const [selectedSellingPrice, setSelectedSellingPrice] = useState(null);
  const [selectedClassification, setSelectedClassification] = useState(null);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [showSuccessfulMsgModal, setShowSuccessfulMsgModal] = useState(false);
  const handleModalClose = () => {
    setShowSuccessfulMsgModal(false);
  };
  const toggleFeature = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((item) => item !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const FeatureList = ({ title, features }) => (
    <div className="featureCards">
      <h2>{title}</h2>
      <div className="features">
        {features.map((feature) => (
          <span
            key={feature}
            className={`feature-item ${
              selectedFeatures.includes(feature) ? "selected" : ""
            }`}
            onClick={() => toggleFeature(feature)}
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      if (validateFile(file)) {
        Resizer.imageFileResizer(
          file,
          800,
          600,
          "JPEG",
          100,
          0,
          (uri) => {
            setUploadedPhotos((prev) => [...prev, { file, preview: uri }]);
          },
          "base64"
        );
      }
    });
  };

  const validateFile = (file) => {
    const maxFileSize = 15 * 1024 * 1024; // 15 MB
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!allowedTypes.includes(file.type)) {
      alert("Only JPEG, PNG, and GIF files are allowed.");
      return false;
    }

    if (file.size > maxFileSize) {
      alert("File size should not exceed 15 MB.");
      return false;
    }

    return true;
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const handlePropertyTabClick = (tab) => {
    setSelectedPropertyTab(tab);
  };

  const handleListingTabClick = (tab) => {
    setSelectedListingTab(tab);
  };

  const handleSellingPriceClick = (tab) => {
    setSelectedSellingPrice(tab);
  };

  const handleClassificationClick = (tab) => {
    setSelectedClassification(tab);
  };
  const indoorFeatures = [
    "Alarm System",
    "Air Conditioning",
    "Attic",
    "Balcony",
    "Bar",
    "Basement",
    "Broadband Internet Available",
    "Built-in Wardrobes",
    "CCTV",
    "Central Air Conditioning",
    "Ducted Cooling",
    "Ducted Vacuum System",
    "Driver Room",
    "Ensuite",
    "Entertainment Room",
    "Fire Alarm",
    "Fireplace",
    "Floorboards",
    "Gym",
    "Jacuzzi",
    "Laundry Room",
    "Lawn",
    "Library",
    "Lounge",
    "Maid Room",
    "Pay TV Access",
    "Powder Room",
    "Sauna",
    "Service Area",
    "Service Kitchen",
    "Smoke Detector",
    "Split System Heating",
    "Storage Room",
    "Study Room",
    "Terrace",
    "Wifi",
  ];

  const outdoorFeatures = [
    "Badminton Court",
    "Basketball Court",
    "Carport",
    "Clubhouse",
    "Courtyard",
    "Fully Fenced",
    "Function Area",
    "Garage",
    "Garden",
    "Gazebos",
    "Jogging Path",
    "Lanai",
    "Landscaped Garden",
    "Multi-purpose Lawn",
    "Open Car Spaces",
    "Parks",
    "Parking Lot",
    "Playground",
    "Remote Garage",
    "Secure Parking",
    "Shower Rooms",
    "Sports Facilities",
    "Swimming Pool",
    "Tennis Court",
    "24/7 Security",
  ];
  return (
    <>
    <div className="ContentContainer">
      <div>
        <ListingBanner />
      </div>

      <div className="listing-application">
        <div className="listing-steps">
          <ListingSteps />
        </div>

        <div className="listing-form">
        <div className="listing-form-application">
      <div className="listing-property-details">
        <div className="listing-property-details-info">
          <b className="b">Property Details</b>
        </div>
        <div className="listing-property-details-tabs">
          <div className="listing-property-type">
            <div className="listing-property-details-label">
              <div className="label"> Property Type </div>
            </div>

            <div className="tab-container">
              <div className="tab-category">
                <div className="tab-label">Commercial</div>
                <div className="tab-wrapper">
                  <div className="tabs">
                    {[
                      "Service Office",
                      "Shop/Retail",
                      "Commercial Land/Lot",
                    ].map((tab) => (
                      <div
                        key={tab}
                        className={`tab ${
                          selectedPropertyTab === tab ? "selected" : ""
                        }`}
                        onClick={() => handlePropertyTabClick(tab)}
                      >
                        {tab}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="tab-category">
                <div className="tab-label">Residential</div>
                <div className="tab-wrapper">
                  <div className="tabs">
                    {["Condominium", "House and Lot", "Townhouse"].map(
                      (tab) => (
                        <div
                          key={tab}
                          className={`tab ${
                            selectedPropertyTab === tab ? "selected" : ""
                          }`}
                          onClick={() => handlePropertyTabClick(tab)}
                        >
                          {tab}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="tab-category">
                <div className="tab-label">Industrial/etc</div>
                <div className="tab-wrapper">
                  <div className="tabs">
                    {["Warehouse", "Farm Lot", "Hotel/Resort"].map((tab) => (
                      <div
                        key={tab}
                        className={`tab ${
                          selectedPropertyTab === tab ? "selected" : ""
                        }`}
                        onClick={() => handlePropertyTabClick(tab)}
                      >
                        {tab}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="listing-listing-type">
            <div className="listing-listing-details-label">
              <div className="label"> Listing Type </div>
            </div>

            <div className="listing-tab-container">
              <div className="tab-category">
                <div className="listing-tab-wrapper">
                  <div className="listing-tabs">
                    {["For Rent", "For Sale", "Pre-Selling"].map((tab) => (
                      <div
                        key={tab}
                        className={`tab ${
                          selectedListingTab === tab ? "selected" : ""
                        }`}
                        onClick={() => handleListingTabClick(tab)}
                      >
                        {tab}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="listing-note">
                <p>
                  To help home buyers better, we only accept these 3 types of
                  listing.
                </p>
              </div>

              <div className="listing-reminders">
                <div className="listing-reminders-label">
                  <WarningOutlined className="warning-icon" />
                  <b>A few reminders when posting a unit.</b>
                </div>
                <ul>
                  <li>
                    We DO NOT accept pre-selling properties, ONLY ready for
                    occupancy (RFO) ones that have either been bought from a
                    developer or have been constructed by a person for sale or
                    rent.
                  </li>
                  <li>
                    If you are posting more than one (1) unit, please create one
                    listing per unit. DO NOT advertise all your units in one (1)
                    post.
                  </li>
                  <p className="more">
                    For more assistance, you refer to our photo guide or watch
                    our video guide.
                  </p>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="listing-unit-details">
        <div className="listing-unit-details-label">Unit Details</div>

        <div className="listing-unit-details-div">
          <div className="listing-unit-details-left">
            <div className="form-group">
              <div className="text-wrapper-37">Selling Price</div>
              <div className="listing-unit-input-group">
                <label className="text-wrapper-38" htmlFor="selling-price">
                  What is the selling price of the unit?
                </label>

                <div className="input-container">
                  <div className="currency-prefix">PHP</div>

                  <input id="price-input" className="price-input" type="text" />
                </div>
              </div>
            </div>

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
                          className={`furnish-tab ${
                            selectedSellingPrice === tab ? "selected" : ""
                          }`}
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

            <div className="form-group">
              <div className="text-wrapper-37">Parking</div>
              <div className="listing-unit-input-group">
                <label className="text-wrapper-38" htmlFor="beds">
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

            <div className="form-group">
              <div className="text-wrapper-37">Floor Area</div>
              <div className="listing-unit-input-group">
                <label className="text-wrapper-38" htmlFor="floor-logo">
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
                    className="floorarea-input"
                    type="text"
                  />
                  <div className="sqm-prefix">sqm</div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="text-wrapper-37">Price per sqm</div>
              <div className="listing-unit-input-group">
                <label className="text-wrapper-38" htmlFor="pricepersqm">
                  What is the selling price of per sqm?
                </label>

                <div className="input-container">
                  <div className="currency-prefix">PHP</div>

                  <input
                    id="pricepersqm"
                    className="pricepersqm-input"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="listing-unit-details-right">
            <div className="form-group">
              <div className="text-wrapper-37">
                {" "}
                Discounted <br /> Selling Price
              </div>
              <div className="listing-unit-input-group">
                <label className="text-wrapper-38" htmlFor="disc-selling-price">
                  What is the discounted selling price of the unit?
                </label>

                <div className="input-container">
                  <div className="currency-prefix">PHP</div>

                  <input
                    id="disc-price-input"
                    className="disc-price-input"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="text-wrapper-37">Classification</div>
              <div className="listing-unit-input-group">
                <label className="text-wrapper-38" htmlFor="classification">
                  Is the unit fully furnished?
                </label>
                <div className="tab-category">
                  <div className="tab-wrapper">
                    <div className="classification-tabs">
                      {["BrandNew", "Retail"].map((tab) => (
                        <div
                          key={tab}
                          className={`classification-tab ${
                            selectedClassification === tab ? "selected" : ""
                          }`}
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
                    className="lot-area-input"
                    type="text"
                  />
                  <div className="sqm-prefix">sqm</div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="text-wrapper-37">Property ID Number</div>
              <div className="listing-unit-input-group">
                <label className="text-wrapper-38" htmlFor="lot-area">
                  What is the lot area of the unit?
                </label>

                <div className="propid-input-container">
                  <div className="propid-logo">
                    <PropIdLogo className="propid-logo-img" />
                  </div>

                  <input
                    id="propid-input"
                    className="propid-input"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="location-details">
        <div className="location-label">Location</div>
        <div className="location-div">
          <div className="form-group">
            <div className="text-wrapper-37">Subdivision</div>
            <div className="input-group">
              <label className="text-wrapper-38" htmlFor="subdivision">
                What is the subdivision name?
              </label>

              <div className="subdivision-input-container">
                <div className="subdivision-logo">
                  <img
                    className="subdivision-logo-img"
                    alt="subdivision-logo"
                    src="https://cdn.animaapp.com/projects/64e41d552340cba66b90f01a/releases/665e706f7ae3ba3a45818d90/img/location-pin-3--navigation-map-maps-pin-gps-location.svg"
                  />
                </div>

                <input
                  id="subdivision-input"
                  className="subdivision-input"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="text-wrapper-37">Address</div>
            <div className="input-group">
              <label className="text-wrapper-38" htmlFor="address">
                What is the address of the unit?
              </label>

              <div className="address-input-container">
                <div className="address-logo">
                  <img
                    className="address-logo-img"
                    alt="address-logo"
                    src="https://cdn.animaapp.com/projects/64e41d552340cba66b90f01a/releases/665e706f7ae3ba3a45818d90/img/location-pin-3--navigation-map-maps-pin-gps-location.svg"
                  />
                </div>

                <input
                  id="address-input"
                  className="address-input"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="text-wrapper-37">Map Location</div>
            <div className="input-group">
              <label className="text-wrapper-38" htmlFor="map-location">
                Show us where the property located.?
              </label>

              <div className="map-location-input-container">
                <div className="map-search-logo">
                  <SearchIcon className="search" />
                </div>

                <input
                  id="map-location-input"
                  className="map-location-input"
                  type="text"
                />
              </div>

              <div className="map"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="descriptionDetails">
        <h1>Description</h1>
        <div className="descriptionText">
          <div className="titleText">
            <h2 className="title">Title</h2>
            <input type="text" placeholder="input title" />
            <p className="example">
              If there are important details that we weren't able to ask, you
              can specify it here.
              <br /> Please note: links and contact info entered will be
              removed.
            </p>
          </div>
          <div className="descriptionContent">
            <textarea
              name=""
              id=""
              placeholder="Description of the place.."
            ></textarea>
            <p className="example">
              Here's a nice, simple and concise example:
            </p>
            <br />
            <p className="example">
              This semi-furnished unit for sale in Quezon City is an ideal space
              for young professionals or starting families. The Project is near
              Araneta Center, Ali Mall Shopping Complex, MRT, LRT, and EDSA.
              Residents will also have access to condominium amenities like a
              swimming pool, a gym, a playground, a basketball court and a
              function room.
            </p>
          </div>
        </div>
      </div>
      <div className="uploadPhotos">
        <h1>Upload Photos</h1>
        <center>
          <div className="uploadPhotosContent">
            <ul>
              <li>
                Photos that have watermarks, phone numbers, website URLs, email
                addresses, or in collage format will be removed.
              </li>
              <li>
                Horizontal/landscape images display best and are recommended.
                Vertical/portrait images and panoramic images are accepted but
                not recommended as they do not take full advantage of the space
                provided.
              </li>
              <li>
                We require a minimum of two (1) distinct photos that pertain to
                the actual property being posted. The higher the quality of the
                photos, the better it is for your listing{" "}
                {"(maximum file size of 15 MB per photo)"}. DO NOT duplicate
                photos please.
              </li>
              <li>
                Computer drawings or artist renders for the properties are NOT
                ALLOWED. We do ALLOW floor plans of the property as long as it
                is accompanied with actual photos of the property's interiors
                and facade.
              </li>
            </ul>
            <div {...getRootProps({ className: "dragAndDropPhotoHere" })}>
              <input {...getInputProps()} />
              <p>Drag & drop photos here, or click to select photos</p>
            </div>
            <div className="DisplayUploadedPhotoHere">
              {uploadedPhotos.map((photo, index) => (
                <div key={index} className="image">
                  <img
                    src={photo.preview}
                    alt={`Uploaded preview ${index}`}
                    style={{ width: "200px", height: "160px" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </center>
      </div>
      <div className="featureList">
        <h2>Features</h2>
        <p>Why is your property so great? Tell us more about your property so that property seekers can learn even more about your offer.</p>
        <div className="features">
          <FeatureList title="Indoor Features" features={indoorFeatures} />
          <FeatureList title="Outdoor Features" features={outdoorFeatures} />
        </div>
        <AddFeature/>
      </div>
      <p style={{fontWeight:"500"}}>By proceeding, I agree and review that all information are correct.</p>
      <div className="buttonSubmit">
        <button type="submit"  onClick={() => setShowSuccessfulMsgModal(true)}>Submit Application</button>
      </div>
      {showSuccessfulMsgModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modalsuccess-header">Successfully Submitted!</h2>
            <div className="success-details">
              <p>
                Waiting for Approval. Your listing has been submitted and will
                undergo screening.
              </p>
              <a href="/previewListing">
              <button className="buttonkyc" onClick={handleModalClose}>
                Preview Listing
              </button>
              </a>
              
            </div>
          </div>
        </div>
      )}
    </div>
        </div>
      </div>
      
    </div>
    <Footer/>
    </>
  );
};