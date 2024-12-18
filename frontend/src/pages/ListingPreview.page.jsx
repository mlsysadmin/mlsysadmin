import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImagePreviewComponent from "../components/ImagePreviewComponent";
import "../styles/listingPreview.css";
import "../styles/propertyHighlights.css";

// Icons
import RedCamera from "../assets/icons/previewlisting/redcamera.png";
import {
	HeartFilled,
	HeartOutlined,
	CalculatorOutlined,
	MessageOutlined,
	AppstoreOutlined,
} from "@ant-design/icons";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import ShowerOutlinedIcon from "@mui/icons-material/ShowerOutlined";
import ShortcutOutlinedIcon from "@mui/icons-material/ShortcutOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import PhpOutlinedIcon from "@mui/icons-material/PhpOutlined";
import {
	Button,
	FloatButton,
	Input,
	Modal,
	notification,
	Table,
	Tooltip,
} from "antd";

import {
	GetPublicListingByID,
	GetUnitPhotos,
} from "../api/GetAllPublicListings";
import TextArea from "antd/es/input/TextArea";
import MapComponent from "../components/mapComponent";
import MorePropertiesComponent from "../components/MorePropertiesComponent";
import {
	CapitalizeEachWord,
	CapitalizeString,
} from "../utils/StringFunctions.utils";
import { GetAllFeaturesByPropertyNo } from "../api/GetAllAmenities";
import PreviewLoadingModal from "../components/modals/PreviewLoadingModal";
import { FormatLocation } from "../utils/LocationDateFormatter";
import ViewPhotoGallery from "../components/ViewPhotoGalleryComponent";
import { CustomMlFooter, FloatBtnGroup, FooterComponent } from "../components";
import PropertyHighLightsTableComponent from "../components/PropertyHighLightsTableComponent";
import { SendEmailInquiry } from "../api/Public/Email.api";
import CustomTag from "../components/custom/tags/Tags.custom";
import { AddSavedProperty, DeleteSavedProperty } from "../api/PostListings";
import { getCookieData } from "../utils/CookieChecker";
import { useAuth } from "../Context/AuthContext";
import LoginMessageModal from "../components/modals/LoginMessageModal";
import SemiRoundBtn from "../components/custom/buttons/SemiRoundBtn.custom";

