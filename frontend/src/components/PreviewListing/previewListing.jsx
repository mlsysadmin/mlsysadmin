import React from "react";
import Navigation from "../layout/NavigationComponent";
import Footer from "../MY Drafts/Components/FooterComponent";
import "../../styles/previewListing.css";
import bedroom from "../../assets/images/image1.png";
import livingroom from "../../assets/images/image2.png";
import bathroom from "../../assets/images/image3.png";
import filter_alt from "../../assets/icons/previewlisting/filter_alt.png";
import share from "../../assets/icons/previewlisting/share.png";
import printer from "../../assets/icons/previewlisting/printer.png";
import bedrooms from "../../assets/icons/previewlisting/bedrooms.png";
import bathrooms from "../../assets/icons/previewlisting/bathroom.png";
import garage from "../../assets/icons/previewlisting/garage.png";
import sqm from "../../assets/icons/previewlisting/sqm.png";
// import map from "../../assets/images/map.png";
import iconcalcu from "../../assets/icons/previewlisting/calculatorsign.png";
import icondollar from "../../assets/icons/previewlisting/dollarcoin.png";
import location from "../../assets/icons/previewlisting/location.png";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mail from "../../assets/icons/previewlisting/mailenvelope.png";
import user from "../../assets/icons/previewlisting/usercircle.png";
import chat from "../../assets/icons/previewlisting/chatmessages.png";
import call from "../../assets/icons/previewlisting/callphone.png";
import camera from "../../assets/icons/previewlisting/camera.png";
import cpr from "../../assets/images/cpr.png";
import { Flex, Progress } from "antd";
import { Slider, Carousel } from "antd";
// const contentStyle = {
//   margin: 0,
//   height: '160px',
//   color: '#fff',
//   lineHeight: '160px',
//   textAlign: 'center',
//   background: '#364d79',
// };
const PreviewListing = () => {
  const [stepsGap, setStepsGap] = React.useState(0);
  const [homePrice, setHomePrice] = React.useState(100000); // Default home price value
  const [downPayment, setDownPayment] = React.useState(10000); // Default down payment value
  const [pesos, setPesos] = React.useState(100); // Default value to ensure full progress

  // If you have logic to update pesos, you can include that logic here
  // For demonstration, we set it to 100 to make the progress bar full

  const handlePesosChange = (newPesos) => {
    setPesos(newPesos);
  };

  return (
    <div className="previewlist">
      <Navigation />
      <div
        className="contentContainer"
        style={{ display: "flex", width: "100%", gap: "1rem" }}
      >
        <div className="real-estate-listing-card">
          <div className="gallery">
            <div className="image-container large">
              <div className="container">
                <div className="bottom-left">
                  <h2>5 Bedroom House for Rent in Maria Luisa Park</h2>
                  <p>
                    <img src={location} className="LocationIcon" />
                    Maria Luisa Estate Park, Banilad, Cebu City
                  </p>
                </div>
                <div className="icns">
                  
                  <div className="bottom-right">
                    <i className="fas fa-heart"></i>
                  
                  </div>
                  <div className="right">
                    <img src={filter_alt} className="fas.fa-filter" />
                  </div>
                  <div className="Printer">
                  {/* <i class="fa-solid fa-print"></i> */}
                  <img src={printer} alt="" />
                  </div>
                  <div className="share">
                  {/* <i class="fa-solid fa-square-share-nodes"></i> */}
                  <img src={share} alt="" />
                  </div>
                </div>
                <div className="for-sale">For Sale</div>
              </div>
              <img src={bedroom} alt="Bedroom" className="bedroom" />
              <div className="overlay">
                <h2>5 Bedroom House for Rent in Maria Luisa Park</h2>
                <span className="price-tag">PHP 120,000,000</span>
              </div>
            </div>
            <div className="small-images">
              
              <div className="small-image">
                <img
                  src={livingroom}
                  alt="Living Room"
                  className="livingroom"
                />
              </div>
              <div className="small-image">
                <img src={bathroom} alt="Bathroom" className="bathroom" />
              </div>
              <div className="camera-info">
                <img src={camera} alt="Camera Icon" className="camera" />
                <h2>18</h2>
                <p>Photos</p>
              </div>
            </div>
          </div>

          <div className="midContent">
            <div className="leftContent">
              <div className="overview">
                <span>OVERVIEW</span>
                <p>Property ID: 123456789</p>
              </div>
              <div className="property-info">
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
                  <img src={sqm} alt=""  className="sqm"/>
                </div>
                <div className="property-info-item">
                  <span>Price per SqM:</span>
                  <span style={{color:'red', fontSize:'25px'}}>PHP 400,000</span>
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
              <table class="property-details">
                <tr>
                  <th>Property ID</th>
                  <td>1234567893</td>
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
              </table>

              <div className="featuresamenites">
                <h3>Features and Amenities:</h3>
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
              <div class="features">
                <h3>Features:</h3>
                <div class="feature-grid">
                  <div class="feature-item">
                    <input
                      type="checkbox"
                      id="air-conditioning"
                      checked
                      readonly
                    />
                    <label for="air-conditioning">Air Conditioning</label>
                  </div>
                  <div class="feature-item">
                    <input type="checkbox" id="laundry-room" checked readonly />
                    <label for="laundry-room">Laundry Room</label>
                  </div>
                  <div class="feature-item">
                    <input
                      type="checkbox"
                      id="open-car-spaces"
                      checked
                      readonly
                    />
                    <label for="open-car-spaces">Open Car Spaces</label>
                  </div>
                  <div class="feature-item">
                    <input type="checkbox" id="balcony" checked readonly />
                    <label for="balcony">Balcony</label>
                  </div>
                  <div class="feature-item">
                    <input type="checkbox" id="cctv" checked readonly />
                    <label for="cctv">CCTV</label>
                  </div>
                  <div class="feature-item">
                    <input type="checkbox" id="driver-room" checked readonly />
                    <label for="driver-room">Driver Room</label>
                  </div>
                  <div class="feature-item">
                    <input type="checkbox" id="maid-room" checked readonly />
                    <label for="maid-room">Maid Room</label>
                  </div>
                  <div class="feature-item">
                    <input type="checkbox" id="powder-room" checked readonly />
                    <label for="powder-room">Powder Room</label>
                  </div>
                  <div class="feature-item">
                    <input
                      type="checkbox"
                      id="landscape-garden"
                      checked
                      readonly
                    />
                    <label for="landscape-garden">Landscape Garden</label>
                  </div>
                  <div class="feature-item">
                    <input
                      type="checkbox"
                      id="sports-facilities"
                      checked
                      readonly
                    />
                    <label for="sports-facilities">Sports Facilities</label>
                  </div>
                  <div class="feature-item">
                    <input
                      type="checkbox"
                      id="swimming-pool"
                      checked
                      readonly
                    />
                    <label for="swimming-pool">Swimming Pool</label>
                  </div>
                  <div class="feature-item">
                    <input type="checkbox" id="security" checked readonly />
                    <label for="security">24/7 Security</label>
                  </div>
                </div>
                <div class="similar-properties">
                  <h3>Similar Properties</h3>
                  <button class="recommendedactive">Recommended</button>
                  <button class="location">Location</button>
                  <button class="property-type">Property Type</button>
                  <button class="listing-type">Listing Type</button>
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
                        <img src={iconcalcu} alt="Iconcalcu" />

                        <span>30 Years Fixed</span>
                      </div>
                    </div>

                    <div className="calculator-input">
                      <label>Interest</label>
                      <div className="calculator-field">
                        <img src={icondollar} alt="Icondollar" />

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
                        <img src={icondollar} alt="Icondollar" />

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
                        <img src={icondollar} alt="Icondollar" />
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
                    <Flex wrap gap="small">
                      <Progress
                        strokeLinecap="butt"
                        type="circle"
                        percent={100}
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
                <img src={cpr}></img>
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
