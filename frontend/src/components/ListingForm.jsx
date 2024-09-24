import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
	PostSellerListing,
	AddVendor,
	GetVendorId,
	GetPropertyNo,
	AddFeature,
	GetVendorByNumber,
	savePropertyImages,
	GetFeature,
	AddAddedFeature,
} from "../api/PostListings";
import PropertyDetailsComponent from "../components/PropertyDetailsComponent";
import UnitDetailsComponent from "../components/UnitDetailsComponent";
import LocationDetailsComponent from "../components/LocationDetailsComponent";
import DescriptionDetailsComponent from "../components/DecriptionDetailsComponent";
import UploadPhotosComponent from "../components/UploadPhotosComponent";
import FeaturedComponents from "../components/FeatureListComponents";
import ListingBanner from "../components/layout/ListingBanner";
import ListingSteps from "../components/layout/ListingSteps";
// import Footer from "../components/custom/Custom.Mlfooter";
import CustomMlFooter from "./custom/Custom.Mlfooter";
import FooterComponent from "./layout/FooterComponent";
import { getCookieData } from "../utils/CookieChecker";
import { searchKyc } from "../api/Public/User.api";

export const ListingForm = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const [completedSteps, setCompletedSteps] = useState({});
	const [isFocused, setIsFocused] = useState(false);
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
	const [userDetails, setUserDetails] = useState(null);

	const [vendorType, setVendorType] = useState("");
	const [showVendorModal, setShowVendorModal] = useState(false);
	const [tin, setTin] = useState("");

	const accountDetails = getCookieData();

	const fetchUserDetails = async () => {
		try {
			const response = await searchKyc(accountDetails.mobileNumber);
			const respData = response.data.data;
			console.log("API Response:", respData);
			setUserDetails(respData);
		} catch (error) {
			console.error("Error fetching user details:", error);
		}
	};

	const [errors, setErrors] = useState({
		0: false, 
		1: false,
		2: false,
		3: false,
		4: false,
		5: false,
	});


	const [propertyFields, setPropertyFields] = useState({
		PropertyNo: "",
		VendorId: "",
		VendorName: "",
		SellingType: "project selling",
		ProjectId: "NA",
		ProjectName: "NA",
		City: "",
		Location: "",
		PropertyType: "",
		ComRate: "10",
		Price: "",
		UnitName: "",
		SaleType: "",
		SaleStatus: "unsold",
		BedRooms: "",
		BathRooms: "",
		IsFeatured: "no",
		VideoLink: null,
		Details: "",
		ListingOwnerId: "NA",
		ListingOwnerName: "NA",
		IsModel: "no",
		FloorArea: "",
		LotArea: "",
		AccessType: "public",
		DiscountedPrice: "",
		Furnishing: "",
		Classification: "",
		PricePerSqm: "",
		Parking: "",
		NoOfFloor: "",
		Country: "",
		ProvinceState: "",
		Zipcode: "",
		MapLocation: "",
		Photo: [],
		Features: [],
		AddedFeature: [],
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);


const handleStepComplete = (stepIndex, isComplete) => {
	setCompletedSteps((prev) => {
		if (prev[stepIndex] === isComplete) {
			return prev;
		}
		return {
			...prev,
			[stepIndex]: isComplete,
		};
	});
	setErrors((prev) => ({
		...prev,
		[stepIndex]: !isComplete,
	}));

	if (isComplete && stepIndex === currentStep) {
		const nextStep = currentStep + 1;
		setCurrentStep(nextStep);
		console.log("Current Step:", nextStep);

		// if (stepIndex === 5) {
		// 	if (!isFocused) {
		// 		window.scrollTo({ top: 0, behavior: "smooth" });
		// 	}

	 if (stepRefs.current[nextStep]) {
			if (!isFocused) {
				stepRefs.current[nextStep].scrollIntoView({ behavior: "smooth" });
			}
		}
	}
};



	const handleSellingPriceClick = (furnishing) => {
		setSelectedSellingPrice(furnishing);
	};

	const handleVendorSubmit = async () => {
		const number = accountDetails.mobileNumber;

		try {
			const vendorExists = await GetVendorByNumber(number);
			console.log("vendorDetails", vendorExists);

			if (vendorExists) {
				setShowVendorModal(false);
				await handleSubmit(vendorExists.VendorId);
				setShowSuccessfulMsgModal(true);
				console.log("Vendor Exist:", vendorExists.VendorId);
			} else {
				setShowVendorModal(true);
			}
		} catch (error) {
			console.error("Error checking vendor existence:", error.message);
		}
	};

	const handleFeatureChecking = async () => {
		try {
			const propertyNo = await GetPropertyNo();

			const featureResponse = await GetFeature();
			const existingFeatures = featureResponse.map(
				(feature) => feature.FeatureName
			);

			console.log("Features before submission:", existingFeatures);

			const allAddedFeaturePayloads = [];
			const AllAddFeaturePayload = [];

			const combinedFeatures = [
				...propertyFields.Features,
				...propertyFields.AddedFeature,
			];


			for (const FeatureName of combinedFeatures) {
				if (featureResponse.FeatureName === combinedFeatures.FeatureName) {
					const addAddedFeaturePayload = {
						PropertyNo: propertyNo,
						FeatureName: FeatureName.FeatureName,
						Type: FeatureName.Type,
					};
					allAddedFeaturePayloads.push(addAddedFeaturePayload);

					console.log("existing features:", allAddedFeaturePayloads);

					allAddedFeaturePayloads.forEach(async (addadddedFeaturePayload) => {
						try {
							await AddAddedFeature(addadddedFeaturePayload);
							console.log(
								`Feature with prop number successfully: ${addadddedFeaturePayload.FeatureName}`
							);
						} catch (error) {
							console.error(`Error adding feature: ${error.message}`);
						}
					});
					allAddedFeaturePayloads.push(addAddedFeaturePayload);
					// await AddAddedFeature(allAddedFeaturePayloads);
				} else {
					
					const addFeaturePayload = {
						FeatureName: FeatureName.FeatureName,
						Type: FeatureName.Type,
					};

					// console.log("added", addAddedFeaturePayload);

					AllAddFeaturePayload.push(addFeaturePayload);

					AllAddFeaturePayload.forEach(async (featurePayload) => {
						try {
							await AddFeature(featurePayload);
							console.log(
								`Feature added successfully: ${featurePayload.FeatureName}`
							);
						} catch (error) {
							console.error(`Error adding feature: ${error.message}`);
						}
					});

					allAddedFeaturePayloads.forEach(async (addadddedFeaturePayload) => {
						try {
							await AddAddedFeature(addadddedFeaturePayload);
							console.log(
								`Feature with prop number successfully: ${addadddedFeaturePayload.FeatureName}`
							);
						} catch (error) {
							console.error(`Error adding feature: ${error.message}`);
						}
					});

					// await AddFeature(AllAddFeaturePayload);
					// await AddAddedFeature(allAddedFeaturePayloads);
				}
			}
			console.log("All feature payloads:", allAddedFeaturePayloads);
			console.log("All feature payloads:", AllAddFeaturePayload);

			console.log("Features processed and posted successfully.");
			return { allAddedFeaturePayloads, AllAddFeaturePayload };
		} catch (error) {
			console.error("Error processing features:", error.message);
		}
	};

	const handleSubmit = async (VendorId = null) => {
		try {
			const generatedVendorId = VendorId || (await GetVendorId());

			const vendorName = `${userDetails?.name.firstName} ${userDetails?.name.lastName}`;

			if (!VendorId) {
				const vendorPayload = {
					VendorId: generatedVendorId,
					VendorName: vendorName,
					Address: userDetails.addresses.current.otherAddress,
					City: userDetails.addresses.current.addressL2Name,
					ContactNo: userDetails.cellphoneNumber,
					TIN: tin,
					Email: userDetails.email,
					ContactPerson: "",
					RecordStatus: "",
					VendorType: vendorType,
					AccessType: "public",
					OtherInfo: "Hey Joe",
					ListingOwnerId: "NA",
					ListingOwnerName: "NA",
				};
				console.log("Adding new vendor:", vendorPayload);

				await AddVendor(vendorPayload);
			}

			const propertyNo = await GetPropertyNo();
			
			const propertyPhotos = propertyFields.Photo.map((photo)=> photo.file);

			const photosArray = propertyFields.Photo;
			// const imagesPayload = {
			// 	PropertyNo: propertyNo,
			// 	MainPhoto: photosArray.length > 0 ? photosArray[0].file : null,
			// 	Photo: propertyPhotos,
			// };


			const imagePayload = new FormData() 

			imagePayload.append("PropertyNo", propertyNo);
			imagePayload.append("MainPhoto", photosArray.length> 0 ? photosArray[0].file:null);
			imagePayload.append("Photo", propertyPhotos[0]);
			imagePayload.append("Photo", propertyPhotos[1]);
			// imagePayload.append("Photo", propertyPhotos.file[0]);

			console.log("Photos payload:", imagePayload.getAll("MainPhoto"));
			console.log("Photos payload:", imagePayload.getAll("Photo"));
			

			
			const postFeatures = await handleFeatureChecking();

			const updatedPropertyFields = {
				...propertyFields,


				postFeatures,
				PropertyNo: propertyNo,
				VendorId: generatedVendorId,
				VendorName: vendorName,
			};

			console.log("Final listing data:", updatedPropertyFields);

			const postData = await PostSellerListing(updatedPropertyFields);
			console.log("Listing API Response:", postData);

			setPropertyFields((prevFields) => ({
				...prevFields,
				...postData,
			}));

			await savePropertyImages(imagePayload);

		} catch (error) {
			console.error("Failed to submit listing:", error.message);
		}
	};

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
							<div
								ref={(el) => (stepRefs.current[0] = el)}
								style={{
									pointerEvents:
										completedSteps[0] || currentStep === 0 ? "auto" : "none",
									cursor:
										completedSteps[0] || currentStep === 0
											? "auto"
											: "not-allowed",
								}}
							>
								<PropertyDetailsComponent
									onComplete={(completed) => handleStepComplete(0, completed)}
									setPropertyFields={setPropertyDataFields}
								/>
								{errors[0] && currentStep === 0 && (
									<div
										style={{
											color: "red",
											display: "flex",
											justifyContent: "left",
											marginBottom: "10px",
										}}
									>
										Please fill in the missing values.
									</div>
								)}
							</div>
							<div
								ref={(el) => (stepRefs.current[1] = el)}
								style={{
									pointerEvents: completedSteps[0] ? "auto" : "none",
									cursor: completedSteps[0] ? "auto" : "not-allowed",
								}}
							>
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
									selectedPropertyTab={propertyFields.PropertyType}
								/>
								{errors[1] && currentStep === 1 && (
									<div
										style={{
											color: "red",
											display: "flex",
											justifyContent: "left",
											marginBottom: "10px",
										}}
									>
										Please fill in the missing values.
									</div>
								)}
							</div>
							<div
								ref={(el) => (stepRefs.current[2] = el)}
								style={{
									pointerEvents: completedSteps[1] ? "auto" : "none",
									cursor: completedSteps[1] ? "auto" : "not-allowed",
								}}
							>
								<LocationDetailsComponent
									onComplete={(completed) => handleStepComplete(2, completed)}
									setPropertyFields={setPropertyDataFields}
								/>
								{errors[2] && currentStep === 2 && (
									<div
										style={{
											color: "red",
											display: "flex",
											justifyContent: "left",
											marginBottom: "10px",
										}}
									>
										Please fill in the missing values.
									</div>
								)}
							</div>
							<div
								ref={(el) => (stepRefs.current[3] = el)}
								style={{
									pointerEvents: completedSteps[2] ? "auto" : "none",
									cursor: completedSteps[2] ? "auto" : "not-allowed",
								}}
							>
								<DescriptionDetailsComponent
									onComplete={(completed) => handleStepComplete(3, completed)}
									setPropertyFields={setPropertyDataFields}
									setIsFocused={setIsFocused}
								/>
								{errors[3] && currentStep === 3 && (
									<div
										style={{
											color: "red",
											display: "flex",
											justifyContent: "left",
											marginBottom: "10px",
										}}
									>
										Please fill in the missing values.
									</div>
								)}
							</div>
							<div
								ref={(el) => (stepRefs.current[4] = el)}
								style={{
									pointerEvents: completedSteps[3] ? "auto" : "none",
									cursor: completedSteps[3] ? "auto" : "not-allowed",
								}}
							>
								<UploadPhotosComponent
									onComplete={(completed) => handleStepComplete(4, completed)}
									setPropertyFields={setPropertyDataFields}
								/>
								{errors[4] && currentStep === 4 && (
									<div
										style={{
											color: "red",
											display: "flex",
											justifyContent: "left",
											marginBottom: "10px",
										}}
									>
										Please fill in the missing values.
									</div>
								)}
							</div>
							<div
								ref={(el) => (stepRefs.current[5] = el)}
								style={{
									pointerEvents: completedSteps[4] ? "auto" : "none",
									cursor: completedSteps[4] ? "auto" : "not-allowed",
								}}
							>
								<FeaturedComponents
									onComplete={(completed) => handleStepComplete(5, completed)}
									setPropertyFields={setPropertyDataFields}
								/>
								{errors[5] && currentStep === 5 && (
									<div
										style={{
											color: "red",
											display: "flex",
											justifyContent: "left",
											marginBottom: "10px",
										}}
									>
										Please fill in the missing values.
									</div>
								)}
							</div>
							<p style={{ fontWeight: "500" }}>
								By proceeding, I agree and review that all information are
								correct.
							</p>
							<div className="buttonSubmit">
								<button type="submit" onClick={handleVendorSubmit}>
									Submit Application
								</button>
								{/* TIN Modal */}
								{showVendorModal && (
									<div
										className="modal-overlay"
										onClick={() => setShowVendorModal(false)}
									>
										<div
											className="modal-content"
											onClick={(e) => e.stopPropagation()}
											style={{
												display: "flex",
												flexDirection: "column",
												alignItems: "center",
											}}
										>
											<h2>Enter TIN</h2>
											<div
												className="tin-input-group"
												style={{
													display: "flex",
													flexDirection: "column",
													justifyContent: "center",
													alignItems: "center",
													padding: "10px",
													width: "250px",
												}}
											>
												<label htmlFor="tin">
													Tax Identification Number (TIN):
												</label>
												<input
													type="text"
													id="tin"
													value={tin} // Replace this with the state variable you use to store the TIN
													onChange={(e) => setTin(e.target.value)} // Replace setTin with your setter for TIN
													placeholder="Enter TIN"
													style={{ padding: "10px", width: "100%" }}
												/>
											</div>

											<button
												onClick={handleSubmit}
												style={{ padding: "10px 50px", fontSize: "16px" }}
											>
												Submit
											</button>
										</div>
									</div>
								)}

								{/* Success Modal */}
								{showSuccessfulMsgModal && (
									<div
										className="modal-overlay"
										onClick={() => setShowSuccessfulMsgModal(false)}
									>
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
			<CustomMlFooter />
			<FooterComponent />
		</>
	);
};
