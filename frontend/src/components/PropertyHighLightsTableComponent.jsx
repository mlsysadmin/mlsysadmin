import React, { useEffect, useState } from "react";
import "../styles/propertyHighlights.css";

const PropertyHighLightsTableComponent = ({ headerName, features }) => {
    const [propertyHighlights, setPropertyHighlights] = useState([]);

    useEffect(() => {
        const groupedData = [];
        for (let i = 0; i < features.length; i += 4) {
            groupedData.push(features.slice(i, i + 4));
        }
        setPropertyHighlights(groupedData);
    }, [features]);

    return (
        <div className="property-highlights-table-component">
            <table className="property-highlights--table">
                <thead className="property-highlights--table__thead">
                    <tr>
                        <th>{headerName}</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {propertyHighlights.map((row, rowIndex) => (
                        <tr key={rowIndex} className="property-highlights--table__tr">
                            {row.map((item, colIndex) => (
                                <td key={colIndex} className="property-highlightss--table__td">
                                    {item.FeatureName}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PropertyHighLightsTableComponent;