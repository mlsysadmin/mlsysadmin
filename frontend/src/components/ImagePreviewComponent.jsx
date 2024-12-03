import React from 'react';
import '../styles/imagePreview.css';

import FallbackImage from '../asset/fallback.png';

const ImagePreviewComponent = ({ gallery, handleViewGallery }) => {
    const ImageUrl = process.env.REACT_APP_IGOT_API_URL;

    const [imageFallback, setImageFallback] = React.useState(new Array(4).fill(null));

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
                    gallery.length > 5 ?
                        gallery.slice(1, 5).map((imagePath, key) => {
                            return (
                                <div className='preview-group-image--wrapper' key={key} onClick={handleViewGallery}>
                                    <img src={`${ImageUrl}/${imagePath}`} alt={`Listing Image ${key}`} className="preview-group-image" />
                                </div>
                            )
                        })
                        :
                        <>
                            {
                                imageFallback.map((_, i) => {
                                    return (
                                        <div className='preview-group-image--wrapper' key={i}>
                                            <img src={FallbackImage} alt={`Fallback image ${i}`} className="preview-group-image" />
                                        </div>
                                    )
                                })
                            }
                        </>
                }

            </div>
        </div>
    );
};

export default ImagePreviewComponent;