const ListingPreview = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [oneListing, setOneListing] = useState(null);
	const [tooltipMessage, setTooltipMessage] = useState("Add to favorite");
	const [savedPropertyId, setSavedPropertyId] = useState([]);
	const [features, setFeatures] = useState([]);
	const [amenities, setAmenities] = useState([]);
	const [includes, setIncludes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [unitPhotos, setUnitPhotos] = useState([]);
	const [galleryLength, setGalleryLength] = useState(0);
	const [open, setOpen] = React.useState(false);
	const [btnLoading, setBtnLoading] = useState(false);
	const [checked, setIsChecked] = useState(false);
	const [likes, setLikes] = useState([]);
	const [showTooltip, setShowTooltip] = useState(false);
	const [aboutFeatures, setAboutFeatures] = useState([]);
	const [api, contextHolder] = notification.useNotification();
	const [showLoginMessage, setShowLoginMessage] = useState(false);
	const [contact, setContact] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
		listingTitle: oneListing?.UnitName,
		propertyNo: oneListing?.PropertyNo,
	});
	const [propertyDetails, setPropertyDetails] = useState([]);
	const { userDetails } = useAuth();

	const handleShowLoginModal = () => {
		setShowLoginMessage(true);
	};
	useEffect(() => {
		getlistingByID();

		if (oneListing) {
			FilterFeature(oneListing.PropertyType);
		}
	}, []);

	useEffect(() => {
		if (oneListing) {
			FilterFeature(oneListing.PropertyType);
			setContact((prev) => {
				return {
					...prev,
					listingTitle: oneListing.UnitName,
					propertyNo: oneListing.PropertyNo,
				};
			});

			const groupedData = [
				{ name: "heading--col", value: "Property Type" },
				{ name: "heading--col", value: "Listing Type" },
				{ name: "heading--col", value: "Furnishing" },
				{ name: "heading--col", value: "Bedroom" },
				{ name: "heading--col", value: "Bathroom" },
				{
					name: "value--col",
					value: CapitalizeString(oneListing.PropertyType),
				},
				{
					name: "value--col",
					value: `For ${CapitalizeString(oneListing.SaleType)}`,
				},
				{ name: "value--col", value: oneListing.Furnishing },
				{ name: "value--col", value: oneListing.BedRooms },
				{ name: "value--col", value: oneListing.BathRooms },
				{ name: "heading--col", value: "Floor Area" },
				{ name: "heading--col", value: "Lot Area" },
				{ name: "heading--col", value: "Price per SqM" },
				{ name: "heading--col", value: "No. of Floors" },
				{ name: "heading--col", value: "Car Parking" },
				{ name: "value--col", value: oneListing.FloorArea },
				{ name: "value--col", value: oneListing.LotArea },
				{ name: "value--col", value: `Php ${oneListing.PricePerSqm}` },
				{ name: "value--col", value: oneListing.NoOfFloor },
				{ name: "value--col", value: oneListing.Parking },
			];

			console.log("price per sqm:", oneListing.PricePerSqm);

			const rowGroup = [];

			for (let i = 0; i < groupedData.length; i += 5) {
				rowGroup.push(groupedData.slice(i, i + 5));
			}
			setPropertyDetails(rowGroup);
		}
	}, [oneListing]);

	const getlistingByID = async () => {
		setIsLoading(true);
		try {
			const search = location.search;
			const params = new URLSearchParams(search);
			const id = params.get("id");

			if (params.size != 0 && id) {
				const onelistingdata = await GetPublicListingByID(id);
				const dataresp = onelistingdata.data;

				if (Object.keys(dataresp).length === 0) {
					setOneListing(null);
				} else {
					const features = await GetFeaturesByPropertyNo(dataresp.PropertyNo);
					const photos = await UnitPhotos(dataresp.id);

					let photo = dataresp.Photo;
					if (photos.length !== 0) {
						let gallery;

						gallery = photos.map((item, i) => {
							return item.Photo;
						});

						gallery.unshift(photo);

						setUnitPhotos(gallery);
						setGalleryLength(gallery.length);
					} else {
						setUnitPhotos([photo]);
						setGalleryLength(1);
					}

					const getFeatures = features.filter(
						(item) => item.Type === "features"
					);
					const getAmenities = features.filter(
						(item) => item.Type === "amenities"
					);
					const getIncludes = features.filter(
						(item) => item.Type === "includes"
					);
					dataresp.Price = Number(dataresp.Price).toLocaleString("en", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					});
					dataresp.PricePerSqm =
						dataresp.PricePerSqm > 0
							? Number(dataresp.PricePerSqm).toLocaleString("en", {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
							  })
							: "N/A";

					setOneListing(dataresp);
					setFeatures(getFeatures);
					setAmenities(getAmenities);
					setIncludes(getIncludes);
				}
			} else {
				setOneListing(null);
			}
		} catch (error) {
			setOneListing(null);
		} finally {
			setIsLoading(false);
		}
	};
	const GetFeaturesByPropertyNo = async (propertyNo) => {
		try {
			const resFeatures = await GetAllFeaturesByPropertyNo(propertyNo);

			return resFeatures.data;
		} catch (error) {
			return [];
		}
	};
	const UnitPhotos = async (propertyId) => {
		try {
			const res = await GetUnitPhotos(propertyId);

			return res.data;
		} catch (error) {
			setUnitPhotos([]);
		}
	};

	const FilterFeature = (property_type) => {
		const feat = [
			{
				title: "Bedrooms",
				iconSrc: <BedOutlinedIcon />,
				value: oneListing.BedRooms,
			},
			{
				title: "Bathrooms",
				iconSrc: <ShowerOutlinedIcon />,
				value: oneListing.BathRooms,
			},
			{
				title: "Garage",
				iconSrc: <DirectionsCarFilledOutlinedIcon />,
				value: oneListing.Parking,
			},
			{
				title: "Area",
				iconSrc: <ShortcutOutlinedIcon />,
				value: `${oneListing.LotArea} Sqm`,
			},
			{
				title: "Price per SqM",
				iconSrc: <PhpOutlinedIcon />,
				value: Number(oneListing.PricePerSqm.replace(/,/g, "")).toLocaleString(
					"en",
					{
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					}
				),
			},
		];
		// setFeatures(feat);

		let feature = [];

		try {
			if (
				(property_type.toLowerCase().includes("lot") &&
					!property_type.toLowerCase().includes("house")) ||
				property_type.toLowerCase().includes("office")
			) {
				feature = feat.filter((item, i) =>
					["price per sqm", "area"].includes(item.title.toLocaleLowerCase())
				);
			} else if (
				property_type.toLowerCase().includes("lot") &&
				property_type.toLowerCase().includes("house")
			) {
				feature = feat;
			} else {
				feature = feat.filter(
					(item, i) =>
						!["price per sqm"].includes(item.title.toLocaleLowerCase())
				);
			}

			setAboutFeatures(feature);
		} catch (error) {
			setAboutFeatures([]);
		}
	};

	const columns = [
		{
			title: "Specifications",
			dataIndex: "item_1",
			key: "item_1",
			render: (text) => <span style={{ fontWeight: "600" }}>{text}</span>,
		},
		{
			dataIndex: "item_2",
			key: "item_2",
		},
		{
			dataIndex: "item_3",
			key: "item_3",
			render: (text) => <span style={{ fontWeight: "600" }}>{text}</span>,
		},
		{
			dataIndex: "item_4",
			key: "item_4",
		},
	];

	const data = [
		{
			key: "1",
			item_1: "Property ID",
			item_2: 123456789,
			item_3: "Floor Area",
			item_4: "300 SqM",
		},
		{
			key: "2",
			item_1: "Listing Type",
			item_2: "House for Sale",
			item_3: "Lot Area",
			item_4: "300 SqM",
		},
		{
			key: "3",
			item_1: "Furnishing",
			item_2: "Furnished",
			item_3: "Price per SqM",
			item_4: "PHP400,000",
		},
	];

	const HandleViewGallery = () => {
		setOpen(true);
	};
	const HandleChangeHeart = async (isChecked, tag, listingId) => {
		const id = listingId;

		let number = userDetails?.mobileNumber || null;

		const nextSelectedTags =
			isChecked && !likes.includes(id)
				? [...likes, id]
				: likes.filter((t) => t !== id);

		setLikes(nextSelectedTags);
		setIsChecked(isChecked);
		console.log("propnum:", oneListing);

		if (isChecked) {
			if (number && oneListing.PropertyNo) {
				try {
					const save = await AddSavedProperty(number, oneListing.PropertyNo);
					setSavedPropertyId(save.id);
					console.log("Property saved with ID:", save.id);
					setTooltipMessage("Added to favorites");
					setShowTooltip(true);
					setTimeout(() => setShowTooltip(false), 800);
				} catch (error) {
					console.error("Error saving property:", error);
				}
			} else {
                handleShowLoginModal()
				setTooltipMessage("Added to favorites.");
				setShowTooltip(false);
				setTimeout(() => setShowTooltip(false), 800);
				console.log("Reacted but items are not saved.");
			}
		} else if (number && oneListing.PropertyNo) {
			if (savedPropertyId) {
				console.log("Attempting to delete property with ID:", savedPropertyId);
				const resApi = await DeleteSavedProperty(savedPropertyId);
				console.log("Deleted property with ID:", resApi);
			} else {
				console.log("Property not found in saved properties");
			}
		} else {
			console.log("Property not found in saved properties");
		}
	};
	// const HandleSaveClick = () => {
	//     if (!checked) {
	//         setIsChecked(true);
	//         setShowTooltip(true);
	//         setTimeout(() => setShowTooltip(false), 800);
	//     } else {
	//         setIsChecked(!checked);
	//     }
	// }

	const openNotificationWithIcon = (type, message, description) => {
		api[type]({
			message: message,
			description: description,
			placement: "bottomRight",
			duration: type == "error" ? 10 : 10,
		});
	};
	const HandleContactChange = (e) => {
		setContact({ ...contact, [e.target.name]: e.target.value });
	};

	const HandleCalculatorClick = () => {
		navigate("/discover-home#calculator");
	};
	const HandleContactClick = async () => {
		try {
			const values = Object.values(contact);
			const keys = Object.keys(contact);
			const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

			if (values.includes("")) {
				openNotificationWithIcon(
					"warning",
					`Required Field`,
					"Please fill in required fields."
				);
			} else if (
				keys.filter((key) => key == "email" && !emailRegex.test(contact[key]))
					.length !== 0
			) {
				openNotificationWithIcon(
					"warning",
					`Invalid Value`,
					"Please provide a valid email address."
				);
			} else {
				setBtnLoading(true);
				const sendEmailMessage = await SendEmailInquiry(contact);
				if (Object.keys(sendEmailMessage).length == 0) {
					throw new Error("error while sending a message");
				}
				openNotificationWithIcon(
					"success",
					`Message Sent`,
					"Your message has been sent."
				);
				setContact({
					name: "",
					email: "",
					message: "",
					phone: "",
					propertyNo: oneListing.PropertyNo,
					listingTitle: oneListing.UnitName,
				});
				setBtnLoading(false);
			}
		} catch (error) {
			openNotificationWithIcon(
				"error",
				"Message Failed",
				`We're sorry, but your message couldn't be sent. We're already working on resolving the issue. 
            Please try again later, or for immediate assistance, contact us at properties@mlhuillier.com or 380 300, local 11569.
            Thank you for your patience!`
			);
		}

		// window.location.href = "https://www.google.com/maps/place/capoocan+Leyte"
	};

	return (
		<>
			{contextHolder}
			{isLoading ? (
				<PreviewLoadingModal />
			) : (
				oneListing && (
					<>
						<div className="listing-preview">
							<div className="listing-preview--container">
								<div className="listing-preview__image">
									<ImagePreviewComponent
										gallery={unitPhotos}
										handleViewGallery={HandleViewGallery}
									/>
								</div>
								<div className="listing-preview--tags">
									<div className="tag--top">
										<div className="listing-preview--tag">
											<div className="tag-icon">
												<img src={RedCamera} alt="Red Camera" />
											</div>
											<div className="tag-value">
												<div className="tag-value--text">{galleryLength}</div>
											</div>
										</div>
									</div>
									<div className="tag--bottom">
										<div className="listing-preview--tag-wrapper tag__wrapper-left">
											<div className="listing-preview--tag tag__sale-type">
												<div className="tag-value--text">
													<p>For {CapitalizeString(oneListing.SaleType)}</p>
												</div>
											</div>
											<div className="listing-preview--tag tag__price">
												<div className="tag-value--text">
													<p>PHP {oneListing.Price}</p>
												</div>
											</div>
										</div>
										<div className="listing-preview--tag-wrapper tag__wrapper-right">
											<div className="listing-preview--tag tag__btn save-btn">
												<div className="tag-icon">
													<div className="preview-heart">
                                                        {userDetails?.mobileNumber ? (
<Tooltip
															color="var(--red)"
															title={tooltipMessage}
															open={showTooltip}
															className="preview-listing__tooltip"
															placement="top"
														>
															<div
																className="heart-icon-preview-listing"
																onMouseEnter={() => {
																	if (!checked) {
																		setTooltipMessage("Add to favorite");
																		setShowTooltip(true);
																	}
																}}
																onMouseLeave={() => {
																	if (!checked) setShowTooltip(false);
																}}
															>
																<CustomTag
																	tagLabel={
																		checked ? (
																			<HeartFilled
																				style={{ color: "var(--red)" }}
																			/>
																		) : (
																			<HeartOutlined />
																		)
																	}
																	style={{
																		fontSize: "23px",
																		color: "#333333",
																	}}
																	className="tag-icon__heart"
																	checkable={true}
																	checked={checked}
																	handleChange={HandleChangeHeart}
																	listingId={oneListing.PropertyNo}
																/>
																{/* {
                                                        checked
                                                            ? <HeartFilled className="tag-icon__heart" />
                                                            : <HeartOutlined className="tag-icon__heart" />
                                                    } */}
															</div>
														</Tooltip>
                                                        ):(
                                                            <Tooltip
															color="var(--red)"
															title="Add to favorites"
															open={showTooltip}
															className="preview-listing__tooltip"
															placement="top"
														>
															<div
																className="heart-icon-preview-listing"
																onMouseEnter={() => {
																	if (!checked) {
																		setTooltipMessage("Add to favorite");
																		setShowTooltip(true);
																	}
																}}
																onMouseLeave={() => {
																	if (!checked) setShowTooltip(false);
																}}
															>
																<CustomTag
																	tagLabel={<HeartOutlined />}
																	style={{
																		fontSize: "23px",
																		color: "#333333",
																	}}
																	className="tag-icon__heart"
																	checkable={true}
																	checked={checked}
																	handleChange={HandleChangeHeart}
																	listingId={oneListing.PropertyNo}
																/>
																{/* {
                                                        checked
                                                            ? <HeartFilled className="tag-icon__heart" />
                                                            : <HeartOutlined className="tag-icon__heart" />
                                                    } */}
															</div>
														</Tooltip>

                                                        )}
														
													</div>
												</div>
												<div
													className="tag-value save-text"
													onClick={HandleChangeHeart}
												>
													<div
														className="tag-value--text"
														onMouseEnter={() => {
															if (!checked) {
																setTooltipMessage("Add to favorite");
																setShowTooltip(true);
															}
														}}
														onMouseLeave={() => {
															if (!checked) setShowTooltip(false);
														}}
													>
														<p>Save</p>
													</div>
												</div>
											</div>
											<div
												className="listing-preview--tag tag__btn show-all"
												onClick={HandleViewGallery}
											>
												<div className="tag-value--text">
													<p>Show All</p>
													<AppstoreOutlined className="show-all__icon" />
												</div>
											</div>
										</div>
									</div>
									{showLoginMessage && (
										<LoginMessageModal
											setShowLoginMessage={setShowLoginMessage}
										/>
									)}
								</div>
								<div className="listing-preview--content">
									<div className="listing-preview__listing-details">
										<section className="listing-preview__listing-title">
											<h4>{oneListing.UnitName}</h4>
											<p>
												{FormatLocation(
													oneListing.City,
													oneListing.ProvinceState,
													oneListing.Country
												)}
											</p>
											<p className="listing-preview__listing-pre-approved">
												<a href="/mortgage">Get Pre-Approved</a>
											</p>
										</section>
										<section className="listing-preview__listing-about">
											<h4>About this property</h4>
											<div className="listing-preview__listing-about--items">
												{aboutFeatures.map((feature, index) => {
													// if (feature.value && feature.value !== "0") {

													return (
														<div
															className="listing-preview__listing-about--item"
															key={index}
														>
															<div className="listing-preview__listing-about-item--title">
																<p>{feature.title}</p>
															</div>
															<div className="listing-preview__listing-about-item--value">
																{feature.iconSrc}
																<p>{feature.value}</p>
															</div>
														</div>
													);
												})}
											</div>
										</section>
										<section className="listing-preview__listing--description">
											<h4>Description</h4>
											<div className="listing-preview__listing-description">
												<p>{oneListing.Details}</p>
											</div>
										</section>
										<section className="listing-preview__listing-location">
											<h4>Location</h4>
											{!isLoading && (
												<div className="listing-preview__map">
													<MapComponent oneListing={oneListing} />
												</div>
											)}
										</section>
										<section className="listing-preview__listing-specifications">
											<h4>Property Details</h4>
											<div className="listing-preview__listing-specifications--table">
												<div className="property-highlights-table-component">
													<div className="property-highlights--table">
														<div className="property-highlights--table__thead">
															<p>Specifications</p>
														</div>
														<div className="property-highlights--table__tr-wrapper property--details">
															{propertyDetails.map((group, index) => (
																<div
																	key={index}
																	className="property-highlights--table__tr"
																>
																	<div className="property-highlights-table-row">
																		{group.map((feature, i) => (
																			<div
																				key={i}
																				className={`property-highlightss--table__td ${feature.name}`}
																			>
																				{feature.value}
																			</div>
																		))}
																	</div>
																</div>
															))}
														</div>
													</div>
												</div>
											</div>
										</section>
										<section className="listing-preview__listing-highlights">
											<h4>Property Highlights</h4>
											{features.length > 0 && (
												<div className="listing-preview__listing-highlights--table">
													<PropertyHighLightsTableComponent
														headerName={"Features"}
														features={features}
													/>
												</div>
											)}
											{amenities > 0 && (
												<div className="listing-preview__listing-highlights--table">
													<PropertyHighLightsTableComponent
														headerName={"Amenities"}
														features={amenities}
													/>
												</div>
											)}
											{includes.length > 0 && (
												<div className="listing-preview__listing-highlights--table">
													<PropertyHighLightsTableComponent
														headerName={"Includes"}
														features={includes}
													/>
												</div>
											)}
										</section>
									</div>
									<div
										className="listing-preview__listing-contact"
										id="contact-form"
									>
										{!isLoading && (
											<div className="listing-preview__listing-contact--wrapper">
												<div className="listing-preview__listing-contact--info">
													<div className="listing__contact--title">
														<h4>Contact Us</h4>
													</div>
													<div className="listing__contact--form">
														<div className="listing__contact--form-group">
															<div className="listing__contact--form-group-control">
																<div className="listing__contact--form-control">
																	<Input
																		type="text"
																		placeholder="Name"
																		className="contact__form-control"
																		onChange={(e) => HandleContactChange(e)}
																		value={contact.name}
																		name="name"
																	/>
																</div>
																<div className="listing__contact--form-control">
																	<Input
																		type="text"
																		placeholder="Email Address"
																		className="contact__form-control"
																		onChange={(e) => HandleContactChange(e)}
																		value={contact.email}
																		name="email"
																	/>
																</div>
																<div className="listing__contact--form-control">
																	<Input
																		type="text"
																		placeholder="Phone Number"
																		className="contact__form-control"
																		onChange={(e) => HandleContactChange(e)}
																		value={contact.phone}
																		name="phone"
																		maxLength={11}
																		onKeyDown={(e) => {
																			const currentLength =
																				contact.phone.length;
																			if (
																				e.key === "Backspace" ||
																				e.key === "Delete"
																			) {
																				return;
																			}
																			if (!/\d/.test(e.key)) {
																				e.preventDefault();
																			}
																			if (
																				currentLength === 0 &&
																				e.key !== "0"
																			) {
																				e.preventDefault();
																			}
																			if (
																				currentLength === 1 &&
																				e.key !== "9"
																			) {
																				e.preventDefault();
																			}
																		}}
																	/>
																</div>
															</div>
															<div className="listing__contact--form-control">
																<TextArea
																	placeholder={`I am interested in ${oneListing.UnitName}`}
																	className="contact__form-control"
																	rows={4}
																	onChange={(e) => HandleContactChange(e)}
																	value={contact.message}
																	name="message"
																/>
															</div>
														</div>
														<div className="listing__contact--form-btns">
															<div className="form__btn--send">
																<Button
																	className="btn-send"
																	onClick={HandleContactClick}
																	loading={btnLoading}
																>
																	Send Message
																</Button>
															</div>
															<div className="form__btn--calculator">
																<Button
																	className="btn-calculator"
																	onClick={HandleCalculatorClick}
																>
																	Loan Calculator
																</Button>
															</div>
														</div>
													</div>
												</div>
											</div>
										)}
									</div>
								</div>
								<hr className="listing-preview--divider" />
								<div className="listing-preview--more-properties">
									<div className="more__properties">
										{!isLoading && (
											<>
												<MorePropertiesComponent
													title={`More Properties For ${CapitalizeString(
														oneListing.SaleType
													)}`}
													subtitle={`Discover more ${CapitalizeEachWord(
														oneListing.PropertyType
													)} options — find your dream home today!`}
													propertyType={oneListing.PropertyType}
													saleType={oneListing.SaleType}
													filterValue={oneListing.PropertyType}
													filterProperty={["PropertyType"]}
													searchProperty={[
														{
															key: "property_type",
															value: oneListing.PropertyType,
														},
														{
															key: "sale_type",
															value: oneListing.SaleType,
														},
													]}
													isPaginated={true}
													isNavigated={false}
													isEffectCoverFlow={true}
												/>
												<MorePropertiesComponent
													title="More Properties Nearby"
													subtitle={`Discover more ${CapitalizeEachWord(
														oneListing.PropertyType
													)} options in ${CapitalizeEachWord(
														oneListing.ProvinceState
													)} — find your dream home today!`}
													propertyType={oneListing.PropertyType}
													saleType={oneListing.SaleType}
													filterValue={oneListing.ProvinceState}
													filterProperty={["ProvinceState"]}
													searchProperty={[
														{
															key: "location",
															value: oneListing.ProvinceState,
														},
														{
															key: "property_type",
															value: oneListing.PropertyType,
														},
														{
															key: "sale_type",
															value: oneListing.SaleType,
														},
													]}
													isPaginated={true}
													isNavigated={false}
													isEffectCoverFlow={true}
												/>
												{/* <MorePropertiesComponent
                                                        title="More Properties Nearby"
                                                        subtitle={`Discover more ${CapitalizeEachWord(oneListing.PropertyType)} options in ${CapitalizeEachWord(oneListing.ProvinceState)} — find your dream home today!`}
                                                        propertyType={oneListing.PropertyType}
                                                        saleType={oneListing.SaleType}
                                                        filterValue={oneListing.ProvinceState}
                                                        filterProperty={['ProvinceState']}
                                                        searchProperty={[
                                                            {
                                                                key: "location",
                                                                value: oneListing.ProvinceState
                                                            },
                                                            {
                                                                key: "property_type",
                                                                value: oneListing.PropertyType
                                                            },
                                                            {
                                                                key: "sale_type",
                                                                value: oneListing.SaleType
                                                            }
                                                        ]}
                                                        isPaginated={true} 
                                                        isNavigated={true} 
                                                        isEffectCoverFlow={true}
                                                    /> */}
											</>
										)}
									</div>
								</div>
								<div className="listing-preview--property-search">
									<div className="property-search__wrapper">
										<div className="manual-searching-title">
											<h2>Begin Your Property Search Today with Our Help!</h2>
										</div>
										<div className="manual-searching-desc">
											<p>
												Let us help you find the perfect place to call home!
												Whether you're searching for a luxurious estate,
												commercial lot for your business, or industrial lot, our
												team is dedicated to matching you with the ideal
												property that suits your needs and preferences.
											</p>
										</div>
										<div className="manualSearch--actions">
											<SemiRoundBtn
												label={"Get Free Assistance"}
												type={"default"}
												className="manual-search-action action-btn"
												size={"large"}
												handleClick={() => {
													window.location.href =
														"/propertySearch/?dashboardClicked=true";
												}}
											/>
										</div>
										<p></p>
									</div>
								</div>
							</div>
						</div>
						<div className="listing-preview__modal-container">
							<Modal
								// loading={loadingModal}
								open={open}
								onCancel={() => setOpen(false)}
								className="listing-preview__modal"
								footer={null}
								wrapClassName="listing-preview__modal-wrapper"
							>
								<ViewPhotoGallery photos={unitPhotos} />
							</Modal>
						</div>
						<div className="listing__contact--form-btns-sticky">
							<FloatBtnGroup
								children={
									<>
										<a href="#contact-form">
											<FloatButton
												icon={
													<MessageOutlined className="message-float__icon--icon" />
												}
												tooltip="Message us"
												className="float__icon message-float__icon"
											/>
										</a>
										<FloatButton
											icon={
												<CalculatorOutlined className="calculator-float__icon" />
											}
											tooltip="Calculator"
											className="float__icon calculator-float__icon"
											onClick={() => navigate("/discover-home#calculator")}
										/>
									</>
								}
							/>
						</div>
						<div className="preview--footer">
							<CustomMlFooter />
							<FooterComponent />
						</div>
					</>
				)
			)}
		</>
	);
};

export default ListingPreview;
