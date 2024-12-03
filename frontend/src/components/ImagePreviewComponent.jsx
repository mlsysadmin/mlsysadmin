import React from 'react';
import '../styles/imagePreview.css';

import FallbackImage from '../asset/fallback.png';

const ImagePreviewComponent = ({ gallery, handleViewGallery }) => {
    const ImageUrl = process.env.REACT_APP_IGOT_API_URL;

    const [imageFallback, setImageFallback] = React.useState(new Array(4).fill(null));

    const imagesToRender = gallery.length > 5 ? gallery.slice(1, 5) : imageFallback;

    return (
        <div className="preview-image--container">

            <div className="preview-image-side">
                {/* Single image on one side */}
                <div className="preview-image-side--wrapper" onClick={handleViewGallery}>
                    <img src={`${ImageUrl}/${gallery[0]}`} alt="Listing Image 1" className="preview-single-image" />
                </div>
            </div>
            <div className="preview-image-group">
                {/* Four images on the other side */}
                {
                    Array.from({ length: 4 }).map((_, index) => {
                        const imagePath = gallery[index + 1]; // Skip the first image (used on the left)
                        const imageSrc = imagePath ? `${ImageUrl}/${imagePath}` : FallbackImage;

                        return (
                            <div
                                className='preview-group-image--wrapper'
                                key={index}
                                onClick={handleViewGallery}
                            >
                                <img
                                    src={imageSrc}
                                    alt={imagePath ? `Gallery image ${index + 2}` : `Fallback image ${index + 1}`}
                                    className="preview-group-image"
                                    onError={(e) => e.target.src = FallbackImage}
                                />
                            </div>
                        );
                    })
                }

            </div>
        </div>
    );
};

export default ImagePreviewComponent;
