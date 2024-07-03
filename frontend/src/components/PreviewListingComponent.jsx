import React from "react";
// import Navigation from "./layout/NavigationComponent";
import Footer from "./MY Drafts/Components/FooterComponent";
import "../styles/previewListing.css";
import bedroom from "../assets/images/image1.png";
import livingroom from "../assets/images/image2.png";
import bathroom from "../assets/images/image3.png";
import fabackward from "../assets/images/fabackward.png";
import image701 from "../assets/images/image701.png";
import image702 from "../assets/images/image702.png";
import image703 from "../assets/images/image703.png";
import image704 from "../assets/images/image704.png";
import image705 from "../assets/images/image705.png";

import carousel2 from "../assets/images/carousel2.png";
import carousel3 from "../assets/images/carousel3.png";
import carousel4 from "../assets/images/carousel4.png";

import filter_alt from "../assets/icons/previewlisting/filter_alt.png";
import share from "../assets/icons/previewlisting/share.png";
import printer from "../assets/icons/previewlisting/printer.png";
import bedrooms from "../assets/icons/previewlisting/bedrooms.png";
import bathrooms from "../assets/icons/previewlisting/bathroom.png";
import garage from "../assets/icons/previewlisting/garage.png";
import sqm from "../assets/icons/previewlisting/sqm.png";
import next from "../assets/icons/previewlisting/next.png";
import previous from "../assets/icons/previewlisting/previous.png";

