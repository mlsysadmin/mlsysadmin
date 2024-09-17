import React from "react";
import "../styles/previewListing.css";
import styles from "../styles/VListingHouseDetails.module.css";
import VLFeatureCard from "./VLFeatureCard";
import { LocationFormatter } from "../utils/LocationDateFormatter";
import MapComponent from "./mapComponent";
import area from "../assets/icons/previewlisting/area.png";
import { useNavigate } from 'react-router-dom';


const PreviewListLeftContent = ({ label, value, oneListing }) => {
  const features = [
    {
      title: "Bedrooms",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ffa0b4ae5294fab32f04e2df5bccc9e215b962c4a23b87baa3b3a4f9d11a3bf0?apiKey=e5af2e14d6ff40c0b0f04c88d87330a5",
      value: "5",
    },
    {
      title: "Bathrooms",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/372723378f9151c6cced3d234ccf4d85735cb0c5bd16df4ca6bac2adaf6189fb?apiKey=e5af2e14d6ff40c0b0f04c88d87330a5",
      value: "5",
    },
    {
      title: "Garage",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a17243275d0fedc1a93dbce25cd9571671d11f482871f3219644e3e5fe1afa72?apiKey=e5af2e14d6ff40c0b0f04c88d87330a5",
      value: "3",
    },
    { title: "Area", iconSrc: area, value: "300 SqM" },
    { title: "Price per SqM", iconSrc: "", value: "PHP400,000" },
  ];
  const navigate = useNavigate();
  const handleButtonClick = () => {
	navigate('/mortgage');
  };
  // const specifications = {
  //   propertyId: '123456789',
  //   listingType: 'House for Sale',
  //   furnishing: 'Furnished',
  //   bedroom: '5 Beds',
  //   bathroom: '5 Bath',
  //   floorArea: '300 SqM',
  //   lotArea: '300 SqM',
  //   pricePerSqM: 'PHP400,000',
  //   noOfFloors: '3 Floors',
  //   carParking: '3 Cars'
  // };

  return (
		<div className="leftContent">
			<main className={styles.leftcontainer}>
				<h1 className={styles.lefttitle}>{oneListing.listings.title}</h1>
				<p className={styles.leftlocation}>
					{LocationFormatter(oneListing.listings.location)}
				</p>
        <button className={styles.leftctaButton} onClick={handleButtonClick}>
      Get Pre-Approved
    </button>
				<h2 className={styles.leftsectionTitle}>About this home</h2>
				<section className={styles.leftfeatureGrid}>
					{features.map((feature, index) => (
						<VLFeatureCard key={index} {...feature} />
					))}
				</section>
				<h2 className={styles.leftdescriptionTitle}>Description</h2>
				<p className={styles.leftdescriptionText}>
					{oneListing.listings.description}
				</p>
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
								<th>Property ID</th>
								<td>{oneListing.listings.property_id}</td>
								<th>Floor Area</th>
								<td>{oneListing.listings.unit_details.floor_area}</td>
							</tr>
							<tr>
								<th>Listing Type</th>
								<td>{oneListing.listings.listing_type.listing_type}</td>
								<th>Lot Area</th>
								<td>{oneListing.listings.unit_details.lot_area}</td>
							</tr>
							<tr>
								<th>Furnishing</th>
								<td>{oneListing.listings.unit_details.classification}</td>
								<th>Price per SqM</th>
								<td>{oneListing.listings.unit_details.price_per_sqm}</td>
							</tr>
							<tr>
								<th>Bedroom</th>
								<td>{oneListing.listings.unit_details.no_of_beds}</td>
								<th>No of Floors</th>
								<td>{oneListing.listings.unit_details.no_of_floors}</td>
							</tr>
							<tr>
								<th>Bathroom</th>
								<td>{oneListing.listings.unit_details.no_of_bathrooms}</td>
								<th>Car Parking</th>
								<td>{oneListing.listings.unit_details.parking}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default PreviewListLeftContent;
