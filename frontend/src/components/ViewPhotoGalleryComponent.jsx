import { Image } from "antd";
import React, { useState } from "react";

import '../styles/viewPhotoGallery.css';

const ViewPhotoGallery = ({ photos }) => {
    const ImageUrl = process.env.REACT_APP_IGOT_API_URL;

    // Divide photos into rows dynamically (3 photos per row: 1 large + 2 small)
    const rows = [];
    for (let i = 0; i < photos.length; i += 3) {
        rows.push(photos.slice(i, i + 3));
    }

    return (
        <div className="photo-gallery--container">
            <div className="photo-gallery--header">
                <p>Photo Gallery</p>
            </div>
            <hr className="listing-preview--divider" />
            <div className="photo-gallery--gallery">
                <Image.PreviewGroup
                    preview={{
                        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                    }}
                    
                >
                    {rows.map((row, rowIndex) => (
                        <div className="photo-gallery__gallery-row" key={rowIndex}>
                            {rowIndex % 2 === 0 ? (
                                <>
                                    <div className="photo-gallery__gallery-item large">
                                        {row[0] && <Image src={`${ImageUrl}${row[0]}`} alt={row[0]} className="photo-gallery__gallery-img"/>}
                                    </div>
                                    <div className="photo-gallery__gallery-column">
                                        {row.slice(1).map((image, index) => (
                                            <div className="photo-gallery__gallery-item small" key={index}>
                                                <Image src={`${ImageUrl}${image}`} alt="image" className="photo-gallery__gallery-img"/>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="photo-gallery__gallery-item large">
                                        {row[2] && <Image src={`${ImageUrl}${row[2]}`} alt="image" className="photo-gallery__gallery-img"/>}
                                    </div>
                                    <div className="photo-gallery__gallery-column">
                                        {row.slice(0, 2).map((image, index) => (
                                            <div className="photo-gallery__gallery-item small" key={index}>
                                                <Image src={`${ImageUrl}${image}`} alt="image" className="photo-gallery__gallery-img"/>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                    {/* {photos.map((photo, index) => {
                        return (
                            <div
                                key={index}
                                className={`photo-gallery--item ${index === 0 ? "large" : ""}`}
                            >
                                <Image src={`${ImageUrl}${photo}`} alt="image" className="photo-gallery__img" />
                            </div>
                        )
                    })} */}
                </Image.PreviewGroup>
            </div>
        </div>
    )
}

export default ViewPhotoGallery;