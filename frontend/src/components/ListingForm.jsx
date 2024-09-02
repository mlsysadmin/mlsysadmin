import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PostSellerListing from "../api/PostListings";
import PropertyDetailsComponent from "../components/PropertyDetailsComponent";
import UnitDetailsComponent from "../components/UnitDetailsComponent";
import LocationDetailsComponent from "../components/LocationDetailsComponent";
import DescriptionDetailsComponent from "../components/DecriptionDetailsComponent";
import UploadPhotosComponent from "../components/UploadPhotosComponent";
import FeaturedComponents from "../components/FeatureListComponents";
import ListingBanner from "../components/layout/ListingBanner";
import ListingSteps from "../components/layout/ListingSteps";
import Footer from "../components/custom/Custom.Mlfooter";

export const ListingForm = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const [completedSteps, setCompletedSteps] = useState({});
	const stepRefs = useRef([]);
	const navigate = useNavigate();
	const [selectedSellingPrice, setSelectedSellingPrice] = useState("");
	const [priceInputError, setPriceInputError] = useState("");
	const [floorAreaInputError, setFloorAreaInputError] = useState("");
	const [pricePerSqmInputError, setPricePerSqmInputError] = useState("");
	const [discPriceInputError, setDiscPriceInputError] = useState("");
	const [lotAreaInputError, setLotAreaInputError] = useState("");
	const [propIdInputError, setPropIdInputError] = useState("");
	const [showSuccessfulMsgModal, setShowSuccessfulMsgModal] = useState(false);

	const [propertyFields, setPropertyFields] = useState({
		listing_id: "",
		property_id: "",
		seller: "",
		title: "",
		description: "",
		listing_status: "PENDING",
		current_level: "",
		level: "",
		property_type: {
			type: "",
			subtype: "",
		},
		listing_type_id: "",
		unit_details: {
			price: "",
			discounted_price: "",
			price_per_sqm: "",
			furnishing: "",
			classification: "",
			no_of_beds: "",
			no_of_bathrooms: "",
			no_of_floors: "",
			parking: "",
			floor_area: "",
			lot_area: "",
		},
		location: {
			subdivision: "",
			city: "",
			province: "",
			other: "",
			zipcode: "",
			map_location: "",
		},
		amenities: {
			indoor_features: [],
			outdoor_features: [],
			custom_amenities: [],
			custom_inclusion: [],
		},
		photos: {
			photo: "",
			upload_date: "",
		},
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleStepComplete = (stepIndex, isComplete) => {
		setCompletedSteps((prev) => ({
			...prev,
			[stepIndex]: isComplete,
		}));

		if (isComplete && stepIndex === currentStep) {
			const nextStep = currentStep + 1;
			setCurrentStep(nextStep);
			console.log("Current Step:", nextStep);
			if (stepIndex === 5) {
				window.scrollTo({ top: 0, behavior: "smooth" });
			} else if (stepRefs.current[nextStep]) {
				stepRefs.current[nextStep].scrollIntoView({ behavior: "smooth" });
			}
		}
	};

	const handleSellingPriceClick = (furnishing) => {
		setSelectedSellingPrice(furnishing);
	};

	const handleSubmit = async () => {
		try {
			const postdata = await PostSellerListing(propertyFields);

			console.log("API Response:", postdata);

<<<<<<< HEAD
			setPropertyFields(postdata);
			setShowSuccessfulMsgModal(true);
		} catch (error) {
			console.error(
				"Failed to submit listing:",
				error.response?.data || error.message
			);
		}
	};
=======
  const handlePreviewListing = () => {
    navigate("/previewListing/:new_id");
  };
>>>>>>> 3133f26c28dc9d0f327563410c9e0863eca18c4d

	const setPropertyDataFields = (updatedFields) => {
		setPropertyFields((prevFields) => ({
			...prevFields,
			...updatedFields,
		}));
	};

	const handleModalClose = () => {
		setShowSuccessfulMsgModal(false);
	};

	const handlePreviewListing = (id) => {
		navigate(`/previewListing/${id}`, { state: id });
	};

	return (
		<>
			<div className="listing-ContentContainer">
				<div>
					<ListingBanner />
				</div>
				<div className="listing-application">
					<div className="listing-steps">
						<ListingSteps
							current={currentStep}
							setCurrent={setCurrentStep}
							completedSteps={completedSteps}
						/>
					</div>
					<div className="listing-form">
						<div className="listing-form-application">
							<div ref={(el) => (stepRefs.current[0] = el)}>
								<PropertyDetailsComponent
									onComplete={(completed) => handleStepComplete(0, completed)}
									setPropertyFields={setPropertyDataFields}
								/>
							</div>
							<div ref={(el) => (stepRefs.current[1] = el)}>
								<UnitDetailsComponent
									onComplete={(completed) => handleStepComplete(1, completed)}
									priceInputError={priceInputError}
									setPriceInputError={setPriceInputError}
									selectedSellingPrice={selectedSellingPrice}
									handleSellingPriceClick={handleSellingPriceClick}
									floorAreaInputError={floorAreaInputError}
									setFloorAreaInputError={setFloorAreaInputError}
									pricePerSqmInputError={pricePerSqmInputError}
									setPricePerSqmInputError={setPricePerSqmInputError}
									discPriceInputError={discPriceInputError}
									setDiscPriceInputError={setDiscPriceInputError}
									lotAreaInputError={lotAreaInputError}
									setLotAreaInputError={setLotAreaInputError}
									propIdInputError={propIdInputError}
									setPropIdInputError={setPropIdInputError}
									setPropertyFields={setPropertyDataFields}
								/>
							</div>
							<div ref={(el) => (stepRefs.current[2] = el)}>
								<LocationDetailsComponent
									onComplete={(completed) => handleStepComplete(2, completed)}
									setPropertyFields={setPropertyDataFields}
								/>
							</div>
							<div ref={(el) => (stepRefs.current[3] = el)}>
								<DescriptionDetailsComponent
									onComplete={(completed) => handleStepComplete(3, completed)}
									setPropertyFields={setPropertyDataFields}
								/>
							</div>
							<div ref={(el) => (stepRefs.current[4] = el)}>
								<UploadPhotosComponent
									onComplete={(completed) => handleStepComplete(4, completed)}
									setPropertyFields={setPropertyDataFields}
								/>
							</div>
							<div ref={(el) => (stepRefs.current[5] = el)}>
								<FeaturedComponents
									onComplete={(completed) => handleStepComplete(5, completed)}
									setPropertyFields={setPropertyDataFields}
								/>
							</div>
							<p style={{ fontWeight: "500" }}>
								By proceeding, I agree and review that all information are
								correct.
							</p>
							<div className="buttonSubmit">
								<button type="submit" onClick={handleSubmit}>
									Submit Application
								</button>
								{showSuccessfulMsgModal && (
									<div className="modal-overlay" onClick={handleModalClose}>
										<div
											className="modal-content"
											onClick={(e) => e.stopPropagation()}
										>
											<h2 className="modalsuccess-header">
												Successfully Submitted!
											</h2>
											<div className="success-details">
												<p>
													Waiting for Approval. Your listing has been submitted
													and will undergo screening.
												</p>
												<button
													className="buttonkyc"
													onClick={handlePreviewListing}
												>
													Preview Listing
												</button>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};