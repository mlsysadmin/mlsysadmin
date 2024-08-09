// ApplicationDetailModal.js
import React, { useState } from "react";
import "../../../styles/applicationModal.css";
import { Button, message } from "antd";
import axios from 'axios';
import OTPModal from "../../OTPModal";
const FileUploadGrid = ({ validateFiles }) => {
  const [files, setFiles] = useState([null, null, null, null]);

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      message.error("Only image files are allowed!");
      return;
    }
    const newFiles = [...files];
    newFiles[index] = file;
    setFiles(newFiles);
    validateFiles(newFiles);
  };

  const descriptions = [
    {
      label: "Valid ID",
      span: "(for self/employed)",
    },
    {
      label: "Latest (ITR)",
      descriptionSpan: "Income Tax Return",
      span: "(for self/employed)",
    },
    {
      label: "Latest Payslip",
      span: "(for employed)",
    },
    {
      label: "Latest (COE)",
      descriptionSpan: "Certificate of Employment",
      span: "(for employed)",
    },
  ];

  return (
    <div className="grid-container">
      {files.map((file, index) => (
        <div key={index} className="grid-item">
          <div className="addButton">
            <input
              type="file"
              id={`file-input-${index}`}
              onChange={(event) => handleFileChange(index, event)}
              accept="image/*"
              required
            />
            {!file && (
              <label htmlFor={`file-input-${index}`} className="file-label">
                <span className="plus-icon">+</span>
              </label>
            )}
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt={`Selected file ${index}`}
                className="selected-image"
              />
            )}
          </div>
          <div className="file-description">
            <p>{descriptions[index].label}</p>
            {descriptions[index].descriptionSpan && (
              <p className="description-span">
                {descriptions[index].descriptionSpan}
              </p>
            )}
            <p className="files-span">{descriptions[index].span}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
const ApplicationDetailModal = ({ visible, onClose }) => {
  const [showOTPModal, setShowOTPModal] = useState(false);

<<<<<<< HEAD
=======
const ApplicationDetailModal = () => {
  const [userDetails, setUserDetails] = useState()

  const searchKYC = process.env.REACT_APP_SEARCH_KYC

>>>>>>> c9b3a0ccf32c1ab78f241c3e6cac282d7328b41e
  const [formValues, setFormValues] = useState({
    mobileNumber: "",
    lastName: "",
    firstName: "",
    email: "",
    country: "",
    province: "",
    city: "",
    zipcode: "",
    address: "",
  });

  const [files, setFiles] = useState([null, null, null, null]);

<<<<<<< HEAD
  const staticUserData = [
    {
      number: '123456789',
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'john.doe@example.com',
      addresses: {
        country: 'USA',
        state: 'Anytown',
        city: 'Anytown',
        streetAddress1: '123 Main St',
        streetAddress2: '',
        zipCode: '',
      },
      tier: 'Gold',
    },
    {
      number: '09246162321',
      firstName: 'Jane',
      lastName: 'Doe',
      emailAddress: 'jane.doe@example.com',
      addresses: {
        country: 'USA',
        state: 'California',
        city: 'Somewhere City',
        streetAddress1: '456 Oak Rd',
        streetAddress2: '',
        zipCode: '12345',
      },
      tier: 'Platinum',
    },
  ];

  const handleNumberChange = (e) => {
    setFormValues({ ...formValues, mobileNumber: e.target.value });
=======
  const handleNumberChange = (e) => {
    setFormValues({ ...formValues, mobileNumber: e.target.value });
    // setUserNumber(e.target.value);
>>>>>>> c9b3a0ccf32c1ab78f241c3e6cac282d7328b41e
    if (e.target.value.length === 11) {
      fetchUserDetails(e.target.value);
    }
  };

  const fetchUserDetails = async (inputtedNumber) => {
<<<<<<< HEAD
    const userFromStaticData = staticUserData.find(
      (user) => user.number === inputtedNumber
    );
    if (userFromStaticData) {
      setFormValues({
        ...formValues,
        lastName: userFromStaticData.lastName,
        firstName: userFromStaticData.firstName,
        email: userFromStaticData.emailAddress,
        country: userFromStaticData.addresses.country,
        province: userFromStaticData.addresses.state,
        city: userFromStaticData.addresses.city,
        zipcode: userFromStaticData.addresses.zipCode,
        address: `${userFromStaticData.addresses.streetAddress1} ${userFromStaticData.addresses.streetAddress2}`,
      });
    } else {
      try {
        const response = await axios.get(`api/user/searchKYC/${inputtedNumber}`);
        const fetchedData = response.data;
        setFormValues({
          ...formValues,
          lastName: fetchedData.lastName,
          firstName: fetchedData.firstName,
          email: fetchedData.emailAddress,
          country: fetchedData.addresses.country,
          province: fetchedData.addresses.state,
          city: fetchedData.addresses.city,
          zipcode: fetchedData.addresses.zipCode,
          address: `${fetchedData.addresses.streetAddress1} ${fetchedData.addresses.streetAddress2}`,
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }
  };

=======
    try{
      const response = await axios.get(`${searchKYC}/user/searchKYC/${inputtedNumber}`);
      setUserDetails(response.data);

    }catch(error){
      console.error('Error fetching user info:', error);
    }
  };

  console.log(userDetails);
>>>>>>> c9b3a0ccf32c1ab78f241c3e6cac282d7328b41e
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateFiles = (newFiles) => {
    setFiles(newFiles);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    for (const key in formValues) {
      if (formValues[key] === "") {
        message.error("All fields are required!");
        return;
      }
    }

    const allFilesSelected = files.every((file) => file !== null);
    if (!allFilesSelected) {
      message.error("All files must be uploaded!");
      return;
    }

    // Handle form submission here
    console.log("Form values:", formValues);
    console.log("Files selected:", files);

    // Close the application modal and show OTP Modal
    onClose();
    setShowOTPModal(true);
  };

  return (
<<<<<<< HEAD
    <>
      {visible && (
        <div className="modal-main-container">
          <div className="overlay" onClick={onClose}></div>
          <div className="application-modal-container">
            <h3 className="application-header">Application Details</h3>
            <form onSubmit={handleSubmit} className="application-modal-content">
              <div className="application-row">
                <div className="application-first-row">
                  <div className="application-content">
                    <p>Mobile Number</p>
                    <input
                      type="text"
                      name="mobileNumber"
                      className="application-input"
                      placeholder="09"
                      value={formValues.mobileNumber}
                      onChange={handleNumberChange}
                      required
                      pattern="\d{10,11}"
                      maxLength="11"
                      title="Mobile number should be 10-11 digits"
                    />
                  </div>
                </div>
                <div className="application-second-row">
                  <div className="application-content">
                    <p>Lastname</p>
                    <input
                      type="text"
                      name="lastName"
                      className="application-input"
                      placeholder="Lastname"
                      value={formValues.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="application-content">
                    <p>First Name</p>
                    <input
                      type="text"
                      name="firstName"
                      className="application-input"
                      placeholder="First Name"
                      value={formValues.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="application-content">
                    <p>Email Address</p>
                    <input
                      type="email"
                      name="email"
                      className="application-input"
                      placeholder="Email Address"
                      value={formValues.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="application-third-row">
                  <div className="application-content">
                    <p>Country</p>
                    <select
                      name="country"
                      className="application-select"
                      value={formValues.country}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                  <div className="application-content">
                    <p>Province/State</p>
                    <select
                      name="province"
                      className="application-select"
                      value={formValues.province}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Province</option>
                      <option value="CA-ON">Ontario</option>
                      <option value="CA-BC">British Columbia</option>
                      <option value="US-NY">New York</option>
                      <option value="US-CA">California</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>
                  <div className="application-content">
                    <p>City/Town</p>
                    <select
                      name="city"
                      className="application-select"
                      value={formValues.city}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select City</option>
                      <option value="Toronto">Toronto</option>
                      <option value="Vancouver">Vancouver</option>
                      <option value="New York">New York</option>
                      <option value="Los Angeles">Los Angeles</option>
                    </select>
                  </div>
                </div>
                <div className="application-fourth-row">
                  <div className="application-content">
                    <p>Zipcode</p>
                    <select
                      name="zipcode"
                      className="application-select"
                      value={formValues.zipcode}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Zipcode</option>
                      <option value="10001">10001</option>
                      <option value="90001">90001</option>
                      <option value="M5H">M5H</option>
                      <option value="V5K">V5K</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>
                  <div className="address-input">
                    <p>House No/Unit/Building Name/Street</p>
                    <input
                      type="text"
                      name="address"
                      className="application-input"
                      placeholder="Address"
                      value={formValues.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="files-container">
=======
    <div className="modal-main-container">
      <div className="overlay"></div>
      <div className="application-modal-container">
        <h3 className="application-header">Application Details</h3>
        <form onSubmit={handleSubmit} className="application-modal-content">
          <div className="application-row">
            <div className="application-first-row">
              <div className="application-content">
                <p>Mobile Number</p>
                <input
                  type="text"
                  name="mobileNumber"
                  className="application-input"
                  placeholder="09"
                  // value={formValues.mobileNumber}
                  // onChange={handleNumberChange}
                  required
                  pattern="\d{10,11}"
                  maxLength="11"
                  title="Mobile number should be 10-11 digits"
                />
              </div>
            </div>
            <div className="application-second-row">
              <div className="application-content">
                <p>Lastname</p>
                <input
                  type="text"
                  name="lastName"
                  className="application-input"
                  placeholder="Lastname"
                  // value={userDetails.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="application-content">
                <p>First Name</p>
                <input
                  type="text"
                  name="firstName"
                  className="application-input"
                  placeholder="First Name"
                  // value={userDetails.firstname}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="application-content">
                <p>Email Address</p>
                <input
                  type="email"
                  name="email"
                  className="application-input"
                  placeholder="Email Address"
                  // value={userDetails.emailAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="application-third-row">
              <div className="application-content">
                <p>Country</p>
                <select
                  name="addresses.country"
                  className="application-select"
                  // value={userDetails.addresses.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
              <div className="application-content">
                <p>Province/State</p>
                <select
                  name="addresses.state"
                  className="application-select"
                  // value={userDetails.addresses.province}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Province</option>
                  <option value="CA-ON">Ontario</option>
                  <option value="CA-BC">British Columbia</option>
                  <option value="US-NY">New York</option>
                  <option value="US-CA">California</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="application-content">
                <p>City/Town</p>
                <select
                  name="addresses.city"
                  className="application-select"
                  // value={userDetails.addresses.city}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select City</option>
                  <option value="Toronto">Toronto</option>
                  <option value="Vancouver">Vancouver</option>
                  <option value="New York">New York</option>
                  <option value="Los Angeles">Los Angeles</option>
        
                </select>
              </div>
            </div>
            <div className="application-fourth-row">
              <div className="application-content">
                <p>Zipcode</p>
                <select
                  name="zipcode"
                  className="application-select"
                  // value={userDetails.addresses.zipCode}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Zipcode</option>
                  <option value="10001">10001</option>
                  <option value="90001">90001</option>
                  <option value="M5H">M5H</option>
                  <option value="V5K">V5K</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="address-input">
                <p>House No/Unit/Building Name/Street</p>
                <input
                  type="text"
                  name="address"
                  className="application-input"
                  placeholder="Enter House No/Unit/Building Name/Street"
                  // value={formValues.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="files-container">
>>>>>>> c9b3a0ccf32c1ab78f241c3e6cac282d7328b41e
            <h5>Upload Documents</h5>
            <div>
              <p style={{ color: "#8C9094" }}>
                All documents are required to be uploaded{" "}
                <span style={{ color: "red" }}>**</span>
              </p>
            </div>
                <FileUploadGrid validateFiles={validateFiles} />
              </div>
              <div className="application-submitbtn">
                <button type="submit" id="application-submitbtn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
                  {showOTPModal && <OTPModal visible={showOTPModal} onClose={() => setShowOTPModal(false)} />}
<<<<<<< HEAD

    </>
  );
=======
>>>>>>> c9b3a0ccf32c1ab78f241c3e6cac282d7328b41e
};

export default ApplicationDetailModal;
