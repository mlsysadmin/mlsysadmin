import React from "react";
import styles from '../styles/HomeHighlights.module.css';

function FeatureCard({ features }) {
  const chunkSize = Math.ceil(features.length / 3);
  const featureChunks = Array.from({ length: 3 }, (_, i) =>
    features.slice(i * chunkSize, (i + 1) * chunkSize)
  );

  return (
    <article className={styles.card}>
      <h2 className={styles.cardHeader}>Features</h2>
      <div className={styles.cardContent}>
        {featureChunks.map((chunk, index) => (
          <ul key={index} className={styles.featureList}>
            {chunk.map((feature, featureIndex) => (
              <li key={featureIndex} className={styles.featureItem}>{feature}</li>
            ))}
          </ul>
        ))}
      </div>
    </article>
  );
}

export default FeatureCard;