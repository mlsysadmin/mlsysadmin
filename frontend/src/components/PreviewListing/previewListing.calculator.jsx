// import React from "react";
// import "../../styles/preview.listingcalcu.css";
// import iconcalcu from "../../assets/icons/previewlisting/calculatorsign.png";
// import icondollar from "../../assets/icons/previewlisting/dollarcoin.png";
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import mail from "../../assets/icons/previewlisting/mailenvelope.png";
// import user from "../../assets/icons/previewlisting/usercircle.png";
// import chat from "../../assets/icons/previewlisting/chatmessages.png";
// import call from "../../assets/icons/previewlisting/callphone.png";



// import { Slider } from "antd";

// const Calculator = () => {
//   const [stepsGap, setStepsGap] = React.useState(0);
//   const [homePrice, setHomePrice] = React.useState(100000); // Default home price value
//   const [downPayment, setDownPayment] = React.useState(10000); // Default down payment value

//   return (
//     <div className="right-side-container">
//       <div className="calculator">
//         <h2>Calculator</h2>

//         <div className="calculator-input">
//           <label>Term</label>
//           <div className="calculator-field">
//             <img src={iconcalcu} alt="Iconcalcu" />

//             <span>30 Years Fixed</span>
//           </div>
//         </div>

//         <div className="calculator-input">
//           <label>Interest</label>
//           <div className="calculator-field">
//             <img src={icondollar} alt="Icondollar" />

//             <div className="slider-container">
//               <div className="slider-value">{stepsGap}%</div>
//               <Slider
//                 step={1}
//                 min={1}
//                 max={100}
//                 value={stepsGap}
//                 onChange={setStepsGap}
//                 trackStyle={{ backgroundColor: "red" }}
//                 handleStyle={{ borderColor: "red", backgroundColor: "red" }}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="calculator-input">
//           <label>Home Price</label>
//           <div className="calculator-field">
//             <img src={icondollar} alt="Icondollar" />

//             <div className="slider-container">
//               <div className="slider-value">
//                 PHP {homePrice.toLocaleString()}
//               </div>
//               <Slider
//                 step={10000}
//                 min={500000}
//                 max={10000000}
//                 value={homePrice}
//                 onChange={setHomePrice}
//                 trackStyle={{ backgroundColor: "red" }}
//                 handleStyle={{ borderColor: "red", backgroundColor: "red" }}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="calculator-input">
//           <label>Down Payment</label>
//           <div className="calculator-field">
//             <img src={icondollar} alt="Icondollar" />
//             <div className="slider-container">
//               <div className="slider-value">
//                 PHP {downPayment.toLocaleString()}
//               </div>
//               <Slider
//                 step={5000}
//                 min={100000}
//                 max={homePrice}
//                 value={downPayment}
//                 onChange={setDownPayment}
//                 trackStyle={{ backgroundColor: "red" }}
//                 handleStyle={{ borderColor: "red", backgroundColor: "red" }}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="calculator-result">
//           <p className="pi">Principle and Interest</p>
//           <div className="result-amount">PHP 200</div>
//         </div>
       
//         <button className="apply-button">APPLY NOW</button>
//       </div>

//       <div className="contact-us">
//         <h2>Contact Us</h2>
//         <div className="contact-input">
//         <img src={user}/>
//           <input type="text" placeholder="Name" />
//         </div>
//         <div className="contact-input">
//         <img src={mail}></img> 
//           <input type="email" placeholder="Email" />
//         </div>
//         <div className="contact-input">
//         <img src={call}></img>
//           <input type="tel" placeholder="Phone Number" />
//         </div>
//         <div className="contact-input">
//           <img src={chat}></img>
//           <textarea placeholder="I am interested in 5 Bedroom House for Rent in Maria Luisa Park"></textarea>
//         </div>
//         <button className="send-message-button">Send Message</button>
//       </div>
//     </div>
//   );
// };

// export default Calculator;
