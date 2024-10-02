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
import { GetPropertiesBySaleStatus } from "../api/GetAllPublicListings";
import AlertModal from "./modals/AlertModal";

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
	const [postedPropertyNo, setPostedPropertyNo] = useState(null);
	const [loadingModal, setShowLoadingModal] = useState(false);
	const [publiclisting, setPublicListing] = useState([]);
	const [showAlert, setShowAlert] = useState(true);
	const [showAlertModal, setShowAlertModal] = useState(false);
	const [showVendorModal, setShowVendorModal] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
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
		SellingType: "brokerage",
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
		ListingOwnerId: "",
		ListingOwnerName: "",
		IsModel: "no",
		FloorArea: "",
		LotArea: "",
		AccessType: "public",
		DiscountedPrice: "",
		Furnishing: "",
		Classification: "",
		PricePerSqm: "",
		Parking: "",
		RecordStatus: "pending",
		NoOfFloor: "",
		Country: "",
		ProvinceState: "",
		Zipcode: "",
		MapLocation: "",
		Photo: [],
		Features: [],
		AddedFeature: [],
		Approver1Status: "Pending",
		Approver2Status: "Pending",
		Approver3Status: "Pending",
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleError = (error) => {
		if (error.status >= 400 && error.status <= 500) {
			setShowAlert(true);
			setShowAlertModal({
				title: "Request Failed",
				text: error.data.message || "Something went wrong",
				subtitle: error.data.subtitle || "",
				subLink: true,
				isError: true,
			});
		} else {
			setShowAlert(true);
			setShowAlertModal({
				title: "Error",
				text: error.data.message || "An error occurred",
				subTitle: "",
				isError: true,
			});
		}
	};

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

			// setShowLoadingModal({
			// 	loading: true,
			// 	text: "Just a moment",
			// });

		if (vendorExists) {
				setShowVendorModal(false);
				// setIsSubmitting(true);
				console.log("Vendor Exist:", vendorExists.data.VendorId);
				await handleSubmit(vendorExists.data.VendorId);

				console.log("Vendor Exist:", vendorExists.data.VendorId);
			} else {
				setShowVendorModal(true);
			}
		} catch (error) {
			console.error("Error checking vendor existence:", error);
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
			const allAddFeaturePayloads = [];

			const combinedFeatures = [
				...new Map(
					[...propertyFields.Features, ...propertyFields.AddedFeature].map(
						(item) => [item.FeatureName, item]
					)
				).values(),
			];

			for (const feature of combinedFeatures) {
				const addAddedFeaturePayload = {
					PropertyNo: propertyNo,
					FeatureName: feature.FeatureName,
					Type: feature.Type,
				};

				if (!existingFeatures.includes(feature.FeatureName)) {
					const addFeaturePayload = {
						FeatureName: feature.FeatureName,
						Type: feature.Type,
					};

					allAddFeaturePayloads.push(addFeaturePayload);
					allAddedFeaturePayloads.push(addAddedFeaturePayload);
				} else {
					allAddedFeaturePayloads.push(addAddedFeaturePayload);
				}
			}

			await Promise.all(
				allAddFeaturePayloads.map(async (payload) => {
					try {
						await AddFeature(payload);
						console.log(
							`New feature added successfully: ${payload.FeatureName}`
						);
					} catch (error) {
						console.error(`Error adding new feature: ${error.message}`);
					}
				})
			);

			await Promise.all(
				allAddedFeaturePayloads.map(async (payload) => {
					try {
						await AddAddedFeature(payload);
						console.log(
							`Feature with PropertyNo added successfully: ${payload.FeatureName}`
						);
					} catch (error) {
						console.error(`Error adding feature to property: ${error.message}`);
					}
				})
			);

			console.log("Features processed and posted successfully.");
		} catch (error) {
			console.error("Error processing features:", error.message);
		}
	};


	const handleSubmit = async (VendorId = null) => {
		try {
			setIsSubmitting(true);
			
			// console.log("modal", showAlertModal);
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
					RecordStatus: "active",
					VendorType: "homeowner",
					AccessType: "public",
					OtherInfo: "Hey Joe",
					ListingOwnerId: "NA",
					ListingOwnerName: "NA",
				};
				console.log("Adding new vendor:", vendorPayload);

				await AddVendor(vendorPayload);
			}

			const propertyNo = await GetPropertyNo();

			const propertyPhotos = propertyFields.Photo.map((photo) => photo.file);

			const photosArray = propertyFields.Photo;

			const Vendornumber = accountDetails.mobileNumber;
			const existing = await GetVendorByNumber(Vendornumber);
			console.log("VENDOR INFO", existing);

			const imagePayload = new FormData();

			imagePayload.append("PropertyNo", propertyNo);
			imagePayload.append(
				"MainPhoto",
				photosArray.length > 0 ? photosArray[0].file : null
			);

			propertyPhotos.forEach((photo) => {
				imagePayload.append("Photo[]", photo);
				imagePayload.append("FileName[]", photo.name);
			});

			imagePayload.getAll("Photo");
			imagePayload.getAll("FileName");

			console.log("image:", imagePayload.getAll("Photo"));
			console.log("filename:", imagePayload.getAll("FileName"));

			const postFeatures = await handleFeatureChecking();

			const updatedPropertyFields = {
				...propertyFields,
				ListingOwnerId: generatedVendorId,
				ListingOwnerName: existing.VendorName,
				postFeatures,
				PropertyNo: propertyNo,
				VendorId: generatedVendorId,
				VendorName: existing.VendorName,
			};

			console.log("Final listing data:", updatedPropertyFields);

			const postData = await PostSellerListing(updatedPropertyFields);
			setPostedPropertyNo(updatedPropertyFields);
			console.log("this is the current post:", postedPropertyNo);
			console.log("Listing API Response:", updatedPropertyFields);
			console.log("propenumber:", updatedPropertyFields.PropertyNo);

			setPropertyFields((prevFields) => ({
				...prevFields,
				...postData,
			}));

			await savePropertyImages(imagePayload);
