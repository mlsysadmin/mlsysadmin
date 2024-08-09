import React from "react";
import styles from '../styles/HomeHighlights.module.css';
import FeatureCard from './FeatureCard';
import AmenitiesCard from './AmenitiesCard';
import IncludesCard from './IncludesCard';

const features = [
  "Air Conditioning", "Balcony", "CCTV", "Driver Room",
  "Laundry Room", "Maid Room", "Powder Room", "Landscape Garden",
  "Open Car Spaces", "Sports Facilities", "Swimming Pool", "24/7 Security"
];

const amenities = [
  [
    "Landscaped Parks with picnic grounds",
    "Jogging trails",
    "The Highland Park and Clubhouse",
    "The Emerald Lake valley"
  ],
  [
    "Basketball and Tennis court",
    "Children Playground",
    "Water and Electric facilities",
    "State of the art communications facilities"
  ],
  [
    "5 Bedroom House for Rent in Maria Luisa Park"
  ]
];

const includes = [
  [
    "Living Room with Dining Area",
    "Kitchen Area",
    "Four Bedrooms each with toilet and bath",
    "Master Bedroom with walk-in closet, toilet and bath"
  ],
  [
    "Lanai",
    "Landscaped Garden",
    "Maid's Room",
    "Service Kitchen"
  ]
];

const HomeHighlights = ({ oneListing }) => {
  const indoorFeatures =
		JSON.parse(oneListing.listings.amenities.indoor_features).map((featurename) => featurename);
	const outdoorFeatures = 
		JSON.parse(oneListing.listings.amenities.outdoor_features).map((featurename)=> featurename);

	const allFeatures = [...indoorFeatures, ...outdoorFeatures];

  const amenities =  oneListing.listings.amenities.custom_amenities.feature_name;
  const includes = oneListing.listings.amenities.custom_inclusion.inclusion_name;

  return (
		<section className={styles.container}>
			<h1 className={styles.title}>Home Highlights</h1>
			<FeatureCard features={allFeatures} />
			<AmenitiesCard amenities={amenities} />
			<IncludesCard includes={includes} />
		</section>
	);
};

export default HomeHighlights;