import iconheart from "../assets/icons/previewlisting/iconheart.png";
import iconfilter from "../assets/icons/previewlisting/iconfilter.png";
import map from "../assets/images/map.png";
import iconcalcu from "../assets/icons/previewlisting/calculatorsign.png";
import icondollar from "../assets/icons/previewlisting/dollarcoin.png";
import location from "../assets/icons/previewlisting/location.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mail from "../assets/icons/previewlisting/mailenvelope.png";
import user from "../assets/icons/previewlisting/usercircle.png";
import chat from "../assets/icons/previewlisting/chatmessages.png";
import call from "../assets/icons/previewlisting/callphone.png";
import camera from "../assets/icons/previewlisting/camera.png";
import cpr from "../assets/images/cpr.png";
import { Flex, Progress } from "antd";
import { Slider, Carousel } from "antd";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const PreviewListing = () => {
  const [stepsGap, setStepsGap] = React.useState(0);
  const [homePrice, setHomePrice] = React.useState(100000); // Default home price value
  const [downPayment, setDownPayment] = React.useState(10000); // Default down payment value
  const [amountInPesos, setPesos] = React.useState(500);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [smallImages, setSmallImages] = React.useState([livingroom, bathroom]); // Initial small images
  const [photoCount, setPhotoCount] = React.useState(); // Initial photo count

  const handlePesosChange = (newPesos) => {
    setPesos(newPesos);
  };

  //sa Kadtu nig pag next sa mga photo
  const images = [bedroom,livingroom, bathroom ,image701, image702, image703, image704, image705];

  const previousImage = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    updateSmallImages(newIndex);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    updateSmallImages(newIndex);
  };

  const updateSmallImages = (newIndex) => {
    // Get the next 2 main images after the current index
    const nextIndex1 = (newIndex + 1) % images.length;
    const nextIndex2 = (newIndex + 2) % images.length;

    const newSmallImages = [images[nextIndex1], images[nextIndex2]];
    setSmallImages(newSmallImages);

    // Update photo count based on new index
    const newPhotoCount = getPhotoCountForMainImage(newIndex);
    setPhotoCount(newPhotoCount);
  };

  const getPhotoCountForMainImage = (index) => {
    // Add logic to get the photo count for each main image
    // For example, you can have an object that maps image index to photo count
  };

  //pag add sa paborito
  const [isFavorite, setIsFavorite] = React.useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  //Commercial Property for Rent na part
  const all = [cpr, carousel2, carousel3, carousel4];
  const [index, setIndex] = React.useState(0);

  const secImage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % all.length);
  };

  const firstImage = () => {
    setIndex((prevIndex) =>
      prevIndex - 1 < 0 ? all.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="previewlist">
      {/* <Navigation /> */}

      <div
        className="contentContainer"
        style={{ display: "flex", width: "100%", gap: "1rem" }}
      >
        <div className="real-estate-listing-card">
          <div className="galleryComponent">
          <div className="gallery">
            <div className="image-container-large">
              <img
                src={images[currentIndex]}
                alt="Preview"
                className="all-images"
              />

              <div className="centered">PHP 120,000,000</div>

              <div className="icns">
                <div className="bottom-right">
                  <div className="icon-circle" onClick={toggleFavorite}>
                    <div
                      className={`heart-icon ${isFavorite ? "favorite" : ""}`}
                    >
                      <span className="material-symbols-outlined">
                        {isFavorite ? "favorite" : "favorite_border"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <div className="icon-circle">
                    <img
                      src={filter_alt}
                      className="fas fa-filter"
                      alt="Filter"
                    />
                  </div>
                </div>
                <div className="Printer">
                  <div className="icon-circle">
                    <img src={printer} alt="Printer" />
                  </div>
                </div>
                <div className="share">
                  <div className="icon-circle">
                    <img src={share} alt="Share" />
                  </div>
                </div>
              </div>
              <div className="prev-next">
                <div className="backward" onClick={previousImage}>
                  <img src={fabackward} width="40" height="40" alt="Previous" />
                </div>

                <div className="fanext" onClick={nextImage}>
                  <FontAwesomeIcon icon={faPlay} />
                </div>
              </div>

              <div className="preview-list-property-details">
                <div className="pl-for-sale">For Sale</div>
                <h2>5 Bedroom House for Rent in Maria Luisa Park</h2>
                <div className="location">
                  <img src={location} alt="Location" /> Maria Luisa Estate Park,
                  Banilad, Cebu City
                </div>
              </div>
            </div>
            <div className="small-images">
              {smallImages.map((src, idx) => (
                <div key={idx} className="small-image">
                  <img
                    src={src}
                    alt={`Small ${idx + 1}`}
                    className="small-img"
                  />
                </div>
              ))}
              <div className="camera-info">
                <img src={camera} alt="Camera Icon" className="camera" />
                <h2>{currentIndex + 1} </h2>
                <p className="photos">{photoCount} Photos</p>
              </div>
            </div>
          </div>
          </div>
          <div className="previewlist-overview">
            <span>OVERVIEW</span>
            <p>Property ID: 123456789</p>
          </div>
          <div className="midContent">
            <div className="leftContent">
              <div className="previewlist-property-info">
                <div className="property-info-item">
                  <span>Bedrooms:</span>
                  <span>5</span>
                  <img src={bedrooms} alt="" />
                </div>
                <div className="property-info-item">
                  <span>Bathrooms:</span>
                  <span>5</span>
                  <img src={bathrooms} alt="" />
                </div>
                <div className="property-info-item">
                  <span>Garage:</span>
                  <span>300 SqM</span>
                  <img src={garage} alt="" />
                </div>
                <div className="property-info-item">
                  <span>Area:</span>
                  <span>300 SqM</span>
                  <img src={sqm} alt="" className="sqm" />
                </div>
                <div className="property-info-item">
                  <span>Price per SqM:</span>
                  <span style={{ color: "red", fontSize: "15px" }}>
                    PHP 400,000
                  </span>
                </div>
              </div>
              <div className="Description">
                <h3>Description</h3>
                <p>
                  Maria Luisa Estate Park, Cebu’s most prestigious and most
                  sought after residential development both by locals and
                  foreigners alike, is set proudly atop the Banilad and Busay
                  Hills of Cebu. It encompasses 200 hectares of prime
                  residential property with the excellent reputation of being
                  the most desirable and exclusive neighborhood to live in Cebu.
                  Homes there catches the cool breeze while enjoying a
                  magnificent view of the city and the Visayan sea. It has been
                  known to provide comfort, security and safety to its
                  residents.
                </p>
              </div>
              <div className="preview-table">
                <table className="Listing-property-details">
                  <tbody>
                    <tr>
                      <th>Property ID</th>
                      <td className="view-top-border">1234567893</td>
                    </tr>
                    <tr>
                      <th>Listing Type</th>
                      <td>House for Sale</td>
                    </tr>
                    <tr>
                      <th>Location</th>
                      <td>Maria Luisa Estate Park, Banilad, Cebu City</td>
                    </tr>
                    <tr>
                      <th>Bedroom</th>
                      <td>5 Beds</td>
                    </tr>
                    <tr>
                      <th>Bathroom</th>
                      <td>5 Bath</td>
                    </tr>
                    <tr>
                      <th>Floor Area</th>
                      <td>300 SqM</td>
                    </tr>
                    <tr>
                      <th>Lot Area</th>
                      <td>300 SqM</td>
                    </tr>
                    <tr>
                      <th>Price per SqM</th>
                      <td>PHP400,000</td>
                    </tr>
                    <tr>
                      <th>No of Floors</th>
                      <td>3 Floors</td>
                    </tr>
                    <tr>
                      <th>Car Parking</th>
                      <td>3 Cars</td>
                    </tr>
                    <tr>
                      <th>Furnishing</th>
                      <td>Furnished</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="featuresamenites">
                {" "}
                <h3>Features & Amenities</h3>
                <ul>
                  <li>Landscaped Parks with picnic grounds</li>
                  <li>Jogging trails</li>
                  <li>The Highland Park and Clubhouse</li>
                  <li>The Emerald Lake valley</li>
                  <li>Basketball and Tennis court</li>
                  <li>Children Playground</li>
                  <li>Water and Electric facilities</li>
                  <li>State of the art communications facilities</li>
                  <li>5 Bedroom House for Rent in Maria Luisa Park</li>
                </ul>
              </div>
              <div className="includes">
                <h3>Includes:</h3>
                <ul>
                  <li>Living Room with Dining Area</li>
                  <li>Kitchen Area</li>
                  <li>Master Bedroom with walk-in closet, toilet and bath</li>
                  <li>Four (4) Bedrooms each with toilet and bath</li>
                  <li>Lanai</li>
                  <li>Landscaped Garden</li>
                  <li>Maid’s Room</li>
                  <li>Service Kitchen</li>
                  <li>Service Area</li>
                </ul>
              </div>
              <div className="view-features">
                <h3>Features:</h3>
                <div className="feature-grid">
                  <div className="feature-item">
                    <input
                      type="checkbox"
                      id="air-conditioning"
                      checked
                      readOnly
                    />
                    <label>Air Conditioning</label>
                  </div>
                  <div className="feature-item">
                    <input type="checkbox" id="laundry-room" checked readOnly />
                    <label>Laundry Room</label>
                  </div>
                  <div className="feature-item">
                    <input
                      type="checkbox"
                      id="open-car-spaces"
                      checked
                      readOnly
                    />
                    <label>Open Car Spaces</label>
                  </div>
                  <div className="feature-item">
                    <input type="checkbox" id="balcony" checked readOnly />
                    <label>Balcony</label>
                  </div>
                  <div className="feature-item">
                    <input type="checkbox" id="cctv" checked readOnly />
                    <label>CCTV</label>
                  </div>
                  <div className="feature-item">
                    <input type="checkbox" id="driver-room" checked readOnly />
                    <label>Driver Room</label>
                  </div>
                  <div className="feature-item">
                    <input type="checkbox" id="maid-room" checked readOnly />
                    <label>Maid Room</label>
                  </div>
                  <div className="feature-item">
                    <input type="checkbox" id="powder-room" checked readOnly />
                    <label>Powder Room</label>
                  </div>
                  <div className="feature-item">
                    <input
                      type="checkbox"
                      id="landscape-garden"
                      checked
                      readOnly
                    />
                    <label>Landscape Garden</label>
                  </div>
                  <div className="feature-item">
                    <input
                      type="checkbox"
                      id="sports-facilities"
                      checked
                      readOnly
                    />
                    <label>Sports Facilities</label>
                  </div>
                  <div className="feature-item">
                    <input
                      type="checkbox"
                      id="swimming-pool"
                      checked
                      readOnly
                    />
                    <label>Swimming Pool</label>
                  </div>
                  <div className="feature-item">
                    <input type="checkbox" id="security" checked readOnly />
                    <label>24/7 Security</label>
                  </div>
                </div>
              </div>

              <div className="property-on-map">
                <h3>Property on Map</h3>
                <img src={map} alt="" />
              </div>
              <div className="view-similar-properties">
                <h3>Similar Properties</h3>
                <div className="view-listi-buttons">
                  <button className="recommendedactive">Recommended</button>
                  <button className="locationbutt">Location</button>
                  <button className="property-type">Property Type</button>
                  <button className="listing-type">Listing Type</button>
                </div>
              </div>
            </div>
            <div className="right-side-container">
              <div className="calculator">
                <h2>Calculator</h2>

                <div className="calc">
                  <div className="calculatorLeft">
                    <div className="calculator-input">
                      <label>Term</label>
                      <div className="calculator-field">
                        <img
                          src={iconcalcu}
                          alt="Iconcalcu"
                          style={{
                            height: "15px",
                            width: "15px",
                            margin: "10px",
                          }}
                        />

                        <span>30 Years Fixed</span>
                      </div>
                    </div>

                    <div className="calculator-input">
                      <label>Interest</label>
                      <div className="calculator-field">
                        <img
                          src={icondollar}
                          alt="Icondollar"
                          style={{
                            height: "15px",
                            width: "15px",
                            margin: "10px",
                            marginBottom: "30px",
                          }}
                        />

                        <div className="slider-container">
                          <div className="slider-value">{stepsGap}%</div>
                          <Slider
                            step={1}
                            min={1}
                            max={100}
                            value={stepsGap}
                            onChange={setStepsGap}
                            trackStyle={{ backgroundColor: "red" }}
                            handleStyle={{
                              borderColor: "red",
                              backgroundColor: "red",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="calculator-input">
                      <label>Home Price</label>
                      <div className="calculator-field">
                        <img
                          src={icondollar}
                          alt="Icondollar"
                          style={{
                            height: "15px",
                            width: "15px",
                            margin: "10px",
                            marginBottom: "30px",
                          }}
                        />

                        <div className="slider-container">
                          <div className="slider-value">
                            PHP {homePrice.toLocaleString()}
                          </div>
                          <Slider
                            step={10000}
                            min={500000}
                            max={10000000}
                            value={homePrice}
                            onChange={setHomePrice}
                            trackStyle={{ backgroundColor: "red" }}
                            handleStyle={{
                              borderColor: "red",
                              backgroundColor: "red",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="calculator-input">
                      <label>Down Payment</label>
                      <div className="calculator-field">
                        <img
                          src={icondollar}
                          alt="Icondollar"
                          style={{
                            height: "15px",
                            width: "15px",
                            margin: "10px",
                            marginBottom: "30px",
                          }}
                        />
                        <div className="slider-container">
                          <div className="slider-value">
                            PHP {downPayment.toLocaleString()}
                          </div>
                          <Slider
                            step={5000}
                            min={100000}
                            max={homePrice}
                            value={downPayment}
                            onChange={setDownPayment}
                            trackStyle={{ backgroundColor: "red" }}
                            handleStyle={{
                              borderColor: "red",
                              backgroundColor: "red",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="calculatorRight">
                    <div className="int">
                      <b>30</b>
                      <p>Years Fixed</p>
                    </div>
                    <div className="exp">
                      <b>0%</b>
                      <p>Interest</p>
                    </div>
                    <Flex gap="small" wrap>
                      <Progress
                        type="circle"
                        percent={100}
                        format={(percent) => `${percent} PHP `}
                      />
                    </Flex>
                    <div className="calculator-result">
                      <p className="pi">Principle and Interest</p>
                      <div className="result-amount">
                        <span className="red-bar"></span>
                        PHP 200
                      </div>
                    </div>
                  </div>
                </div>

                <button className="apply-button">APPLY NOW</button>
              </div>

              <div className="contact-us">
                <h2>Contact Us</h2>
                <div className="contact-input">
                  <img src={user} />
                  <input type="text" placeholder="Name" />
                </div>
                <div className="contact-input">
                  <img src={mail}></img>
                  <input type="email" placeholder="Email" />
                </div>
                <div className="contact-input">
                  <img src={call}></img>
                  <input type="tel" placeholder="Phone Number" />
                </div>
                <div className="contact-textarea">
                  <img src={chat}></img>
                  <textarea placeholder="I am interested in 5 Bedroom House for Rent in Maria Luisa Park"></textarea>
                </div>
                <button className="send-message-button">Send Message</button>
              </div>
              <h3>Featured Properties</h3>

              <div className="commercial-property-rent">
                <h2>Commercial Property for Rent</h2>
                <div className="commercial-property-details">
                  <div className="commercial-property-image">
                    {/* <img src={cpr} className="commercial-property-img" /> */}
                    <img src={all[index]} className="all" />
                    <div className="property-labels">
                      <span className="property-label">For Sale</span>
                      <span className="property-label featured">Featured</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="small-image-container">
                <div className="previous-img" onClick={firstImage}>
                  <img src={previous} width="50" height="50" alt="Previous" />
                </div>
                <img className="small-image-container" />
                <div className="next-img" onClick={secImage}>
                  <img src={next} width="55" height="55" alt="Next" />
                  <div className="small-image-icons">
                    <img src={iconheart} alt="" />
                    <img src={iconfilter} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PreviewListing;
