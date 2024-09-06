import { useState, useEffect } from "react";
import { Modal } from "antd";
import "../../styles/otherservicesSearchPropertyModal.css"; // Ensure you have this CSS for styling
import {
	GetCountry,
	GetCities,
	GetProvince,
} from "../../api/Public/Location.api";
import { searchKyc } from "../../api/Public/User.api";

const PropertySearchModal = ({ openModal, closeModal }) => {
	const [userDetails, setUserDetails] = useState(null);
	const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
	const [formData, setFormData] = useState({
		mobileNumber: "",
		email: "",
		lastName: "",
		firstName: "",
		middleName: "",
		suffix: "",

	});

	// const handleInputChange = async (e) => {
	// 	const { name, value } = e.target;
	// 	setFormData((prevFormData) => ({
	// 		...prevFormData,
	// 		[name]: value,
	// 	}));

	// 	if (name === "mobileNumber" && value.length === 11) {
	// 		try {
	// 			const response = await searchKyc(value);
	// 			const respData = response.data.data;
	// 			setUserDetails(respData);
	// 			console.log("datas:", respData);
	// 			if (respData) {
	// 				setFormData((prevFormData) => ({
	// 					...prevFormData,
	// 					firstName: respData.name?.firstName
	// 						? respData.name.firstName.replace(/.(?=.{2})/g, "*")
	// 						: "",
	// 					lastName: respData.name?.lastName
	// 						? respData.name.lastName.replace(/.(?=.{2})/g, "*")
	// 						: "",
	// 					middleName: respData.name?.middleName
	// 						? respData.name.middleName.replace(/.(?=.{2})/g, "*")
	// 						: "",
	// 					suffix: respData.name?.suffix || "",
	// 					email: respData.email
	// 						? respData.email.replace(/(.{2}).*(?=@)/, "$1****")
	// 						: "",
	// 				}));
	// 			}
	// 			// } else {
	// 			// 	setIsModalVisible(true);
	// 			// }
	// 		} catch (error) {
	// 			console.error("Error fetching user details:", error);
	// 		}
	// 	}
	// };
    	const handleSubmit = () => {
             setIsSuccessModalVisible(true);

            // if (open){
            //     setIsSuccessModalVisible(true);
            //     closeModal();
            //     console.log("parent modal close:", closeModal());
            // }
		};

     const [otherType, setOtherType] = useState("");
	const [isOtherSelected, setIsOtherSelected] = useState(false);
    const handleOtherType = (event) => {
	const selectedType = event.target.value;
	setOtherType(selectedType);

	if (selectedType === "Others") {
		setIsOtherSelected(true);
	} else {
		setIsOtherSelected(false);
	}
     };


	const resetForm = () => {
		setFormData({
			mobileNumber: "",
			email: "",
			lastName: "",
			firstName: "",
			middleName: "",
			suffix: "",
		});
	};
	const closeSuccessModal = () => {
		setIsSuccessModalVisible(false);
        closeModal();
	};

	return (
		<>
			<Modal
				open={openModal}
				onCancel={closeModal}
				footer={null}
				className="custom-modal-searchprop"
                
			>
				{!isSuccessModalVisible && (
					<div className="modal-content-searchprop">
						<div className="toptitle">
							<h1>Looking for Your Dream Property? </h1>
							<span className="top-description">
								Let us help you find the perfect place to call home! Whether
								you're searching for a luxurious estate, commercial lot for your
								business, or industrial lot, our team is dedicated to matching
								you with the ideal property that suits your needs and
								preferences.
							</span>
						</div>

						<div className="why-choose-us">
							<h2>Why Choose Us?</h2>
							<ul>
								<li>
									Personalized Service: We take the time to understand your
									unique requirements and preferences.
								</li>
								<li>
									Extensive Listings: Access to a wide range of properties, from
									urban centers to serene suburbs.
								</li>
								<li>
									Expert Guidance: Benefit from our experience and knowledge of
									the local real estate market.
								</li>
								<li>
									Streamlined Process: We simplify the search process, saving
									you time and effort.
								</li>
							</ul>
						</div>

						<div className="how-it-works">
							<h2>How it Works?</h2>
							<div className="steps">
								<div className="step">
									<label>Step 1</label>
									<span>Send an Inquiry</span>
									<br />
									<p>
										{" "}
										Fill out the form below with details about your property
										needs.
									</p>
								</div>
								<div className="step">
									<label>Step 2</label>
									<span>Consultation</span>
									<br />
									<p>
										{" "}
										One of our property experts will contact you for a
										personalized consultation.
									</p>
								</div>
								<div className="step">
									<label>Step 3</label>
									<span>Property Matching</span>
									<br />
									<p>
										{" "}
										We’ll present you with a selection of properties that match
										your criteria.
									</p>
								</div>
								<div className="step">
									<label>Step 4</label>
									<span>Visit & Decide</span>
									<br />
									<p>
										{" "}
										Schedule visits to your favorite properties and decide which
										property you will acquire.
									</p>
								</div>
							</div>
						</div>

						<div className="form-section">
							<h3>Ready to Start Your Property Search?</h3>
							<p>
								Don’t hesitate to reach out! Our team is eager to assist you in
								finding the perfect property. Simply fill out the inquiry form,
								and we’ll take it from there.
							</p>

							<form className="property-search-form" onSubmit={handleSubmit}>
								<div className="form-row">
									<div className="form-column">
										<span>Mobile Number</span>
										<input
											type="text"
											name="mobileNumber"
											placeholder="Mobile Number"
											// value={formData.mobileNumber}
											// onChange={handleInputChange}
										/>
									</div>
									<div className="form-column">
										<span>Email</span>
										<input
											name="email"
											type="email"
											placeholder="Email Address"
											// value={formData.email}
											// onChange={handleInputChange}
											// disabled={!!userDetails}
										/>
									</div>
								</div>
								<div className="form-row">
									<div className="form-column">
										<span>Last Name</span>
										<input
											type="text"
											name="lastName"
											placeholder="Last Name"
											// value={formData.lastName}
											// onChange={handleInputChange}
											// disabled={!!userDetails}
										/>
									</div>
									<div className="form-column">
										<span>First Name</span>
										<input
											type="text"
											name="firstName"
											placeholder="First Name"
											// value={formData.firstName}
											// onChange={handleInputChange}
											// disabled={!!userDetails}
										/>
									</div>
									<div className="form-column">
										<span>Middle Name</span>
										<input
											type="text"
											name="middleName"
											placeholder="Middle Name"
											// value={formData.middleName}
											// onChange={handleInputChange}
											// disabled={!!userDetails}
										/>
									</div>
									<div className="form-column">
										<span>Suffix</span>
										<select
											name="suffix"
											// value={formData.suffix}
											// onChange={(value) =>
											// 	handleInputChange({ target: { name: "suffix", value } })
											// }
										>
											<option value="">Select Suffix</option>
											<option value="None">None</option>
											<option value="Single">Jr.</option>
											<option value="Married">Jr II.</option>
											<option value="Widowed">Sr.</option>
										</select>
									</div>
								</div>

								<div className="form-row">
									<div className="form-column">
										<span>Property Type</span>
										{!isOtherSelected ? (
											<select value={otherType} onChange={handleOtherType}>
												<option value="">Select Property Type</option>
												<option value="Commercial">Commercial</option>
												<option value="Resident">Resident</option>
												<option value="Industrial">Industrial</option>
												<option value="Others">Others</option>
											</select>
										) : (
											<input
												type="text"
												placeholder="Specify Other Property Type"
												value={otherType}
												onChange={(e) => setOtherType(e.target.value)}
											/>
										)}
									</div>
									<div className="form-column">
										<span>Property Details</span>
										<select>
											<option value="">Select Property Details</option>
											<option value="Condominium">Condominium</option>
											<option value="House & Lot">House & Lot</option>
											<option value="Townhouse">Townhouse</option>
										</select>
									</div>
									<div className="form-column">
										<span>Location Preference</span>
										<input type="text" placeholder="Enter Location" />
									</div>
									<div className="form-column">
										<span>Budget Range</span>
										<select>
											<option value="">Select Budget Range</option>
											<option value="500K - 1M">500K - 1M</option>
											<option value="1M - 3M">1M - 3M</option>
											<option value="3M - 8M">3M - 8M</option>
											<option value="10M - 15M">10M - 15M</option>
											<option value="20M - 30M">20M - 30M</option>
											<option value="40M - 50M">40M - 50M</option>
											<option value="50M and above">50M and above</option>
										</select>
									</div>
								</div>
								<div className="form-row">
									<div className="form-column">
										<span>Bedrooms</span>
										<input type="number" placeholder="Enter Number" />
									</div>
									<div className="form-column">
										<span>Bathrooms</span>
										<input type="number" placeholder="Enter Number" />
									</div>
									<div className="form-column">
										<span>Feature & Amenities</span>
										<input
											type="text"
											placeholder="Enter Feature & Amenities"
										/>
									</div>
								</div>
								<div className="form-row submit-row">
									<button type="submit">Submit Application</button>
								</div>
							</form>
						</div>
					</div>
				)}
			</Modal>

			<Modal
				open={isSuccessModalVisible}
				onCancel={closeSuccessModal}
				footer={null}
				className="success-modal-searchprop"
			>
				<div className="success-modal-content">
					<h2>Successfully Submitted!</h2>
					<p>
						Your application is yet to be reviewed. We will expedite the review
						process to minimize any inconvenience. Rest assured, we will keep
						you informed.
					</p>
				</div>
			</Modal>
		</>
	);
};

export default PropertySearchModal;
