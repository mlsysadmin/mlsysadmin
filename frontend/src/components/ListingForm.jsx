import React, { useState, useEffect, useRef, useCallback } from "react";
import "../styles/listing-form.css";
import { useNavigate } from "react-router-dom";
import logo from "../asset/watermark.png";
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
import PreviewLoadingModal from "./modals/PreviewLoadingModal";
import { notification } from "antd";
import { useAuth } from '../Context/AuthContext';
import { CreateListingSkeleton } from "./Skeleton";

export const ListingForm = () => {
	const {
		isAuthenticated, userDetails, logout
	} = useAuth();

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
	// const [userDetails, setUserDetails] = useState(null);
	const [postedPropertyNo, setPostedPropertyNo] = useState(null);
	const [loadingModal, setShowLoadingModal] = useState(false);
	const [publiclisting, setPublicListing] = useState([]);
	const [showAlert, setShowAlert] = useState(true);
	const [showAlertModal, setShowAlertModal] = useState(false);
	const [showVendorModal, setShowVendorModal] = useState(false);
	const [addedVendorId, setAddedVendorId] = useState();
	const [addedVendorName, setAddedVendorName] = useState();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, isSubmitted] = useState(false);
	const [submitTINDisabled, setIsSubmitTINDisabled] = useState("");
	const [tin, setTin] = useState(null);
	const [api, contextHolder] = notification.useNotification();

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
		PropertyIdNo: "",
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
		Source: "Client",
	});

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		console.log("submitted na: ", submitted);
		if (submitted) {
			setPropertyFields({
				PropertyNo: "",
				VendorId: "",
				VendorName: "",
				City: "",
				Location: "",
				PropertyType: "",
				Price: "",
				UnitName: "",
				SaleType: "",
				BedRooms: "",
				BathRooms: "",
				Details: "",
				ListingOwnerId: "",
				ListingOwnerName: "",
				IsModel: "no",
				FloorArea: "",
				LotArea: "",
				DiscountedPrice: "",
				Furnishing: "",
				Classification: "",
				PricePerSqm: "",
				Parking: "",
				PropertyIdNo: "",
				NoOfFloor: "",
				Country: "",
				ProvinceState: "",
				Zipcode: "",
				MapLocation: "",
				Photo: [],
				Features: [],
				AddedFeature: [],
			});
		}
	}, [submitted]);

	useEffect(() => {
		window.scrollTo(0, 0);
		
	}, []);
	useEffect(() => {
		setTimeout(() => {
			if (userDetails && isAuthenticated) {
				setIsLoading(false);
			}
		}, 1500);
		
	}, []);

	const [tinError, serTinError] = useState("");
	const TinValidation = (inputTin) => {
		const isNumericTin = /^\d+$/.test(inputTin);
		if (!isNumericTin) {
			return "TIN must contain only numbers.";
		}
		if (inputTin.length !== 9) {
			return `TIN must be exactly 9 characters long.`;
		}
		return "";
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

			if (stepRefs.current[nextStep]) {
				if (!isFocused) {
					stepRefs.current[nextStep].scrollIntoView({ behavior: "smooth" });
				}
			}
		}
	};

	const handleVendorSubmit = async () => {
		setIsSubmitting(false);
		try {
			if (Object.keys(userDetails).length !== 0) {
				let number = userDetails.mobileNumber;

				try {
					const vendorExists = await GetVendorByNumber(number);
					console.log("vendorDetails", vendorExists.data);

					if (Object.keys(vendorExists.data).length !== 0) {
						setShowVendorModal(false);
						console.log("Vendor Exist:", vendorExists.data);
						// setIsSubmitting(true);
						await handleCreateProperty(
							vendorExists.data.VendorName,
							vendorExists.data.VendorId
						);
						isSubmitted(true);
					} else {
						const vendorName = `${userDetails?.name.firstName} ${userDetails?.name.lastName}`;
						const generatedVendotId = await GetVendorId();
						setAddedVendorId(generatedVendotId);
						setAddedVendorName(vendorName);
						setIsSubmitting(false);
						setShowVendorModal(true);
					}
				} catch (error) {
					console.error("Error checking vendor existence:", error);
					openNotificationWithIcon("error", "Submit Failed", "We're sorry, something went wrong. Please try again later.")

				}
			} else {
				console.error("user is not logged in");
				openNotificationWithIcon("error", "Submit Failed", "We're sorry, something went wrong. Please try again later.")
				navigate('/login');
			}
		} catch (error) {
			console.log("errr", error);
			openNotificationWithIcon("error", "Submit Failed", "We're sorry, something went wrong. Please try again later.")
		}
	};

	const handleCreateProperty = async (VendorName, VendorId) => {
		setShowVendorModal(false);
		setIsSubmitting(true);
		const propertyNo = await GetPropertyNo();

		const photosArray = propertyFields.Photo;

		const imagePayload = new FormData();

		imagePayload.append("PropertyNo", propertyNo);
		imagePayload.append(
			"MainPhoto",
			photosArray.length > 0 ? await addWatermark(photosArray[0].file) : null
		);

		for (let i = 1; i < photosArray.length; i++) {
			imagePayload.append("Photo[]", await addWatermark(photosArray[i].file));

			imagePayload.append("FileName[]", photosArray[i].file.name);
		}

		imagePayload.getAll("Photo");
		imagePayload.getAll("FileName");

		const postFeatures = await handleFeatureChecking();
		const updatedPropertyFields = {
			...propertyFields,
			ListingOwnerId: VendorId,
			ListingOwnerName: VendorName,
			postFeatures,
			PropertyNo: propertyNo,
			VendorId: VendorId,
			VendorName: VendorName,
		};

		const postData = await PostSellerListing(updatedPropertyFields);
		setPostedPropertyNo(updatedPropertyFields);
		setPropertyFields((prevFields) => ({
			...prevFields,
			...postData,
		}));
		await savePropertyImages(imagePayload);

		setIsSubmitting(false);
		setShowSuccessfulMsgModal(true);
	};
	const imagePathToFile = async (imagePath, fileName) => {
		try {
			const response = await fetch(imagePath);
			const blob = await response.blob();

			// Convert Blob to File
			const file = new File([blob], fileName, { type: blob.type });
			return file;
		} catch (error) {
			console.error("Error converting image path to file:", error);
			throw error;
		}
	};

	const addWatermark = async (imageFile) => {
		const imageFiles = await imagePathToFile(logo, "watermark.png");
		return new Promise((resolve, reject) => {
			const img = new Image();
			const watermarkImg = new Image();
			img.src = URL.createObjectURL(imageFile);
			img.onload = () => {
				watermarkImg.src = URL.createObjectURL(imageFiles);
				watermarkImg.style.opacity = 0.1;
				watermarkImg.onload = () => {
					const canvas = document.createElement("canvas");
					const ctx = canvas.getContext("2d");

					canvas.width = img.width;
					canvas.height = img.height;

					ctx.drawImage(img, 0, 0);
					const scale = 0.3;
					const watermarkWidth = img.width * scale;
					const watermarkHeight =
						(watermarkImg.height / watermarkImg.width) * watermarkWidth;

					const watermarkX = (img.width - watermarkWidth) / 2;
					const watermarkY = (img.height - watermarkHeight) / 2;

					ctx.drawImage(
						watermarkImg,
						watermarkX,
						watermarkY,
						watermarkWidth,
						watermarkHeight
					);

					canvas.toBlob((blob) => {
						if (blob) {
							const watermarkedFile = new File([blob], imageFile.name, {
								type: imageFile.type,
							});
							console.log("watermarkedFile: ", watermarkedFile);
							resolve(watermarkedFile);
						} else {
							reject(new Error("Could not create watermark"));
						}
					}, imageFile.type);
				};
				watermarkImg.onerror = (error) => {
					reject(
						new Error(
							"Error loading watermark image: " + error.message || error
						)
					);
				};
				console.log(" I AM LOG!");
			};

			img.onerror = (error) => {
				console.error("Error loading original image: ", error);
				reject(
					new Error("Error loading original image: " + error.message || error)
				);
			};
		});
	};

	const handleFeatureChecking = async () => {
		try {
			const propertyNo = await GetPropertyNo();
			const featureResponse = await GetFeature();
			const existingFeatures = featureResponse.map(
				(feature) => feature.FeatureName
			);

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
		} catch (error) {
			console.error("Error processing features:", error.message);
		}
	};
	const handleInputTINChange = (e) => {
		const inputTin = e.target.value;
		setTin(inputTin);
		const validationMessage = TinValidation(inputTin);
		serTinError(validationMessage);
		setIsSubmitTINDisabled(validationMessage !== "");
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);
		try {
			const falsyValue = [undefined, null, ""];
			if (falsyValue.includes(tin)) {
				alert("Tin required!");
			} else {
				const vendorPayload = {
					VendorId: addedVendorId,
					VendorName: addedVendorName,
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
					ComRate: "10",
				};
				console.log("Adding new vendor:", vendorPayload);

				const addNewVendor = await AddVendor(vendorPayload);
				if (addNewVendor) {
					handleCreateProperty(addedVendorName, addedVendorId);
				} else {
					console.log(addNewVendor);
				}
			}

			// console.log("modal", showAlertModal);
			// const generatedVendorId = VendorId;

			// const vendorName = `${userDetails?.name.firstName} ${userDetails?.name.lastName}`;

			// if (!VendorId) {
			// 	const vendorPayload = {
			// 		VendorId: generatedVendorId,
			// 		VendorName: vendorName,
			// 		Address: userDetails.addresses.current.otherAddress,
			// 		City: userDetails.addresses.current.addressL2Name,
			// 		ContactNo: userDetails.cellphoneNumber,
			// 		TIN: tin,
			// 		Email: userDetails.email,
			// 		ContactPerson: "",
			// 		RecordStatus: "active",
			// 		VendorType: "homeowner",
			// 		AccessType: "public",
			// 		OtherInfo: "Hey Joe",
			// 		ListingOwnerId: "NA",
			// 		ListingOwnerName: "NA",
			// 	};
			// 	console.log("Adding new vendor:", vendorPayload);

			// 	await AddVendor(vendorPayload);
			// }
		} catch (error) {
			if (error.status >= 400 && error.status <= 500) {
				return error;
			} else {
				return error;
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

	const openNotificationWithIcon = (type, message, description) => {
		api[type]({
			message: message,
			description: description,
			placement: "bottomRight",
			duration: type == "error" ? 4 : 3,
		});
	};
	const el = document.querySelector(".listing-steps");

	useEffect(() => {
		console.log(el);

		if (el) {
			const stickyThreshold = parseInt(window.getComputedStyle(el).top) || 0; // Sticky position from CSS

			window.addEventListener("scroll", () => {
				const currentTop = el.getBoundingClientRect().top;
				el.classList.toggle("is-sticky", currentTop <= stickyThreshold);
			});
		} else {
			console.error("Element with class 'listing-steps' not found.");
		}
	}, [el])

	return (
		<>
			{
				contextHolder
			}
			{isLoading ? (
				// <PreviewLoadingModal />
				<>
					<CreateListingSkeleton />
				</>
			) :
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
										isSubmitted={submitted}
									/>
									{/* {errors[0] && currentStep === 0 && (
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
								)} */}
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
										isSubmitted={submitted}
										openNotificationWithIcon={openNotificationWithIcon}
									/>
									{/* {errors[1] && currentStep === 1 && (
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
								)} */}
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
										isSubmitted={submitted}
									/>
									{/* {errors[2] && currentStep === 2 && (
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
								)} */}
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
										isSubmitted={submitted}
									/>
									{/* {errors[3] && currentStep === 3 && (
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
								)} */}
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
										isSubmitted={submitted}
									/>
									{/* {errors[4] && currentStep === 4 && (
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
								)} */}
								</div>
								<div
									ref={(el) => (stepRefs.current[5] = el)}
									style={{
										pointerEvents: completedSteps[4] ? "auto" : "none",
										cursor: completedSteps[4] ? "auto" : "not-allowed",
									}}
								>
									<FeaturedComponents
										onComplete={(completed) => handleStepComplete(5, true)}
										setPropertyFields={setPropertyDataFields}
										selectedPropertyTab={propertyFields.PropertyType}
										isSubmitted={submitted}
									/>
									{/* {errors[5] && currentStep === 5 && (
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
								)} */}
								</div>
								<p style={{ fontWeight: "500" }} className="aggreement">
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
														value={tin}
														onChange={handleInputTINChange}
														placeholder="Enter your 9 digit TIN"
														style={{ padding: "10px", width: "100%" }}
													/>
													{tinError && (
														<p
															style={{
																color: "var(--red)",
																marginTop: "5px",
																fontSize: "14px",
															}}
														>
															{tinError}
														</p>
													)}
												</div>

												<button
													disabled={submitTINDisabled}
													onClick={handleSubmit}
													style={{
														padding: "10px 50px",
														fontSize: "16px",
														backgroundColor: submitTINDisabled
															? "gray"
															: "var(--red)",
														cursor: submitTINDisabled ? "not-allowed" : "pointer",
														marginRight: "0px",
													}}
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

									{isSubmitting && <PreviewLoadingModal />}
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
			}
		</>
	);
};
