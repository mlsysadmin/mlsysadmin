import React from 'react';
import styles from '../styles/VListingHouseDetails.module.css';

const VLFeatureCard = ({ title, iconSrc, value }) => {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureTitle}>{title}</div>
      <div className={styles.featureContent}>
        {/* <img loading="lazy" src={iconSrc} alt="" className={styles.featureIcon} /> */}
        {
          iconSrc
        }
        <div className={styles.featureValue}>{value}</div>
      </div>
    </div>
  );
};

export default VLFeatureCard;