setIsSubmitting(false);
			setShowSuccessfulMsgModal(true);
			
		} catch (error) {

			if (error.status >= 400 && error.status <= 500){
				return(error);
			}else{
				return(error);
			}
				// console.error("Failed to submit listing:", error);
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

	const isFormComplete = Object.values(completedSteps).every(Boolean);

	const handlePreviewListing = (id) => {
		navigate(`/previewListing/?id=${id}`, { state: id });
	};
	const LoadingIcon = (
		<div className="spinner-icon">
			<svg viewBox="0 0 50 50" width="40" height="40">
				<circle
					cx="25"
					cy="25"
					r="20"
					fill="none"
					strokeWidth="4"
					stroke="var(--red)"
					strokeLinecap="round"
				>
					<animate
						attributeName="stroke-dasharray"
						values="0 100;100 100;100 0"
						dur="3s"
						repeatCount="indefinite"
					/>
				</circle>
			</svg>
		</div>
	);

	return (
		<>
			<div className="listing-ContentContainer">
					<ListingBanner />
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
										className="error-m"
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
											marginLeft: "10px",
										}}
										className="error-m"
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
										className="error-m"
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
										className="error-m"
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
										className="error-m"
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
								<button
									type="submit"
									onClick={handleVendorSubmit}
									disabled={!isFormComplete}
									style={{
										backgroundColor: isFormComplete ? "var(--red)" : "gray",
										cursor: isFormComplete ? "pointer" : "not-allowed",
									}}
								>
									Submit Application
								</button>
								{/* TIN Modal */}
								{showVendorModal && (
									<div
										className="vendor-modal-overlay"
										onClick={() => setShowVendorModal(false)}
									>
										<div
											className="vendor-modal-content"
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
										className="success-modal-overlay"
										onClick={() => setShowSuccessfulMsgModal(false)}
									>
										<div
											className="success-modal-content-body"
											onClick={(e) => e.stopPropagation()}
										>
											<h2 className="modal-success-header">
												Successfully Submitted!
											</h2>
											<div className="success-details">
												<p>
													Waiting for Approval. Your listing has been submitted
													and will undergo screening.
												</p>
												<button
													className="buttonkyc"
													onClick={() =>
														handlePreviewListing(postedPropertyNo.PropertyNo)
													}
												>
													Preview Listing
												</button>
											</div>
										</div>
									</div>
								)}

								{isSubmitting && (
									<div
										className="post-loading-modal"
										style={{
											position: "fixed",
											top: "0",
											left: "0",
											width: "100%",
											height: "100%",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											backgroundColor: "rgba(0, 0, 0, 0.5)",
											zIndex: "9999",
										}}
									>
										<div
											className="post-loading-spinner"
											style={{
												backgroundColor: "white",
												padding: "10px",
												borderRadius: "5px",
												fontSize: "18px",
												display: "flex",
												width: "auto",
												justifyContent: "center",
												alignItems: "center",
												flexDirection: "column",
												margin: "5px",
											}}
										>
											Creating...{LoadingIcon}
										</div>
									</div>
								)}
								{/* {showAlert && (
									<AlertModal
										title={showAlertModal.title}
										text={showAlertModal.text}
										subtitle={
											showAlertModal.subTitle ? showAlertModal.subTitle : ""
										}
										isError={showAlertModal.isError}
										className="alert-"
										onClose={() => setShowAlert(false)}
										overlayStyle={{
											position: "fixed",
											top: "0",
											left: "0",
											right: "0",
											bottom: "0",
											backgroundColor: "rgba(0, 0, 0, 0.5)",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
										}}
										contentStyle={{
											backgroundColor: "white",
											padding: "20px",
											borderRadius: "20px",
											width: "90%",
											maxWidth: "400px",
											position: "relative",
											textAlign: "center",
											margin: "10px",
										}}
									/>
								)} */}
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
