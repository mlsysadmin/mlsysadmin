import React from "react";
import styles from '../styles/HomeHighlights.module.css';


const FeatureCard = ({ features }) => {
	console.log("features", features);
	return (
		<article className={styles.card}>
			<h2 className={styles.cardHeader}>Features</h2>
			<div className={styles.cardContent}>
				<ul>
					{features?.map((feature, index) => (
						<li key={index} className={styles.featureItem}>
							{feature}
						</li>
					))}
				</ul>
			</div>
		</article>
	);
};

export default FeatureCard;