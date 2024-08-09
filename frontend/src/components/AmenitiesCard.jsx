import React from "react";
import styles from '../styles/HomeHighlights.module.css';

function AmenitiesCard({ amenities }) {
  return (
		<article className={styles.card}>
			<h2 className={styles.cardHeader}>Amenities</h2>
			<div className={styles.amenitiesContainer}>
				<div className={styles.amenitiesGrid}>
					{JSON.parse(amenities).map((columnItems, columnIndex) => (
						<div key={columnIndex} className={styles.amenitiesColumn}>
							<ul className={styles.amenitiesList}>
								<li>{columnItems}</li>
							</ul>
						</div>
					))}
				</div>
			</div>
		</article>
	);
}

export default AmenitiesCard;