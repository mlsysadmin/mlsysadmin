import React from "react";
import styles from '../styles/ViewListing.module.css';

function PropertyListing() {
  return (
    <article className={styles.propertyCard}>
      <img 
        loading="lazy" 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ed0371b0c94888f596106c0a070d90e15eec267cb3d4bfabc3ef90374ff80b2?apiKey=e5af2e14d6ff40c0b0f04c88d87330a5&&apiKey=e5af2e14d6ff40c0b0f04c88d87330a5" 
        className={styles.backgroundImage} 
        alt="Property background"
      />
      <img 
        loading="lazy" 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2d040d204b4e3ae24b9dd3bfd07900d7f78f724080c4bde1b68b7494505ca80?apiKey=e5af2e14d6ff40c0b0f04c88d87330a5&&apiKey=e5af2e14d6ff40c0b0f04c88d87330a5" 
        className={styles.logoImage} 
        alt="Company logo"
      />
      <div className={styles.infoContainer}>
        <div className={styles.statusPriceContainer}>
          <div className={styles.statusBadge}>For Sale</div>
          <div className={styles.priceTag}>PHP120,000,000</div>
        </div>
        <div className={styles.actionContainer}>
          <button className={styles.saveButton}>
            <img 
              loading="lazy" 
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0092cbb7221afbe64a740a834468c2dbcd416871a92c3642d9091fd0ade42c36?apiKey=e5af2e14d6ff40c0b0f04c88d87330a5&&apiKey=e5af2e14d6ff40c0b0f04c88d87330a5" 
              className={styles.saveIcon} 
              alt=""
            />
            <span className={styles.saveText}>Save</span>
          </button>
          <img 
            loading="lazy" 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/002645e41b4dcbbec7c8028574854f1415da76ea61da78f79880478f20aa6982?apiKey=e5af2e14d6ff40c0b0f04c88d87330a5&&apiKey=e5af2e14d6ff40c0b0f04c88d87330a5" 
            className={styles.moreOptionsIcon} 
            alt="More options"
          />
        </div>
      </div>
    </article>
  );
}

export default PropertyListing;