import React, { useEffect, useState } from "react";
import "../styles/propertyHighlights.css";

const PropertyHighLightsTableComponent = ({ headerName, features }) => {
    const [propertyHighlights, setPropertyHighlights] = useState([]);

    useEffect(() => {
        const groupedData = [];
        for (let i = 0; i < features.length; i += 3) {
            groupedData.push(features.slice(i, i + 3));
        }
        setPropertyHighlights(groupedData);
    }, [features]);

    return (
        <div className="property-highlights-table-component">
            <div className="property-highlights--table">
                <div className="property-highlights--table__thead">
                    <p>{headerName}</p>
                </div>
                <div className="property-highlights--table__tr-wrapper">
                    {propertyHighlights.map((group, index) => (
                        <div key={index} className="property-highlights--table__tr">
                            <div className="property-highlights-table-row">
                                {group.map((feature, i) => (
                                    <div key={i} className="property-highlightss--table__td">
                                        {feature.FeatureName}
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PropertyHighLightsTableComponent;