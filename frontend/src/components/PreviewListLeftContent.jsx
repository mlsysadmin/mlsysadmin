import React, { useEffect, useState } from "react";
import "../styles/previewListing.css";
import styles from "../styles/VListingHouseDetails.module.css";
import VLFeatureCard from "./VLFeatureCard";
import { FormatLocation, LocationFormatter } from "../utils/LocationDateFormatter";
import MapComponent from "./mapComponent";
import area from "../assets/icons/previewlisting/area.png";
import { useNavigate } from 'react-router-dom';
import { CapitalizeString, GetPropertyTitle, NotAvailableReturn } from "../utils/StringFunctions.utils";
import SemiRoundBtn from "./custom/buttons/SemiRoundBtn.custom";
import { PropertyTypeCategory } from "../utils/PropertyStaticData.utils";


const PreviewListLeftContent = ({ label, value, oneListing }) => {

	const navigate = useNavigate();
	const handleButtonClick = () => {
		navigate('/mortgage');
	};

	const [features, setFeatures] = useState([]);

	useEffect(() => {
		if (oneListing) {

			FilterFeature(oneListing.PropertyType);

		}
	}, [])

	const FilterFeature = (property_type) => {

		const feat = [
			{
				title: "Bedrooms",
				iconSrc:
					"https://cdn.builder.io/api/v1/image/assets/TEMP/ffa0b4ae5294fab32f04e2df5bccc9e215b962c4a23b87baa3b3a4f9d11a3bf0?apiKey=e5af2e14d6ff40c0b0f04c88d87330a5",
				value: oneListing.BedRooms,
			},
			{
				title: "Bathrooms",
				iconSrc:
					"https://cdn.builder.io/api/v1/image/assets/TEMP/372723378f9151c6cced3d234ccf4d85735cb0c5bd16df4ca6bac2adaf6189fb?apiKey=e5af2e14d6ff40c0b0f04c88d87330a5",
				value: oneListing.BathRooms,
			},
			{
				title: "Garage",
				iconSrc:
					"https://cdn.builder.io/api/v1/image/assets/TEMP/a17243275d0fedc1a93dbce25cd9571671d11f482871f3219644e3e5fe1afa72?apiKey=e5af2e14d6ff40c0b0f04c88d87330a5",
				value: oneListing.Parking,
			},
			{ title: "Area", iconSrc: area, value: oneListing.LotArea },
			{ title: "Price per SqM", iconSrc: "", value: `PHP ${oneListing.PricePerSqm}` }
		]
		let feature = [];
		console.log("type", property_type, property_type.toLowerCase().includes('lot') || property_type.toLowerCase().includes('house'));
		

		if (property_type.toLowerCase().includes('lot') && !property_type.toLowerCase().includes('house')) {
			feature = feat.filter((item, i) => ["price per sqm"].includes(item.title.toLocaleLowerCase()))
		} else if (property_type.toLowerCase().includes('lot') && property_type.toLowerCase().includes('house')) {
			feature = feat;
		}else{
			feature = feat.filter((item, i) => !["price per sqm"].includes(item.title.toLocaleLowerCase()));
		}

		setFeatures(feature);
	}

	return (
		<div className="leftContent">
			<main className={styles.leftcontainer}>
				<h1 className={styles.lefttitle}>
					{
						CapitalizeString(oneListing.UnitName)
					}
				</h1>
				<p className={styles.leftlocation}>
					{FormatLocation(oneListing.City, oneListing.ProvinceState, oneListing.Country)}
				</p>
				<button className={styles.leftctaButton} onClick={handleButtonClick}>
					Get Pre-Approved
				</button>
				<br />
				<SemiRoundBtn label={'Apply Now'} className={styles.applyNowbtn} />
				<div style={{ marginTop: '50px' }} className="first-row--about-property">
					<h2 className={styles.leftsectionTitle}>About this property</h2>
					<section className={styles.leftfeatureGrid}>
						{
							features.map((feature, index) => {

								if (feature.value) {
									return (

										<VLFeatureCard key={index} {...feature} />
									)
								}
							})
						}
					</section>
				</div>
				<div style={{ marginTop: '60px' }} className="second-row--description">
					<h2 className={styles.leftdescriptionTitle}>Description</h2>
					<p className={styles.leftdescriptionText}>
						{oneListing.Details}
					</p>
				</div>
			</main>
			<div className="property-on-map">
				<h3>Location</h3>
				<MapComponent oneListing={oneListing} />
			</div>

			<div className="view-similar-properties">
				<h3>Home Details</h3>
				<div className={styles.specificationContainer}>
					<h4 className={styles.specificationHeader}>Specification</h4>
					<table className={styles.specificationTable}>
						<tbody>
							<tr>
								<th>Property Type</th>
								<td>{CapitalizeString(oneListing.PropertyType)}</td>
								<th>Floor Area</th>
								<td>{NotAvailableReturn(oneListing.FloorArea)}</td>
							</tr>
							<tr>
								<th>Listing Type</th>
								<td>{`For ${CapitalizeString(oneListing.SaleType)}`}</td>
								<th>Lot Area</th>
								<td>{NotAvailableReturn(oneListing.LotArea)}</td>
							</tr>
							<tr>
								<th>Furnishing</th>
								<td>{NotAvailableReturn(oneListing.Furnishing)}</td>
								<th>Price per SqM</th>
								<td>{NotAvailableReturn(oneListing.PricePerSqm)}</td>
							</tr>
							<tr>
								<th>Bedroom</th>
								<td>{NotAvailableReturn(oneListing.BedRooms)}</td>
								<th>No of Floors</th>
								<td>{NotAvailableReturn(oneListing.NoOfFloor)}</td>
							</tr>
							<tr>
								<th>Bathroom</th>
								<td>{NotAvailableReturn(oneListing.BathRooms)}</td>
								<th>Car Parking</th>
								<td>{NotAvailableReturn(oneListing.Parking)}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default PreviewListLeftContent;