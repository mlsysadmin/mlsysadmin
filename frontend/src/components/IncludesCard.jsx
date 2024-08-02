import React from "react";
import styles from '../styles/HomeHighlights.module.css';

function IncludesCard({ includes }) {
  return (
    <article className={styles.card}>
      <h2 className={styles.cardHeader}>Includes</h2>
      <div className={styles.includesGrid}>
        <div className={styles.includesColumn}>
          <div className={styles.amenitiesGrid}>
            {includes.map((columnItems, columnIndex) => (
              <div key={columnIndex} className={styles.amenitiesColumn}>
                <ul className={styles.includesList}>
                  {columnItems.map((item, itemIndex) => (
                    <li key={itemIndex} className={styles.includeItem}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.serviceArea}>Service Area</div>
      </div>
    </article>
  );
}

export default IncludesCard;