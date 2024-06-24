import React from "react";
import Navigation from "../layout/NavigationComponent";
import "../../styles/listing-form.css";

import ListingSteps from "../layout/ListingSteps";
import ListingBanner from "../layout/ListingBanner";

export const ListingForm = () => {
  return (
    <div>
      <div className="nav">
        <Navigation />
      </div>

      <div>
        <ListingBanner />
      </div>

      <div className="listing-application">
        <div className="listing-steps">
          <ListingSteps />
          </div>

        <div className="property-details">
          <div className="property-details-info">
            <b>Property Details</b>
          </div>
        </div>
      </div>
    </div>
  );
};
